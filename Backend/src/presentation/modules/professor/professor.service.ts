import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateProfessor, Professor, UpdateProfessor } from "../../../domain/interfaces/professor.interface";

export class ProfessorService {
  public async getAllProfessors(): Promise<Professor[]> {
    const sql = `SELECT * FROM professors ORDER BY id ASC;`;
    const result = await pool.query(sql);
    return result.rows;
  }

  public async getProfessorById(id: number): Promise<Professor | null> {
    const sql = `SELECT * FROM professors WHERE id = $1;`;
    const professor = (await pool.query<Professor>(sql, [id])).rows[0];
    return professor ?? null;
  }

  public async createProfessor(professor: CreateProfessor): Promise<Professor> {
    const sql = `
      INSERT INTO professors (
        name,
        email,
        phone,
        specialty,
        department,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      professor.name,
      professor.email,
      professor.phone,
      professor.specialty,
      professor.department,
      professor.status
    ];

    const professorCreated = (await pool.query<Professor>(sql, values)).rows[0];
    if (!professorCreated) {
      throw CustomError.internalServer(`No se pudo registrar el profesor`);
    }
    return professorCreated;
  }

  public async updateProfessor(
    id: number,
    professor: UpdateProfessor
  ): Promise<Professor> {
    const existingProfessor = await this.getProfessorById(id);
    if (!existingProfessor) {
      throw CustomError.internalServer(`No existe un profesor con ese id`);
    }

    const sql = `
      UPDATE professors
      SET
        name = $1,
        email = $2,
        phone = $3,
        specialty = $4,
        department = $5,
        status = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [
      professor.name,
      professor.email,
      professor.phone,
      professor.specialty,
      professor.department,
      professor.status,
      id
    ];

    const professorUpdated = (await pool.query<Professor>(sql, values)).rows[0];
    if (!professorUpdated) {
      throw CustomError.internalServer(`No se pudo actualizar el profesor`);
    }
    return professorUpdated;
  }

  public async deleteProfessor(id: number): Promise<boolean> {
    const existingProfessor = await this.getProfessorById(id);
    if (!existingProfessor) {
      throw CustomError.internalServer(`No existe un profesor con ese id`);
    }

    const sql = `
      DELETE FROM professors
      WHERE id = $1
      RETURNING id;
    `;
    const result = await pool.query(sql, [id]);
    if (!result) {
      throw CustomError.internalServer(`No se pudo eliminar el profesor`);
    }
    return result.rowCount !== null && result.rowCount > 0;
  }
}
