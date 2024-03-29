require("../db.conn");

const Class = require("./class.model");
const { HttpResponseError } = require("../utils/error.helper");
const { addOwnedClass, addJoinedClass } = require("../user/user.services");
const { logger } = require("../utils/logger");

const mongoose = require("mongoose");

async function create(classObj) {
  try {
    if (!classObj.name || !classObj.owner)
      throw new HttpResponseError({
        httpCode: 400,
        msg: "Please fill in all details",
      });

    let newClass = new Class(classObj);
    await newClass.save();

    await addOwnedClass(classObj.owner, newClass._id);

    return newClass;
  } catch (err) {
    throw err;
  }
}

async function join(obj) {
  try {
    if (!obj.code)
      throw new HttpResponseError({
        httpCode: 400,
        msg: "Please fill in all details",
      });

    let theClass = await Class.findOne({ code: obj.code });

    if (!theClass)
      throw new HttpResponseError({
        httpCode: 400,
        msg: "There is no class with this code",
      });

    if (theClass.owner.equals(obj.student._id))
      throw new HttpResponseError({
        httpCode: 400,
        msg: "You are teacher of this class",
      });

    theClass.students.forEach((ele) => {
      if (ele.equals(obj.student._id))
        throw new HttpResponseError({
          httpCode: 400,
          msg: "You are already in this class",
        });
    });

    theClass.students.push(obj.student._id);

    await theClass.save();

    await addJoinedClass(obj.student, theClass._id);

    return theClass;
  } catch (err) {
    throw err;
  }
}

async function get(classId) {
  try {
    const classObj = await Class.findById(classId).populate({
      path: "owner",
      select: "name",
    });
    return classObj;
  } catch (err) {
    throw err;
  }
}

async function getStudentsByClassId(classId) {
  try {
    const classObj = await Class.findById(classId).populate({
      path: "students",
      select: "name _id",
    });

    return classObj.students;
  } catch (error) {
    throw error;
  }
}

async function removeStudentById(studentId, classId) {
  try {
    const oldClass = await Class.findById(classId);
    if (!oldClass) throw "";
    logger.info(oldClass.students);
    oldClass.students = oldClass.students.filter(
      (student) => !student.equals(mongoose.Types.ObjectId(studentId))
    );
    logger.info(oldClass.students);
    await oldClass.save();

    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  join,
  get,
  getStudentsByClassId,
  removeStudentById,
};
