const filesFromPath = require("files-from-path").filesFromPath;
const NFTStorage = require("nft.storage").NFTStorage;
var path = require("path");
const fs = require("fs");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJhNWQzZTU2OTlDRTllZDYwMUZhRkUwYzhiZmI1MzJCYjRFYWI5OTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NTQyNTUzNDk0OCwibmFtZSI6InNkc2QifQ.3wabmCtAPSt4_6vNdD0NCLMeZIHvMthxfs9gETb5mq4";
const directoryPath = process.argv[2];

const storage = new NFTStorage({ token });

async function upload(folder) {
  console.log("uploading...");
  const files = filesFromPath(folder, {
    pathPrefix: path.resolve(folder),
    hidden: true,
  });
  const cid = await storage.storeDirectory(files);
  console.log("storef");
  if (cid !== undefined) {
    await sendData(cid, folder);
  }
  console.log({ cid });
  const status = await storage.status(cid);
  // await sleep(20000);
  console.log(status);
}

async function main() {
  console.log("triggred");
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`
    );
  }

  // console.log(`storing file(s) from ${path}`);

  for await (const f of filesFromPath(directoryPath)) {
    await upload(directoryPath);
  }
  // main();
}
main();
