const express = require("express");
const session = require("express-session");
const { google } = require("googleapis");
const path = require("path");
const crypto = require("crypto");
const cors = require("cors");
const { Client, ID, Databases } = require("node-appwrite");
require("dotenv").config();

const credentials = require("./creds.json");

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.API_KEY);

const database = new Databases(client);

const SCOPES = [
  "https://www.googleapis.com/auth/fitness.activity.read",
  "https://www.googleapis.com/auth/fitness.blood_glucose.read",
  "https://www.googleapis.com/auth/fitness.blood_pressure.read",
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.sleep.read",
  "https://www.googleapis.com/auth/fitness.reproductive_health.read",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const secretKey = crypto.randomBytes(32).toString("hex");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5174", // Replace with your React app's origin
  })
);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

let userProfileData;

async function getUserProfile(auth) {
  const service = google.people({ version: "v1", auth });
  const profile = await service.people.get({
    resourceName: "people/me",
    personFields: "names,photos,emailAddresses",
  });

  const displayName = profile.data.names[0]?.displayName || "Unknown User";
  const url = profile.data.photos[0]?.url || "";
  const userID = parseInt(profile.data.resourceName.replace("people/", ""), 10);

  return {
    displayName,
    profilePhotoUrl: url,
    userID,
  };
}

app.get("/auth/google", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.json({ authUrl });
});

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    req.session.tokens = tokens;

    const profile = await getUserProfile(oAuth2Client);
    req.session.userProfile = profile;
    userProfileData = profile;

    res.redirect("http://localhost:5174/dashboard");
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.redirect("/error");
  }
});

let isSecondHit = false;

app.get("/fetch-data", async (req, res) => {
  try {
    const fitness = google.fitness({ version: "v1", auth: oAuth2Client });

    const { displayName: userName, profilePhoto: profilePhoto, userID } = userProfileData;

    const sevenDaysInMillis = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
    const startTimeMillis = Date.now() - sevenDaysInMillis; 
    const endTimeMillis = Date.now() + 24 * 60 * 60 * 1000;

    const response = await fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [
          { dataTypeName: "com.google.step_count.delta" },
          { dataTypeName: "com.google.blood_glucose" },
          { dataTypeName: "com.google.blood_pressure" },
          { dataTypeName: "com.google.heart_rate.bpm" },
          { dataTypeName: "com.google.weight" },
          { dataTypeName: "com.google.height" },
          { dataTypeName: "com.google.sleep.segment" },
          { dataTypeName: "com.google.body.fat.percentage" },
          { dataTypeName: "com.google.menstruation" },
        ],
        bucketByTime: { durationMillis: 86400000 }, // Aggregate data in daily buckets
        startTimeMillis,
        endTimeMillis,
      },
    });

    const fitnessData = response.data.bucket;
    const formattedData = fitnessData.map((data) => {
      const date = new Date(parseInt(data.startTimeMillis));
      const formattedDate = date.toDateString();

      const formattedEntry = {
        date: formattedDate,
        step_count: 0,
        glucose_level: 0,
        blood_pressure: [],
        heart_rate: 0,
        weight: 0,
        height_in_cms: 0,
        sleep_hours: 0,
        body_fat_in_percent: 0,
        menstrual_cycle_start: "",
      };

      const datasetMap = data.dataset;
      datasetMap.forEach((mydataset) => {
        const point = mydataset.point;
        if (point && point.length > 0) {
          const value = point[0].value;
          switch (mydataset.dataSourceId) {
            case "derived:com.google.step_count.delta:com.google.android.gms:aggregated":
              formattedEntry.step_count = value[0]?.intVal || 0;
              break;
            case "derived:com.google.blood_glucose.summary:com.google.android.gms:aggregated":
              formattedEntry.glucose_level = (value[0]?.fpVal || 0) * 10;
              break;
            case "derived:com.google.blood_pressure.summary:com.google.android.gms:aggregated":
              const finalData = [0, 0];
              value.forEach((data) => {
                if (data.fpVal) {
                  if (data.fpVal > 100) finalData[0] = data.fpVal; // systolic
                  else if (data.fpVal < 100) finalData[1] = data.fpVal; // diastolic
                }
              });
              formattedEntry.blood_pressure = finalData;
              break;
            case "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated":
              formattedEntry.heart_rate = value[0]?.fpVal || 0;
              break;
            case "derived:com.google.weight.summary:com.google.android.gms:aggregated":
              formattedEntry.weight = value[0]?.fpVal || 0;
              break;
            case "derived:com.google.height.summary:com.google.android.gms:aggregated":
              formattedEntry.height_in_cms = (value[0]?.fpVal || 0) * 100;
              break;
            case "derived:com.google.sleep.segment:com.google.android.gms:merged":
              formattedEntry.sleep_hours = value[0]?.intVal || 0;
              break;
            case "derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated":
              formattedEntry.body_fat_in_percent = value[0]?.fpVal || 0;
              break;
            case "derived:com.google.menstruation:com.google.android.gms:aggregated":
              formattedEntry.menstrual_cycle_start = value[0]?.intVal || 0;
              break;
            default:
              break;
          }
        }
      });
      return formattedEntry;
    });

    if (!isSecondHit) {
      await saveUserDataToAppwrite({ userName, profilePhoto, userID });
      await Promise.all(formattedData.map(saveFitnessDataToAppwrite));
    }

    isSecondHit = true;
    res.send({ userName, profilePhoto, userID, formattedData });
  } catch (error) {
    console.error("Error fetching fitness data:", error);
    res.redirect("/error");
  }
});

const saveUserDataToAppwrite = async (userData) => {
  try {
    const collectionId = process.env.COLLECTION_ID;
    const databaseId = process.env.DATABASE_ID;

    const users = await database.listDocuments(databaseId, collectionId);
    const userExists = users.documents.some(
      (user) => user.profileURL === userData.profilePhoto
    );

    if (!userExists) {
      const response = await database.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          username: userData.userName,
          profileURL: userData.profilePhoto,
          userID: userData.userID,
        }
      );
      console.log("User data saved to Appwrite:", response);
    } else {
      console.log("User already exists");
    }
  } catch (error) {
    console.error("Error saving user data to Appwrite:", error);
  }
};

const saveFitnessDataToAppwrite = async (fitnessData) => {
  try {
    const collectionId = process.env.FITNESS_COLLECTION_ID;
    const databaseId = process.env.DATABASE_ID;

    const response = await database.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      fitnessData
    );

    console.log("Fitness data saved to Appwrite:", response);
  } catch (error) {
    console.error("Error saving fitness data to Appwrite:", error);
  }
};

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
