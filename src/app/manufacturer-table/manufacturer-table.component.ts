import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import { Manufacturer } from '../inventory-objects';
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
  selector: 'app-manufacturer-table',
  imports: [MatTableModule, MatButtonModule, WaitMessageComponent],
  templateUrl: './manufacturer-table.component.html',
  styleUrl: './manufacturer-table.component.scss'
})
export class ManufacturerTableComponent {
  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  service = inject(DataService);
  dataSource = new TableDs<Manufacturer>(this.service.getManufacturers); // ELEMENT_DATA;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource.refresh();
  }

  addManufacturer() : void {
    let dialogRef = this.dialog.open(AddManufacturerDialog, { data: { name: '', code: '', title: 'Add Manufacturer'} }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.addManufacturer(data.name, data.code).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }
  
  editManufacturer(id: number, name: string, code: string) : void {
    let dialogRef = this.dialog.open(AddManufacturerDialog, { data: { name: name, code: code, title: 'Edit Manufacturer' } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.updateManufacturer(id, data.name, data.code).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }

  deleteManufacturer(id: number) : void {
    this.dialog.open(DeleteManufacturerDialog, {
      data:  { id: id }
    }).afterClosed().subscribe((yes: Boolean) => {
      if (yes) {
        console.log("Deleting " + id);
        this.service.deleteManufacturer(id).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Delete canceled");
      }
    });
  }
}

@Component({
  selector: 'delete-manufacturer-dialog',
  templateUrl: 'delete-manufacturer-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteManufacturerDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteManufacturerDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}) { }
}

@Component({
  selector: 'add-manufacturer-dialog',
  templateUrl: 'add-manufacturer-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddManufacturerDialog {
  readonly dialogRef = inject(MatDialogRef<AddManufacturerDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, code: string, title: string}) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}


