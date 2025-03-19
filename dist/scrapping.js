"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mistralai_1 = require("@mistralai/mistralai");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const ocrTest = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.MISTRAL_API_KEY;
    const client = new mistralai_1.Mistral({ apiKey: apiKey });
    const pdfPath = process.env.TEST_DOC_PATH;
    pdfPath ? console.log("exito") : console.log("fracaso :(");
    const uploaded_file = fs_1.default.readFileSync(pdfPath ? pdfPath : "");
    const uploaded_pdf = yield client.files.upload({
        file: {
            fileName: "uploaded_file.pdf",
            content: uploaded_file,
        },
        purpose: "ocr"
    });
    const signedUrl = yield client.files.getSignedUrl({
        fileId: uploaded_pdf.id,
    });
    const ocrResponse = yield client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
            type: "document_url",
            documentUrl: signedUrl.url,
        },
        includeImageBase64: true
    });
    return ocrResponse;
});
exports.default = ocrTest;
