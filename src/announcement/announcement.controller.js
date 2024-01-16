const {
  create,
  deleteById,
  getAnnouncementByClassId,
} = require("./announcement.services");
const { logger } = require("../utils/logger");
const form = require("../middlewares/uploader");
const fs = require("fs");
const { get } = require("../class/class.services");

function createAnnouncement(req, res) {
  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err;
    }
    try {
      let announcementObj = {
        class: fields.class[0],
        description: fields.description[0],
        lastDate: fields.last_date[0],
        points: fields.points[0],
      };

      if (Object.keys(files).length !== 0) {
        announcementObj = {
          ...announcementObj,
          filePath: files.file.map((file) => file.newFilename),
          file: files.file,
        };
      }

      const newAnnouncement = await create(announcementObj);

      res.status(200).redirect(`/class/get/${announcementObj.class}`);
    } catch (error) {
      logger.info(error);
      res.status(500).render("common/error", {
        error: "Something went wrong",
      });
    } finally {
      if (files.file) {
        files.file.forEach((ele) =>
          fs.unlink(ele.filepath, (err) => {
            if (err) {
              return res.status(500).render("common/error", {
                error: "Something went wrong",
              });
            }
          })
        );
      }
    }
  });
}

async function deleteAnnouncement(req, res) {
  let [announcementId, classId] = req.body.id.split("@");

  try {
    const result = await deleteById(announcementId);

    if (result.ok) {
      res.status(200).render("class/class", {
        page: "dashboard",
        classObj: await get(classId),
        announcements: await getAnnouncementByClassId(classId),
        announcementDelete: {
          isDeleted: true,
          message: "Announcement Deleted!",
        },
      });
    } else {
      res.status(404).render("class/class", {
        page: "dashboard",
        classObj: await get(classId),
        announcements: await getAnnouncementByClassId(classId),
        announcementDelete: {
          isDeleted: false,
          message: "No announcement found with this ID",
        },
      });
    }
  } catch (err) {
    return res.status(500).render("class/class", {
      page: "dashboard",
      classObj: await get(classId),
      announcements: await getAnnouncementByClassId(classId),
      announcementDelete: {
        isDeleted: false,
        message: "Something went wrong!",
      },
    });
  }
}

module.exports = {
  createAnnouncement,
  deleteAnnouncement,
};
