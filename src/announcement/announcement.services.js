const Announcement = require("./announcement.model");
const { storage } = require("../firebase/conn");
const fs = require("fs");
const { uploadBytes, ref, deleteObject } = require("firebase/storage");
const { logger } = require("../utils/logger");

async function create(obj) {
  const { file, ...announcementObj } = obj;
  try {
    if (file) {
      file.forEach(async (ele) => {
        const metadata = {
          contentType: ele.mimetype,
        };

        const uploadFile = fs.readFileSync(ele.filepath);

        const announcementRef = ref(storage, ele.newFilename);

        await uploadBytes(announcementRef, uploadFile, metadata);
      });
    }

    const newAnnouncement = new Announcement(announcementObj);
    await newAnnouncement.save();

    return newAnnouncement;
  } catch (error) {
    throw error;
  }
}

async function getAnnouncementByClassId(classId) {
  try {
    const announcements = await Announcement.find({ class: classId });

    return announcements;
  } catch (error) {
    throw error;
  }
}

async function deleteById(announcementId) {
  try {
    let filesToBeDeleted = await Announcement.findById(announcementId).select(
      "filePath"
    );
    filesToBeDeleted = filesToBeDeleted.filePath;

    logger.info(filesToBeDeleted);
    if (filesToBeDeleted && filesToBeDeleted.length !== 0) {
      filesToBeDeleted.forEach(async (file) => {
        const announcementRef = ref(storage, file);

        await deleteObject(announcementRef);
      });
    }

    const res = await Announcement.deleteOne({ _id: announcementId });
    return res;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  getAnnouncementByClassId,
  deleteById,
};
