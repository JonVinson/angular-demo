import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department } from '../inventory-objects';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableDs } from '../table-ds';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-two',
  styleUrl: 'table-two.component.scss',
  templateUrl: 'table-two.component.html',
  imports: [MatTableModule, MatButtonModule, MatProgressSpinner],
})
export class TableTwoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  service = inject(DataService);
  dataSource = new TableDs<Department>(this.service.getDepartments); // ELEMENT_DATA;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource.refresh();
  }

  addDepartment() : void {
    let dialogRef = this.dialog.open(AddDepartmentDialog, { data: { name: '', code: ''} }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.addDepartment(data.name, data.code).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }
  
  editDepartment(id: number, name: string, code: string) : void {
    let dialogRef = this.dialog.open(EditDepartmentDialog, { data: { name: name, code: code} }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.updateDepartment(id, data.name, data.code).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }

  deleteDepartment(id: number) : void {
    this.dialog.open(DeleteDepartmentDialog, {
      data:  { id: id }
    }).afterClosed().subscribe((yes: Boolean) => {
      if (yes) {
        console.log("Deleting " + id);
        this.service.deleteDepartment(id).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Delete canceled");
      }
    });
  }
}

@Component({
  selector: 'delete-department-dialog',
  templateUrl: 'delete-department-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDepartmentDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteDepartmentDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}) { }
}

@Component({
  selector: 'add-department-dialog',
  templateUrl: 'add-department-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDepartmentDialog {
  readonly dialogRef = inject(MatDialogRef<AddDepartmentDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, code: string}) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'edit-department-dialog',
  templateUrl: 'edit-department-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDepartmentDialog {
  readonly dialogRef = inject(MatDialogRef<AddDepartmentDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, code: string}) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}
