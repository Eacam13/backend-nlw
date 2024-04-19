import {
  BadRquest
} from "./chunk-TORSPUIQ.mjs";

// src/utils/error.handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error durind validation",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRquest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "Internal server error" });
};

export {
  errorHandler
};
