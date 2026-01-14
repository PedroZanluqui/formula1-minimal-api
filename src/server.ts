import fastify from "fastify";
import cors from "@fastify/cors";

import { teams_F1 } from "./repositories/teams";
import { pilots_F1 } from "./repositories/pilots";

interface PilotsParams {
  id: string;
  name: string;
  team: string;
}

const server = fastify({ logger: true });
server.register(cors, {
  origin: "*",
  methods: ["GET"],
});

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return [teams_F1];
});

server.get("/pilots", async (request, response) => {
  response.type("application/json").code(200);
  return [pilots_F1];
});

server.get<{ Params: PilotsParams }>(
  "/pilots/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const pilot = pilots_F1.find((p) => p.id === id);

    if (!pilot) {
      response.type("application/json").code(404);
      return { message: "Piloto não encontrado" };
    } else {
      response.type("application/json").code(200);
      return { pilot };
    }
  }
);

server.listen({ port: Number(process.env.PORT) || 3333 }, () => {
  console.log(`Servidor Iniciado na Porta ${process.env.PORT || 3333}`);
});
