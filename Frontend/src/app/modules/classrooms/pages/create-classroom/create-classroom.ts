import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-create-classroom',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-classroom.html',
})
export class CreateClassroom {

  private fb = inject(FormBuilder);
  private router = inject(Router);
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

  createClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }
    const classroom: CreateClassroomRequest = {
      code: this.classroomForm.value.code!,
      building: this.classroomForm.value.building!,
      capacity: Number(this.classroomForm.value.capacity),
      floor: Number(this.classroomForm.value.floor),
      status: this.classroomForm.value.status!
    };
    this.classroomService.create(classroom).subscribe({
      next: () => {
        this.alertService.toast(
          'Salón registrado correctamente',
          'success'
        );
        this.router.navigateByUrl('/classrooms');
      },
      error: () => {
        this.alertService.toast('Error al crear el salón', 'error');
      }
    });
  }

}