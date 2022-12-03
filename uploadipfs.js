const filesFromPath = require("files-from-path").filesFromPath;
const NFTStorage = require("nft.storage").NFTStorage;
var path = require("path");
const fs = require("fs");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJhNWQzZTU2OTlDRTllZDYwMUZhRkUwYzhiZmI1MzJCYjRFYWI5OTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NTQyNTUzNDk0OCwibmFtZSI6InNkc2QifQ.3wabmCtAPSt4_6vNdD0NCLMeZIHvMthxfs9gETb5mq4";

async function main() {
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 3) {
    console.error(
      `usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`
    );
  }
  const storage = new NFTStorage({ token });
  const directoryPath = process.argv[2];
  const files = filesFromPath(directoryPath, {
    pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  });

  console.log(`storing file(s) from ${path}`);
  const cid = await storage.storeDirectory(files);
  console.log({ cid });

  const status = await storage.status(cid);
  console.log(status);
}
main();
