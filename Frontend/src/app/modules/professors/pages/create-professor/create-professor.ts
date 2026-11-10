import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateProfessorRequest } from '../../interfaces/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-create-professor',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-professor.html',
})
export class CreateProfessor {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private professorService = inject(ProfessorService);

  professorForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    specialty: ['', [Validators.required, Validators.maxLength(100)]],
    department: ['', [Validators.required, Validators.maxLength(100)]],
    status: [true]
  });

  createProfessor(): void {
    if (this.professorForm.invalid) {
      this.professorForm.markAllAsTouched();
      return;
    }
    const professor: CreateProfessorRequest = {
      name: this.professorForm.value.name!,
      email: this.professorForm.value.email!,
      phone: this.professorForm.value.phone!,
      specialty: this.professorForm.value.specialty!,
      department: this.professorForm.value.department!,
      status: this.professorForm.value.status!
    };
    this.professorService.create(professor).subscribe({
      next: () => {
        this.alertService.toast(
          'Profesor registrado correctamente',
          'success'
        );
        this.router.navigateByUrl('/professors');
      },
      error: () => {
        this.alertService.toast('Error al crear el profesor', 'error');
      }
    });
  }

}