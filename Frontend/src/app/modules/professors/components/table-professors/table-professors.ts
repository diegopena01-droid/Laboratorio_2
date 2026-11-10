import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Professor } from '../../interfaces/professor';
import { TableProfessorsActions, TableProfessorsEvents } from '../../interfaces/table-professors';

@Component({
  selector: 'app-table-professors',
  imports: [Button],
  templateUrl: './table-professors.html',
})
export class TableProfessors {

  @Input() professors: Professor[] = [];
  @Output() onClickActions = new EventEmitter<TableProfessorsEvents>();

  configDetailButton: ButtonConfig = {
    id: 'detail',
    type: 'primary',
    icon: 'eye',
    outline: true,
    size: 'sm'
  }

  configEditButton: ButtonConfig = {
    id: 'update',
    type: 'warning',
    icon: 'pencil-square',
    outline: true,
    size: 'sm'
  }

  configDeleteButton: ButtonConfig = {
    id: 'delete',
    type: 'danger',
    icon: 'trash',
    outline: true,
    size: 'sm'
  }

  click(id: number, action: TableProfessorsActions){
    this.onClickActions.emit({id, action});
  }

}