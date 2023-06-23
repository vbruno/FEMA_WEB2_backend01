import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.database = JSON.parse(data);
      })
      .catch(() => {
        this.persist();
      });
  }

  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database));
  }

  // database.select('user')
  // database.select('user', 'rafael')

  // "  BruNo  "
  // "BRUNO"

  select(table, search = "") {
    const data = this.database[table] ?? [];

    if (search) {
      const searchUppercase = search.toUpperCase().trim();

      const result = data.find((item) => {
        return item.name.toUpperCase().trim() === searchUppercase;
      });

      if (result) {
        return result;
      } else {
        return { msg: "Não foi encontrado ninguem!" };
      }
    } else {
      return data;
    }
  }

  insert(table, data) {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data);
    } else {
      this.database[table] = [data];
    }
    this.persist();
  }
}
