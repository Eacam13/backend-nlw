import {
  generateSlug
} from "./chunk-KDMJHR3Z.mjs";
import {
  BadRquest
} from "./chunk-TORSPUIQ.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        title: z.string().min(4),
        details: z.string(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const { title, details, maximumAttendees } = request.body;
    const slug = generateSlug(title);
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (eventWithSameSlug !== null)
      throw new BadRquest("Event with same title already exists");
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
    return reply.status(201).send({ eventId: event.id });
  });
}

export {
  createEvent
};
