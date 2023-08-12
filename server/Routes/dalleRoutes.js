import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const router = express.Router();
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error("OPENAI_API_KEY is missing in the environment variables.");
  process.exit(1);
}

const configuration = new Configuration({ apikey: openaiApiKey });
const openai = new OpenAIApi(configuration);
router.route("/").get(async (req, res) => {
  res.status(200).json("Hello from Dalle E server side ");
  console.log("data send successfully");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompts } = req.body;
    // const image=prompts
    const aiResponse = await openai.createImage(
      {
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      },

      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const image = aiResponse.data.data[0].b64;
    res.status(200).json({ photo: image });
    console.log("successfull");
  } catch (error) {
    res.status(500).send(error?.response.data.error.message);
    console.log("Error response:", error.response.data.error.message);
    // console.log("This is  error from server", error);
  }
});

export default router;
