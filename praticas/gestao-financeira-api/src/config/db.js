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
    // Re-apply schema (INSERT OR IGNORE for seed rows) to ensure seeds exist
    try {
      const schema = loadSchema();
      dbInstance.exec(schema);
      // Ensure sqlite_sequence for categories is at least the current max id
      try {
        const res = dbInstance.exec("SELECT MAX(id) as maxId FROM categories");
        const maxId = (res && res[0] && res[0].values && res[0].values[0] && res[0].values[0][0]) || 0;
        if (maxId && Number(maxId) > 0) {
          // update sqlite_sequence if present
          try {
            dbInstance.exec(`UPDATE sqlite_sequence SET seq = ${Number(maxId)} WHERE name = 'categories';`);
          } catch (e) {
            // sqlite_sequence may not exist or update may fail; ignore safely
          }
        }
      } catch (e) {
        // ignore
      }
      // persist possible inserted seeds
      const binaryArrayAfter = dbInstance.export();
      fs.writeFileSync(databasePath, Buffer.from(binaryArrayAfter));
    } catch (e) {
      // ignore schema re-apply errors but log
      try { console.error('[initDb] error re-applying schema:', e && e.message ? e.message : e); } catch (ee) {}
    }
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
