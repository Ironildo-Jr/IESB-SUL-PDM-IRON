const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");

const schemaPath = path.join(__dirname, "..", "..", "db", "schema.sql");
const dataDir = path.join(__dirname, "..", "..", "data");
const databasePath = path.join(dataDir, "database.sqlite");

let dbInstance;

function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadSchema() {
  return fs.readFileSync(schemaPath, "utf-8");
}

function saveDb() {
  if (!dbInstance) {
    throw new Error("Banco de dados não inicializado");
  }

  const binaryArray = dbInstance.export();
  fs.writeFileSync(databasePath, Buffer.from(binaryArray));
}

async function initDb() {
  if (dbInstance) {
    return dbInstance;
  }

  ensureDataDirectory();

  const SQL = await initSqlJs({
    locateFile: (file) => path.join(__dirname, "..", "..", "node_modules", "sql.js", "dist", file),
  });

  if (fs.existsSync(databasePath)) {
    const fileBuffer = fs.readFileSync(databasePath);
    dbInstance = new SQL.Database(new Uint8Array(fileBuffer));
  } else {
    dbInstance = new SQL.Database();
    const schema = loadSchema();
    dbInstance.exec(schema);
    saveDb();
  }

  dbInstance.exec("PRAGMA foreign_keys = ON;");
  return dbInstance;
}

function getDb() {
  if (!dbInstance) {
    throw new Error("Banco de dados ainda não inicializado");
  }
  return dbInstance;
}

module.exports = {
  initDb,
  getDb,
  saveDb,
};
