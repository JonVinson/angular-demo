import {ChangeDetectionStrategy, Component, Inject, inject, model, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Manufacturer, Transaction } from '../inventory-objects';
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
import { ListItem, SelectorComponent } from "../selector/selector.component";
import { map, Observable } from 'rxjs';
import { Department } from '../inventory-objects';
import { TextFilterComponent } from "../text-filter/text-filter.component";
import { WaitMessageComponent } from "../wait-message/wait-message.component";
/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'transaction-table',
  styleUrl: 'transaction-table.component.scss',
  templateUrl: 'transaction-table.component.html',
  imports: [MatTableModule, MatButtonModule, SelectorComponent, MatFormFieldModule, TextFilterComponent, WaitMessageComponent],
  encapsulation: ViewEncapsulation.None
})
export class TransactionTableComponent implements OnInit {
  displayedColumns: string[] = ['departmentCode', 'manufacturerCode', 'modelNumber', 'description', 'price', 'actions'];
  service = inject(DataService);
  dataSource = new TableDs<Transaction>(() => this.service.getTransactions(this.departmentId, this.manufacturerId, this.description)); // ELEMENT_DATA;
  
  departments: ListItem[] = [];
  manufacturers: ListItem[] = [];

  departmentId : number = 0;
  manufacturerId : number = 0;
  description : string = "";

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getDepartments();
    this.getManufacturers();
    this.refresh();
  }

  refresh(): void {
    this.dataSource.refresh();
  }
  
  addTransaction() : void {
    let dialogRef = this.dialog.open(AddTransactionDialog, { 
      data: {
        title: 'New Transaction',
        transaction: new Transaction,
        departments: this.departments, 
        manufacturers: this.manufacturers
      } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.addTransaction(data.transaction).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }
  
  editTransaction(transaction: Transaction) : void {
    let dialogRef = this.dialog.open(AddTransactionDialog, { 
      data: { 
        title: 'Edit Transaction',
        transaction: structuredClone(transaction),
        departments: this.departments, 
        manufacturers: this.manufacturers
      } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Updating " + data);
        this.service.updateTransaction(data.transaction).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Update canceled");
      }
    });
  }

  deleteTransaction(id: number) : void {
    this.dialog.open(DeleteTransactionDialog, {
      data:  { id: id }
    }).afterClosed().subscribe((yes: Boolean) => {
      if (yes) {
        console.log("Deleting " + id);
        this.service.deleteTransaction(id).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Delete canceled");
      }
    });
  }

  public getDepartments() : void {
    this.service.getDepartments().subscribe((list : Department[]) => this.departments = list.map((item) => new ListItem(item.id, item.name)));
  }

  public getManufacturers() : void {
    this.service.getManufacturers().subscribe((list : Manufacturer[]) => this.manufacturers = list.map((item) => new ListItem(item.id, item.name)));
  }
}

@Component({
  selector: 'delete-transaction-dialog',
  templateUrl: 'delete-transaction-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteTransactionDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteTransactionDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}) { }
}

@Component({
  selector: 'add-transaction-dialog',
  templateUrl: 'add-transaction-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, SelectorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionDialog {
  readonly dialogRef = inject(MatDialogRef<AddTransactionDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    manufacturers: ListItem[]|undefined;
    departments: ListItem[]|undefined;
    transaction: Transaction;
    }) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}

