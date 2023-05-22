import { writeFileSync, readFileSync } from "fs";
const fileName = "db/uploaded-files.js";

export const saveToDB = (data) => {
  currentData = this.readFromDB();
  currentData[data.id] = data;
  currentData = JSON.stringify(currentData);
  writeFileSync(fileName, currentData, "utf8");
};

export const readFromDB = () => {
  const data = readFileSync(fileName, "utf8");
  if (!data) {
    data = "{}";
  }
  return JSON.parse(data);
};

export const getFile = (fileId) => {
  if (!fileId) {
    return null;
  }
  data = this.readFromDB();
  return data[fileId];
};
