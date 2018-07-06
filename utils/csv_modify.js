const csv = require('fast-csv');

exports.import_from_csv = (filename, cb1, cb2) => {
  csv
    .fromPath(filename)
    .on("data", cb1)
    .on("end", () => {
      cb2();
      console.log("read `" + filename + "` done");
    });
};
