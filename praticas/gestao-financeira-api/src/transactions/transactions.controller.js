const { getDb, saveDb } = require("../config/db");

function validateTransactionPayload(payload, isUpdate = false) {
  const errors = [];

  if (!isUpdate || payload.description !== undefined) {
    if (typeof payload.description !== "string" || payload.description.trim().length === 0) {
      errors.push({ field: "description", message: "Descrição é obrigatória" });
    }
  }

  if (!isUpdate || payload.value !== undefined) {
    if (typeof payload.value !== "number" || Number.isNaN(payload.value)) {
      errors.push({ field: "value", message: "Valor deve ser numérico" });
    }
  }

  if (!isUpdate || payload.date !== undefined) {
    if (typeof payload.date !== "string" || !payload.date.trim()) {
      errors.push({ field: "date", message: "Data é obrigatória" });
    } else {
      const parsed = Date.parse(payload.date);
      if (Number.isNaN(parsed)) {
        errors.push({ field: "date", message: "Data inválida" });
      }
    }
  }

  if (!isUpdate || payload.categoryId !== undefined) {
    if (typeof payload.categoryId !== "number" || !Number.isInteger(payload.categoryId)) {
      errors.push({ field: "categoryId", message: "categoryId deve ser um número inteiro" });
    } else {
      const db = getDb();
      const category = db.prepare("SELECT id FROM categories WHERE id = ?").get(payload.categoryId);
      if (!category) {
        errors.push({ field: "categoryId", message: "Categoria não encontrada" });
      }
    }
  }

  return errors;
}

function sendInvalidData(res, details) {
  return res.status(400).json({ error: "Dados inválidos", details });
}

function createTransaction(req, res) {
  const db = getDb();
  const payload = req.body;
  try {
    console.log("[createTransaction] payload:", payload);
  } catch (e) {}

  // coerce Date objects (if any) to ISO date strings
  if (payload && payload.date && typeof payload.date !== "string" && payload.date instanceof Date) {
    payload.date = payload.date.toISOString().slice(0, 10);
  }
  const errors = validateTransactionPayload(payload);

  if (errors.length > 0) {
    return sendInvalidData(res, errors);
  }

  try {
    const category = db.prepare("SELECT id, name, displayName, icon, background, isIncome FROM categories WHERE id = ?").get(payload.categoryId);
    const stmt = db.prepare(
      `INSERT INTO transactions (description, value, date, categoryId)
       VALUES (?, ?, ?, ?)`
    );
    const info = stmt.run([payload.description.trim(), payload.value, payload.date, payload.categoryId]);
    // log returned info for debugging
    try {
      console.log("[createTransaction] stmt.run result:", info);
    } catch (e) {}

    saveDb();

    const transaction = {
      id: info.lastInsertRowid,
      description: payload.description.trim(),
      value: payload.value,
      date: payload.date,
      categoryId: payload.categoryId,
      category: {
        ...category,
        isIncome: Boolean(category.isIncome),
      },
    };

    res.status(201).json(transaction);
    return;
  } catch (err) {
    console.error("[createTransaction] DB error:", err);
    try {
      console.error(err.stack);
    } catch (e) {}
    console.error("payload:", payload);
    return res.status(500).json({ error: "Erro interno ao criar transação", detail: err.message });
  }
}

function listTransactions(req, res) {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT t.id, t.description, t.value, t.date, t.categoryId,
            c.id as category_id, c.name as category_name, c.displayName as category_displayName,
            c.icon as category_icon, c.background as category_background, c.isIncome as category_isIncome
     FROM transactions t
     JOIN categories c ON t.categoryId = c.id
     ORDER BY t.id`
  );

  const execRes = db.exec(
    `SELECT t.id, t.description, t.value, t.date, t.categoryId,
            c.id as category_id, c.name as category_name, c.displayName as category_displayName,
            c.icon as category_icon, c.background as category_background, c.isIncome as category_isIncome
     FROM transactions t
     JOIN categories c ON t.categoryId = c.id
     ORDER BY t.id`
  );

  const rows = (execRes && execRes[0] && execRes[0].values) ? execRes[0].values : [];
  const cols = execRes && execRes[0] ? execRes[0].columns : [];
  const results = rows.map((values) => {
    const row = {};
    cols.forEach((c, i) => (row[c] = values[i]));
    return {
      id: row.id,
      description: row.description,
      value: row.value,
      date: row.date,
      categoryId: row.categoryId,
      category: {
        id: row.category_id,
        name: row.category_name,
        displayName: row.category_displayName,
        icon: row.category_icon,
        background: row.category_background,
        isIncome: Boolean(row.category_isIncome),
      },
    };
  });

  res.json(results);
}

function deleteTransaction(req, res) {
  const db = getDb();
  const transactionId = Number(req.params.id);
  const transaction = db.prepare("SELECT id FROM transactions WHERE id = ?").get(transactionId);

  if (!transaction) {
    return res.status(404).json({ error: "Transação não encontrada" });
  }

  db.prepare("DELETE FROM transactions WHERE id = ?").run(transactionId);
  saveDb();
  res.status(204).send();
}

function updateTransaction(req, res) {
  const db = getDb();
  const transactionId = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM transactions WHERE id = ?").get(transactionId);

  if (!existing) {
    return res.status(404).json({ error: "Transação não encontrada" });
  }

  const payload = req.body;
  try {
    console.log("[updateTransaction] payload:", payload);
  } catch (e) {}

  if (payload && payload.date && typeof payload.date !== "string" && payload.date instanceof Date) {
    payload.date = payload.date.toISOString().slice(0, 10);
  }
  const errors = validateTransactionPayload(payload, true);

  if (errors.length > 0) {
    return sendInvalidData(res, errors);
  }

  const updated = {
    description: payload.description !== undefined ? payload.description.trim() : existing.description,
    value: payload.value !== undefined ? payload.value : existing.value,
    date: payload.date !== undefined ? payload.date : existing.date,
    categoryId: payload.categoryId !== undefined ? payload.categoryId : existing.categoryId,
  };

  try {
    const updStmt = db.prepare(
      `UPDATE transactions SET description = ?, value = ?, date = ?, categoryId = ? WHERE id = ?`
    );
    const updInfo = updStmt.run([updated.description, updated.value, updated.date, updated.categoryId, transactionId]);
    try {
      console.log("[updateTransaction] stmt.run result:", updInfo);
    } catch (e) {}

    saveDb();

    const category = db.prepare("SELECT id, name, displayName, icon, background, isIncome FROM categories WHERE id = ?").get(updated.categoryId);

    const transaction = {
      id: transactionId,
      description: updated.description,
      value: updated.value,
      date: updated.date,
      categoryId: updated.categoryId,
      category: {
        ...category,
        isIncome: Boolean(category.isIncome),
      },
    };

    res.json(transaction);
  } catch (err) {
    console.error("[updateTransaction] DB error:", err);
    try {
      console.error(err.stack);
    } catch (e) {}
    console.error("payload:", payload);
    return res.status(500).json({ error: "Erro interno ao atualizar transação", detail: err.message });
  }
}

module.exports = {
  createTransaction,
  listTransactions,
  deleteTransaction,
  updateTransaction,
};
