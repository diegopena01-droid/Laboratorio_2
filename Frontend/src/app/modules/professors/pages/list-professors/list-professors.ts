import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { AlertService } from '../../../shared/services/alert.service';
import { TableProfessors } from '../../components/table-professors/table-professors';
import { Professor } from '../../interfaces/professor';
import { TableProfessorsEvents } from '../../interfaces/table-professors';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-list-professors',
  imports: [
    Button,
    TableProfessors
  ],
  templateUrl: './list-professors.html',
})
export class ListProfessors {

  professors: Professor[] = [];

  createButtonConfig: ButtonConfig = {
    id: 'create-professor-button',
    title: 'Create Professor',
    type: 'primary',
  };

  router = inject(Router);
  professorService = inject(ProfessorService);
  alertService = inject(AlertService);

  ngOnInit() {
    this.getProfessors();
  }

  getProfessors(){
    this.professorService.getAll().subscribe({
      next: (professors: Professor[]) => {
        this.professors = professors;
      },
      error: (error: any) => {
        console.error('Error fetching professors:', error);
        this.alertService.toast('Error al consultar los profesores', 'error');
      }
    });
  }

  createProfessor(){
    this.router.navigateByUrl('/professors/create');
  }

  tableEvents({ id, action }: TableProfessorsEvents){
    switch(action){
      case 'detail':
        this.viewDetail(id);
        break;
      case 'edit':
        this.update(id);
        break;
      case 'delete':
        this.delete(id);
        break;
    }
  }

  viewDetail(id: number){
    this.router.navigateByUrl(`/professors/detail/${id}`);
  }

  update(id: number){
    this.router.navigateByUrl(`/professors/update/${id}`);
  }

  async delete(id: number){
    const title = '¿Esta seguro?';
    const text = `Se va eliminar el profesor ${id}`;
    const confirm = await this.alertService.confirm(title, text);
    if(confirm){
      this.professorService.delete(id).subscribe({
        next: () => {
          this.alertService.toast('Eliminación Exitosa', 'success');
          this.getProfessors();
        },
        error: () => {
          this.alertService.toast('Error al eliminar el profesor', 'error');
        }
      });
    }

  }

}