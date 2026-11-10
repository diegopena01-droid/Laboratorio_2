export interface TableProfessorsEvents {
    id: number;
    action: TableProfessorsActions;
}

export type TableProfessorsActions = 'detail' | 'edit' | 'delete';