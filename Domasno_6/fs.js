import fsPromises from "fs/promises";

const writeFile = async (path, data) => {
  await fs.writeFile(path, data);
};

const readFile = async (path) => {
  const content = await fs.readFile(path, { encoding: "utf-8" });

  return content;
};

const appendFile = async (path, data) => {
  await fs.appendFile(path, data);
};

export default {
  writeFile,
  readFile,
  appendFile,
};
