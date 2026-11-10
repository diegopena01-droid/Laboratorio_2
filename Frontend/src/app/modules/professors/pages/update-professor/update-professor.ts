import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Professor, UpdateProfessorRequest } from '../../interfaces/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-update-professor',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-professor.html',
})
export class UpdateProfessor {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getProfessor();
  }

  getProfessor() {
    this.professorService.getById(this.id).subscribe({
      next: (professor) => {
        this.setValues(professor);
      },
      error: (error: any) => {
        console.error('Error fetching professors:', error);
        this.alertService.toast('Error al consultar el profesor', 'error');
        this.goToList();
      }
    });
  }

  setValues(professor: Professor): void {
    this.professorForm.patchValue({
      name: professor.name,
      email: professor.email,
      phone: professor.phone,
      specialty: professor.specialty,
      department: professor.department,
      status: professor.status
    });
  }

  updateProfessor(): void {
    if (this.professorForm.invalid) {
      this.professorForm.markAllAsTouched();
      return;
    }
    const formValue = this.professorForm.getRawValue();
    const professor: UpdateProfessorRequest = {
      name: formValue.name!,
      email: formValue.email!,
      phone: formValue.phone!,
      specialty: formValue.specialty!,
      department: formValue.department!,
      status: formValue.status!
    };

    this.professorService.update(this.id, professor).subscribe({
      next: () => {
        this.alertService.toast(
          'Profesor actualizado correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating professor:', error);
        this.alertService.toast(
          'Error al actualizar el profesor',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('professors');
  }

}