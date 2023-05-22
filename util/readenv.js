import { readFileSync } from "fs";

const setENV = (str) => {
  if (str) {
    const envArray = str.split("\n");
    envArray.forEach(function (item, i) {
      if (item) {
        process.env[item.split("=")[0].trim()] = item.split("=")[1].trim();
      }
    });
  }
};

const config = () => {
  const fileName = ".env";
  try {
    result = readFileSync(fileName, { encoding: "utf8" });
    setENV(result);
  } catch (error) {
    console.log("error : ", error);
  }
};

const _config = config;
export { _config as config };
