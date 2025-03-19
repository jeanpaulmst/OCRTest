import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ocrTest from "./scrapping";

dotenv.config();

const app = express();

const port = process.env.PORT

app.get("/ocr", async (req, res) => {
  const ocrRes = await ocrTest()
  res.json(ocrRes)
})

app.get("/", (req, res) => {
  res.send("🚀 Servidor corriendo correctamente")
})

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });