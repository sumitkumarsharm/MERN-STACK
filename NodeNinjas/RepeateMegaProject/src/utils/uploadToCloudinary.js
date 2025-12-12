import streamifier from "streamifier";
import cloudinary from "./cloudinary.js";

export const uploadBufferToCloudinary = (
  buffer,
  folder = "task_attachments",
) => {
  return new Promise((resolve, reject) => {
    const writeStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto", // supports pdf/docx/images
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(writeStream);
  });
};

export const deleteFromCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });
};
