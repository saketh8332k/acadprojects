// pages/api/auth.js

import { MongoClient } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
const jwtSecret = process.env.JWT_SECRET;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  if (!client.isConnected()) await client.connect();
  return client.db(dbName);
}

async function loginUser(req, res) {
  const db = await connectToDatabase();
  const { email, password } = req.body;

  const userCollection = db.collection('register');
  const dbUser = await userCollection.findOne({ email });

  if (!dbUser) {
    return res.status(400).json({ display_msg: "Not Registered User" });
  }

  const isPasswordMatched = await bcrypt.compare(password, dbUser.password);

  if (isPasswordMatched) {
    const payload = { email };
    const jwtToken = jwt.sign(payload, jwtSecret);
    return res.status(200).json({ jwtToken, display_msg: "Logged In Successfully" });
  } else {
    return res.status(400).json({ display_msg: "Incorrect Password" });
  }
}

async function registerUser(req, res) {
  const db = await connectToDatabase();
  const { username, email, password } = req.body;

  const userCollection = db.collection('register');
  const dbUser = await userCollection.findOne({ email });

  if (dbUser) {
    return res.status(400).json({ display_msg: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userCollection.insertOne({
    username,
    email,
    password: hashedPassword
  });

  return res.status(201).json({ display_msg: "Successfully Registered" });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action } = req.body;
    if (action === 'login') {
      return loginUser(req, res);
    } else if (action === 'register') {
      return registerUser(req, res);
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
