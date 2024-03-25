import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import usersRouter from './routes/users.router.js';
import emailRouter from './routes/email.router.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 ✨");
});

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000; // Set a default port if PORT is not provided

if (!MONGO_URL) {
  console.error("MongoDB URL is not provided in the environment variables.");
  process.exit(1);
}

async function startServer() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB connected successfully!");

    // Mount your routers
    app.use('/users', usersRouter);
    app.use('/email', emailRouter);

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

startServer();

export { app };

