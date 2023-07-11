import { Router } from "express";
import { randomUUID } from "node:crypto";

import { Database } from "../database.js";

const userRoute = Router();

const database = new Database();

userRoute.get("/user/", (request, response) => {
  const { busca } = request.query;

  const data = database.select("user", busca);

  response.json(data);
});

userRoute.post("/user/", (request, response) => {
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

userRoute.delete("/user/:id", (request, response) => {
  const { id } = request.params;

  const result = database.delete("user", id);

  if (!result.error) {
    response.status(202).json(result);
  } else {
    response.status(404).json(result);
  }
});

userRoute.put("/user/:id", (request, response) => {
  const { id } = request.params;

  const requestBody = request.body;

  const result = database.update("user", id, requestBody);

  if (!result.error) {
    response.status(202).json(result);
  } else {
    response.status(404).json(result);
  }
});

export { userRoute };
