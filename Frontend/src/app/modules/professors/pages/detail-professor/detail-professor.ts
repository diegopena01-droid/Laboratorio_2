import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Professor } from '../../interfaces/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-detail-professor',
  imports: [Back, CommonModule],
  templateUrl: './detail-professor.html',
})
export class DetailProfessor {

  professor: Professor | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private professorService = inject(ProfessorService);
  private alertService = inject(AlertService);

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProfessor(id);
  }

  getProfessor(id: number){
    this.professorService.getById(id).subscribe({
      next: (professor) => {
        this.professor = professor;
      },
      error: (error: any) => {
        console.error('Error fetching professors:', error);
        this.alertService.toast('Error al consultar el profesor', 'error');
        this.router.navigateByUrl('/professors');
      }
    });
  }

}