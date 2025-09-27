import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import { Company, Customer } from '../inventory-objects';
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
  selector: 'app-customer-table',
  imports: [MatTableModule, MatButtonModule, WaitMessageComponent],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss'
})
export class CustomerTableComponent {
  displayedColumns: string[] = ['name', 'code', 'street', 'city', 'state', 'postalCode', 'contactName', 'contactEmail', 'phoneNumber', 'actions'];
  service = inject(DataService);
  dataSource = new TableDs<Customer>(this.service.getCustomers); // ELEMENT_DATA;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource.refresh();
  }

  addCustomer() : void {
    let dialogRef = this.dialog.open(AddCustomerDialog, { 
      data: {
        title: 'New Customer',
        customer: new Company,
      } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.addCustomer(data.customer).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }
  
  editCustomer(customer: Customer) : void {
    let dialogRef = this.dialog.open(AddCustomerDialog, { 
      data: { 
        title: 'Edit Customer',
        customer: structuredClone(customer),
      } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Updating " + data);
        this.service.updateCustomer(data.customer).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Update canceled");
      }
    });
  }

  deleteCustomer(id: number) : void {
    this.dialog.open(DeleteCustomerDialog, {
      data:  { id: id }
    }).afterClosed().subscribe((yes: Boolean) => {
      if (yes) {
        console.log("Deleting " + id);
        this.service.deleteCustomer(id).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Delete canceled");
      }
    });
  }
}

@Component({
  selector: 'delete-customer-dialog',
  templateUrl: 'delete-customer-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCustomerDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteCustomerDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}) { }
}

@Component({
  selector: 'add-customer-dialog',
  templateUrl: 'add-customer-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerDialog {
  readonly dialogRef = inject(MatDialogRef<AddCustomerDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, customer: Customer}) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}


