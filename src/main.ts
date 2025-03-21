import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ocrTest from "./scrapping";
import getJSON from "./getJsonString";
import multer from "multer";

dotenv.config();


const app = express();

app.use(cors());

const port = process.env.PORT

const upload = multer({ storage: multer.memoryStorage() });

function multerFileToNativeFile(multerFile : Express.Multer.File) {
  return new File([multerFile.buffer], multerFile.originalname, {
    type: multerFile.mimetype,
    lastModified: Date.now(),
  });
}

app.post("/ocr", upload.single("file"), async (req, res) => {

  if(req.file === undefined){
    res.status(400)
  }
  else{
    const file = multerFileToNativeFile(req.file)
    
    const markdown = await ocrTest(file)
    const jsonString = await getJSON(markdown)
    const jsonParsed = JSON.parse(jsonString ? jsonString : "{}")
    res.status(200).json(jsonParsed)
  }
    
})

app.get("/", (req, res) => {
  res.send("🚀 Servidor corriendo correctamente")
})

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });