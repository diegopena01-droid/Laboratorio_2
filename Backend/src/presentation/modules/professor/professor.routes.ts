import { Router } from "express";
import { ProfessorController } from "./professor.controller";

export class ProfessorRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ProfessorController();

    router.get("/", controller.getAllProfessors);
    router.get("/:id", controller.getProfessorById);
    router.post("/", controller.createProfessor);
    router.put("/:id", controller.updateProfessor);
    router.delete("/:id", controller.deleteProfessor);

    return router;
  }
}
