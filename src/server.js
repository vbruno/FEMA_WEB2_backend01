import express from "express";
import { Database } from "./database.js";

const server = express();
const port = 3333;

const database = new Database();

server.use(express.json());

server.get("/", (request, response) => {
  const { busca } = request.query;

  console.log(busca);

  if (data.length > 0) {
    if (busca) {
      console.log(!!busca);
      response.json({ msg: "Encontrei" });
    } else {
      response.json(data);
    }
  } else {
    response.json({ msg: "Data está vazio" });
  }
});

server.post("/", (request, response) => {
  const requestBody = request.body;

  const msg = JSON.stringify(requestBody);

  if (msg.length > 2) {
    // data.push(requestBody);

    database.insert("user", requestBody);

    response.status(201).json({ msg: "Arquivo salvo com sucesso!" });
  } else {
    response.status(400).send("Rota sem body ou sem conteúdo");
  }
});

server.listen(port, () => {
  console.log(`🚀 Servidor em funcionamento!!! - http://localhost:${port}`);
});
