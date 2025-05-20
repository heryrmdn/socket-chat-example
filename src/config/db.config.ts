import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export const DBConnect = async () => {
  // open the database file
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database,
  })

  // create our 'messages' table (you can ignore the 'client_offset' column for now)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_offset TEXT UNIQUE,
        content TEXT
    );
  `)

  return db
}
