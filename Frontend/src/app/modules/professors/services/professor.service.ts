import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProfessorRequest, Professor, UpdateProfessorRequest } from '../interfaces/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {

  http = inject(HttpClient);
  url = 'http://localhost:3000/api/professors';

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.url);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.url}/${id}`);
  }

  create(professor: CreateProfessorRequest): Observable<Professor> {
    return this.http.post<Professor>(this.url, professor);
  }

  update(id: number, professor: UpdateProfessorRequest): Observable<Professor> {
    return this.http.put<Professor>(`${this.url}/${id}`, professor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}