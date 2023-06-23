import express from "express";
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const server = express();
const port = 3333;

const database = new Database();

server.use(express.json());

server.get("/", (request, response) => {
  const { busca } = request.query;

  const data = database.select("user", busca);

  response.json(data);
});

server.post("/", (request, response) => {
  const requestBody = request.body;

  const msg = JSON.stringify(requestBody);

  if (msg.length > 2) {
    // data.push(requestBody);

    database.insert("user", {
      id: randomUUID(),
      name: requestBody.name,
      curso: requestBody.curso,
      estado: requestBody.estado,
    });

    response.status(201).json({ msg: "Arquivo salvo com sucesso!" });
  } else {
    response.status(400).send("Rota sem body ou sem conteúdo");
  }
});

server.listen(port, () => {
  console.log(`🚀 Servidor em funcionamento!!! - http://localhost:${port}`);
});
