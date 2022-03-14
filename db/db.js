const fs = require("fs");
const path = require("path");

function getData(filename) {
  const filePath = path.join(__dirname, `./${filename}.json`);

  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
}

function setData(filename, data) {
  const filePath = path.join(__dirname, `./${filename}.json`);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { getData, setData };
