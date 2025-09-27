import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import { Company, Supplier } from '../inventory-objects';
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
import { WaitMessageComponent } from "../wait-message/wait-message.component";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-supplier-table',
  imports: [MatTableModule, MatButtonModule, WaitMessageComponent],
  templateUrl: './supplier-table.component.html',
  styleUrl: './supplier-table.component.scss'
})
export class SupplierTableComponent {
  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  service = inject(DataService);
  dataSource = new TableDs<Supplier>(this.service.getSuppliers); // ELEMENT_DATA;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource.refresh();
  }

  addSupplier() : void {
    let dialogRef = this.dialog.open(AddSupplierDialog, { 
      data: {
        title: 'New Supplier',
        supplier: new Company,
      } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.addSupplier(data.supplier).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }
  
  editSupplier(supplier: Supplier) : void {
    let dialogRef = this.dialog.open(AddSupplierDialog, { 
      data: { 
        title: 'Edit Supplier',
        supplier: structuredClone(supplier),
      } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Updating " + data);
        this.service.updateSupplier(data.supplier).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Update canceled");
      }
    });
  }

  deleteSupplier(id: number) : void {
    this.dialog.open(DeleteSupplierDialog, {
      data:  { id: id }
    }).afterClosed().subscribe((yes: Boolean) => {
      if (yes) {
        console.log("Deleting " + id);
        this.service.deleteSupplier(id).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Delete canceled");
      }
    });
  }
}

@Component({
  selector: 'delete-supplier-dialog',
  templateUrl: 'delete-supplier-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteSupplierDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteSupplierDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}) { }
}

@Component({
  selector: 'add-supplier-dialog',
  templateUrl: 'add-supplier-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSupplierDialog {
  readonly dialogRef = inject(MatDialogRef<AddSupplierDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, code: string, title: string}) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}


