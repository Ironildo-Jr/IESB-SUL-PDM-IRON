CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  displayName TEXT NOT NULL,
  icon TEXT NOT NULL,
  background TEXT NOT NULL,
  isIncome INTEGER NOT NULL,
  isSeed INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  value REAL NOT NULL,
  date TEXT NOT NULL,
  categoryId INTEGER NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT OR IGNORE INTO categories (id, name, displayName, icon, background, isIncome, isSeed) VALUES
  (1, 'income', 'Renda', 'work', '#A5F3FC', 1, 1),
  (2, 'food', 'Alimentação', 'fastfood', '#FCE7F3', 0, 1),
  (3, 'house', 'Casa', 'home', '#E0F2FE', 0, 1),
  (4, 'education', 'Educação', 'book', '#DBEAFE', 0, 1),
  (5, 'travel', 'Viagens', 'airplanemode-active', '#ECFCCB', 0, 1);
