// lib/formidable.ts
import formidable from "formidable";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public", "uploads");

// upload papkani tayyorlash
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const form = formidable({
  multiples: false,
  uploadDir,
  keepExtensions: true,
  maxFileSize: 5 * 1024 * 1024, // 5 MB
});
