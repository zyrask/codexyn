import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProgressUpdateSchema, insertProgressImageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Progress Updates Routes
  app.get("/api/progress-updates", async (req, res) => {
    try {
      const updates = await storage.getProgressUpdates();
      res.json(updates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress updates" });
    }
  });

  app.post("/api/progress-updates", async (req, res) => {
    try {
      const validatedData = insertProgressUpdateSchema.parse(req.body);
      const update = await storage.createProgressUpdate(validatedData);
      res.status(201).json(update);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress update data" });
    }
  });

  // Progress Images Routes
  app.get("/api/progress-images", async (req, res) => {
    try {
      const images = await storage.getProgressImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress images" });
    }
  });

  app.post("/api/progress-images", async (req, res) => {
    try {
      const validatedData = insertProgressImageSchema.parse(req.body);
      const image = await storage.createProgressImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress image data" });
    }
  });

  // Update progress update
  app.patch("/api/progress-updates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProgressUpdateSchema.partial().parse(req.body);
      const update = await storage.updateProgressUpdate(id, validatedData);
      if (!update) {
        res.status(404).json({ message: "Progress update not found" });
        return;
      }
      res.json(update);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress update data" });
    }
  });

  // Delete progress update
  app.delete("/api/progress-updates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProgressUpdate(id);
      if (!success) {
        res.status(404).json({ message: "Progress update not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Update progress image
  app.patch("/api/progress-images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProgressImageSchema.partial().parse(req.body);
      const image = await storage.updateProgressImage(id, validatedData);
      if (!image) {
        res.status(404).json({ message: "Progress image not found" });
        return;
      }
      res.json(image);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress image data" });
    }
  });

  // Delete progress image
  app.delete("/api/progress-images/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProgressImage(id);
      if (!success) {
        res.status(404).json({ message: "Progress image not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
