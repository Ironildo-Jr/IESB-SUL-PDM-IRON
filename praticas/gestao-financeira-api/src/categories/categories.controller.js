const { getDb, saveDb } = require("../config/db");

function validateCategoryPayload(payload, isUpdate = false) {
  const errors = [];

  if (!isUpdate || payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim().length === 0) {
      errors.push({ field: "name", message: "Nome é obrigatório" });
    }
  }

  if (!isUpdate || payload.displayName !== undefined) {
    if (typeof payload.displayName !== "string" || payload.displayName.trim().length === 0) {
      errors.push({ field: "displayName", message: "displayName é obrigatório" });
    }
  }

  if (!isUpdate || payload.icon !== undefined) {
    if (typeof payload.icon !== "string" || payload.icon.trim().length === 0) {
      errors.push({ field: "icon", message: "Icon é obrigatório" });
    }
  }

  if (!isUpdate || payload.background !== undefined) {
    if (typeof payload.background !== "string" || payload.background.trim().length === 0) {
      errors.push({ field: "background", message: "Background é obrigatório" });
    }
  }

  if (!isUpdate || payload.isIncome !== undefined) {
    if (typeof payload.isIncome !== "boolean") {
      errors.push({ field: "isIncome", message: "isIncome deve ser booleano" });
    }
  }

  return errors;
}

function sendInvalidData(res, details) {
  return res.status(400).json({ error: "Dados inválidos", details });
}

function listCategories(req, res) {
  const db = getDb();
  const sql = "SELECT id, name, displayName, icon, background, isIncome FROM categories ORDER BY id";
  const execRes = db.exec(sql);
  const result = (execRes && execRes[0] && execRes[0].values ? execRes[0].values : []).map((values) => {
    const cols = execRes[0].columns;
    const row = {};
    cols.forEach((c, i) => {
      row[c] = values[i];
    });
    return {
      ...row,
      isIncome: Boolean(row.isIncome),
    };
  });
  res.json(result);
}

function createCategory(req, res) {
  try {
    const db = getDb();
    const payload = req.body;
    console.log("[categories] createCategory payload:", payload);

    const errors = validateCategoryPayload(payload);

    if (errors.length > 0) {
      console.error("[categories] validation errors:", errors, "payload:", payload);
      return sendInvalidData(res, errors);
    }

    const stmt = db.prepare(
      `INSERT INTO categories (name, displayName, icon, background, isIncome, isSeed)
       VALUES (?, ?, ?, ?, ?, 0)`
    );

    const params = [
      String(payload.name).trim(),
      String(payload.displayName).trim(),
      String(payload.icon).trim(),
      String(payload.background).trim(),
      payload.isIncome ? 1 : 0,
    ];

    try {
      console.log("[categories] insert params:", params);
    } catch (e) {}

    let info;
    try {
      info = stmt.run(params);
    } catch (err) {
      console.error("[categories] stmt.run error:", err && err.message ? err.message : err);
      console.error("payload for insert:", payload);
      return res.status(500).json({ error: "Erro ao inserir categoria", details: err && err.message ? err.message : String(err) });
    }

    try {
      saveDb();
    } catch (e) {
      console.error("[categories] saveDb error:", e && e.message ? e.message : e);
      return res.status(500).json({ error: "Erro ao salvar categoria", details: (e && e.message) || String(e) });
    }

    const created = db.prepare("SELECT id, name, displayName, icon, background, isIncome FROM categories WHERE id = ?").get(info.lastInsertRowid);
    res.status(201).json({ ...created, isIncome: Boolean(created.isIncome) });
    return;
  } catch (err) {
    console.error("[categories] unexpected error:", err && err.message ? err.message : err);
    console.error(err && err.stack ? err.stack : err);
    return res.status(500).json({ error: "Erro inesperado ao criar categoria", details: err && err.message ? err.message : String(err) });
  }
}

function updateCategory(req, res) {
  const db = getDb();
  const categoryId = Number(req.params.id);
  const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(categoryId);

  if (!category) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

  const payload = req.body;
  const errors = validateCategoryPayload(payload, true);

  if (errors.length > 0) {
    return sendInvalidData(res, errors);
  }

  const updated = {
    name: payload.name !== undefined ? payload.name.trim() : category.name,
    displayName: payload.displayName !== undefined ? payload.displayName.trim() : category.displayName,
    icon: payload.icon !== undefined ? payload.icon.trim() : category.icon,
    background: payload.background !== undefined ? payload.background.trim() : category.background,
    isIncome: payload.isIncome !== undefined ? (payload.isIncome ? 1 : 0) : category.isIncome,
  };

  db.prepare(
    `UPDATE categories SET name = ?, displayName = ?, icon = ?, background = ?, isIncome = ? WHERE id = ?`
  ).run(
    updated.name,
    updated.displayName,
    updated.icon,
    updated.background,
    updated.isIncome,
    categoryId
  );

  saveDb();

  const result = db.prepare("SELECT id, name, displayName, icon, background, isIncome FROM categories WHERE id = ?").get(categoryId);
  res.json({ ...result, isIncome: Boolean(result.isIncome) });
}

function deleteCategory(req, res) {
  const db = getDb();
  const categoryId = Number(req.params.id);
  const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(categoryId);

  if (!category) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

  if (category.isSeed) {
    return res.status(400).json({ message: "Categorias padrão não podem ser excluídas" });
  }

  db.prepare("DELETE FROM categories WHERE id = ?").run(categoryId);
  saveDb();
  res.status(204).send();
}

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
