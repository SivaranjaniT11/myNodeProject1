// const Client = require("ssh2-sftp-client");
// const sftp = new Client();

// const config = {
//   host: "198.38.83.205", 
//   port: 22, 
//   username: "root", 
//   password: "szEd5sUNMgpfyM3q", 
// };

// async function uploadFile() {
//   try {
//     await sftp.connect(config);

//     const localFilePath = "./Jagan_InterviewCard.png"; 
//     const remoteFilePath = "/home/taizo/taizodocupload/candidate/devuser/Jagan_InterviewCard.png"; 

//     await sftp.put(localFilePath, remoteFilePath);
//     console.log("File uploaded successfully to Hosting Raja!");


//     await sftp.end();
//   } catch (err) {
//     console.error(" File upload failed:", err);
//   }
// }

// uploadFile();

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Client = require("ssh2-sftp-client");

const app = express();
const port = 3000;

// Ensure the 'uploads' directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// SFTP Configuration
const sftp = new Client();
const config = {
  host: "198.38.83.205",
  port: 22,
  username: "root",
  password: "szEd5sUNMgpfyM3q",
};

// File Upload Route
app.post("/upload", (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: "File upload failed", details: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const localFilePath = req.file.path;
    const remoteFilePath = `/home/taizo/taizodocupload/candidate/devuser/${req.file.filename}`;

    try {
      console.log("✅ Connecting to SFTP...");
      await sftp.connect(config);

      console.log("📂 Creating directory (if needed)...");
      await sftp.mkdir(path.dirname(remoteFilePath), true);

      console.log("⬆️ Uploading file:", localFilePath, " → ", remoteFilePath);
      await sftp.put(localFilePath, remoteFilePath);

      await sftp.end();
      console.log("✅ File uploaded successfully!");

      res.json({ message: "File uploaded successfully to Hosting Raja!", file: req.file });
    } catch (err) {
      console.error("❌ SFTP Upload Error:", err);
      res.status(500).json({ error: "File upload failed", details: err.message });
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
