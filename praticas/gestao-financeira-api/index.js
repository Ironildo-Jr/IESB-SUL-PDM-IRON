const { app, initDb } = require("./src/app");
const { saveDb } = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await initDb();

    const server = app.listen(PORT, () => {
      console.log(`gestao-financeira-api rodando em http://localhost:${PORT}`);
    });

    function shutdown() {
      try {
        saveDb();
      } catch (error) {
        console.error("Falha ao salvar banco de dados na saída:", error);
      }
      server.close(() => process.exit(0));
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Falha ao inicializar o banco de dados:", error);
    process.exit(1);
  }
}

start();
