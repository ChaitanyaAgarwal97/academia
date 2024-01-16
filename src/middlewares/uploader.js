const formidable = require("formidable");
const { logger } = require("../utils/logger");

const form = new formidable.IncomingForm({
  uploadDir: `${__dirname}/../../uploads`,
  keepExtensions: true,
  filename: (filename, ext, part, form) => {
    return `${part.originalFilename}-${Date.now()}${ext}`;
  },
  allowEmptyFiles: true,
  minFileSize: 0,
  filter: function ({ originalFilename }) {
    return originalFilename !== "";
  },
});

module.exports = form;
