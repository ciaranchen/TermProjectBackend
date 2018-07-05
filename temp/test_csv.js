const csv = require('fast-csv');
const fs = require('fs');

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

exports.export2csv = (data, collname) => {
  let filename = collname + '.csv'
  let ws = fs.createWriteStream(filename);
  console.log(data);
  csv
    .write(data, {headers: true})
    .pipe(ws)
    .end(()=>{console.log('write `' + filename + '` done')});
}


exports.import_from_csv('data.csv', (data) => {
  console.log(data);
  exports.export2csv(data, "output")
});

