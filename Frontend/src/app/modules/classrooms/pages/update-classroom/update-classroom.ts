import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Classroom, UpdateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-update-classroom',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-classroom.html',
})
export class UpdateClassroom {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private classroomService = inject(ClassroomService);

  floors = Array.from({ length: 10 }, (_, i) => i + 1);

  classroomForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(20)]],
    building: ['', [Validators.required, Validators.maxLength(50)]],
    capacity: ['', [Validators.required, Validators.min(5), Validators.max(200)]],
    floor: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
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
    this.getClassroom();
  }

  getClassroom() {
    this.classroomService.getById(this.id).subscribe({
      next: (classroom) => {
        this.setValues(classroom);
      },
      error: (error: any) => {
        console.error('Error fetching classrooms:', error);
        this.alertService.toast('Error al consultar el salón', 'error');
        this.goToList();
      }
    });
  }

  setValues(classroom: Classroom): void {
    this.classroomForm.patchValue({
      code: classroom.code,
      building: classroom.building,
      capacity: String(classroom.capacity),
      floor: String(classroom.floor),
      status: classroom.status
    });
  }

  updateClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }
    const formValue = this.classroomForm.getRawValue();
    const classroom: UpdateClassroomRequest = {
      code: formValue.code!,
      building: formValue.building!,
      capacity: Number(formValue.capacity),
      floor: Number(formValue.floor),
      status: formValue.status!
    };

    this.classroomService.update(this.id, classroom).subscribe({
      next: () => {
        this.alertService.toast(
          'Salón actualizado correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating classroom:', error);
        this.alertService.toast(
          'Error al actualizar el salón',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('classrooms');
  }

}