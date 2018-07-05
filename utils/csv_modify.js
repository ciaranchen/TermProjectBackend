const csv = require('fast-csv');

exports.import_from_csv = (filename, cb) => {
  let array = [];
  csv
    .fromPath(filename)
    .on("data", function(data){
      array.push({question: data[0], answer: data[1]});
    })
    .on("end", function(){
      cb(array);
      console.log("read `" + filename + "` done");
    });
}
