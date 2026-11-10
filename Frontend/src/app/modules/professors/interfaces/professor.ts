export interface Professor {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  department: string;
  status: boolean;
}

export type CreateProfessorRequest = Omit<Professor, "id">;

export type UpdateProfessorRequest = Omit<Professor, "id">;