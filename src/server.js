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

// http://localhost:3333/da4603af-0f8d-45ae-8068-65710f2c27ba

server.delete("/:id", (request, response) => {
  const { id } = request.params;

  const result = database.delete("user", id);

  if (!result.error) {
    response.status(202).json(result);
  } else {
    response.status(404).json(result);
  }
});

server.put("/:id", (request, response) => {
  const { id } = request.params;
  const requestBody = request.body;

  const result = database.update("user", id, requestBody);

  if (!result.error) {
    response.status(202).json(result);
  } else {
    response.status(404).json(result);
  }
});

server.listen(port, () => {
  console.log(`🚀 Servidor em funcionamento!!! - http://localhost:${port}`);
});
