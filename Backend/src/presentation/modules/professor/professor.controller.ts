import { Request, Response } from "express";
import { CreateProfessorDTO } from "../../../domain/dtos/create-professor.dto";
import { UpdateProfessorDTO } from "../../../domain/dtos/update-professor.dto";
import { HandleError } from "../../../domain/errors/handle.error";
import { ProfessorService } from "./professor.service";

export class ProfessorController {
  private readonly professorService = new ProfessorService();

  getAllProfessors = (req: Request, res: Response): void => {
    this.professorService
      .getAllProfessors()
      .then((professors) => res.status(200).json(professors))
      .catch((error) => HandleError.error(error, res));
  };

  getProfessorById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    this.professorService
      .getProfessorById(id)
      .then((professor) => {
        if (!professor) {
          return res.status(404).json({ error: `Profesor con id ${id} no encontrado` });
        }
        res.status(200).json(professor);
      })
      .catch((error) => HandleError.error(error, res));
  };

  createProfessor = (req: Request, res: Response) => {
    const [error, createProfessorDTO] = CreateProfessorDTO.create(req.body);
    if (error) return res.status(400).json({ error });

    this.professorService
      .createProfessor(createProfessorDTO!)
      .then((professor) => res.status(201).json(professor))
      .catch((error) => HandleError.error(error, res));
  };

  updateProfessor = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateProfessorDTO] = UpdateProfessorDTO.create(req.body);
    if (error) return res.status(400).json({ error });

    this.professorService
      .updateProfessor(id, updateProfessorDTO!)
      .then((professor) => res.status(200).json(professor))
      .catch((error) => HandleError.error(error, res));
  };

  deleteProfessor = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    this.professorService
      .deleteProfessor(id)
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };
}
