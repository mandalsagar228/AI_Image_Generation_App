import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import postRoutes from "./Routes/postRoutes.js";
import dalleRoutes from "./Routes/dalleRoutes.js";

const PORT = process.env.PORT || 8080;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(
        `app is listening on port no http://localhost:${PORT} successsfully`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
