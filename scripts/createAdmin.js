import "../src/env.js";
import readline from "node:readline";
import mongoose from "mongoose";
import Admin from "../src/models/Admin.js";

const [username] = process.argv.slice(2);
const force = process.argv.includes("--force");

if (!username) {
  console.error("Usage: npm run create-admin -- <username> [--force]");
  process.exit(1);
}

if (!process.stdin.isTTY) {
  console.error("Password prompt requires an interactive terminal.");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

let muted = false;

rl._writeToOutput = (stringToWrite) => {
  if (muted) {
    rl.output.write(stringToWrite.replace(/[^\x00-\x1f\x7f-\x9f]/g, "*"));
  } else {
    rl.output.write(stringToWrite);
  }
};

const password = await new Promise((resolve) => {
  rl.question("Password: ", resolve);
  muted = true;
  rl.on("close", () => resolve(null));
});
muted = false;

if (password === null) {
  console.error("\nNo password provided.");
  process.exit(1);
}

process.stdout.write("\n");

if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);

const existing = await Admin.findOne({ username });

if (existing && !force) {
  console.error(`Admin with username ${username} already exists. Use --force to overwrite.`);
  process.exit(1);
}

if (existing && force) {
  await Admin.deleteOne({ username });
}

const admin = await Admin.create({ username, password });

console.log(`✅ Admin created: ${admin.username}`);
process.exit(0);
