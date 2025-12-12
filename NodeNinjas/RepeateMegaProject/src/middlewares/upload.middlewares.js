import multer from "multer";

const memoryStorage = multer.memoryStorage();

export const uploadSingle = (fieldName = "attachment", maxSizeMB = 10) =>
  multer({
    storage: memoryStorage,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "application/pdf",
      ];
      if (allowed.includes(file.mimetype)) return cb(null, true);
      cb(new Error("Unsupported file type"));
    },
  }).single(fieldName);
