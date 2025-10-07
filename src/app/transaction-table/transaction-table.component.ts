import {ChangeDetectionStrategy, Component, Inject, inject, model, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Transaction } from '../inventory-objects';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { TableDs } from '../table-ds';
import { ListItem, SelectorComponent } from "../selector/selector.component";
import { map, Observable } from 'rxjs';
import { Department } from '../inventory-objects';
import { TextFilterComponent } from "../text-filter/text-filter.component";
import { WaitMessageComponent } from "../wait-message/wait-message.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from '@angular/material/core';
import { AccountingPipe } from '../accounting.pipe';
import { DatePipe } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling'

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'transaction-table',
  styleUrl: 'transaction-table.component.scss',
  templateUrl: 'transaction-table.component.html',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatButtonModule, SelectorComponent, MatFormFieldModule, TextFilterComponent,
    WaitMessageComponent, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatInputModule, AccountingPipe, DatePipe, ScrollingModule],
  encapsulation: ViewEncapsulation.None
})
export class TransactionTableComponent implements OnInit {
  displayedColumns: string[] = ['date','type','product','company','quantity','price','total'];
  service = inject(DataService);
  dataSource = new TableDs<Transaction>(() => this.service.getTransactions(this.startDate, this.endDate, this.transactionType, this.product, this.company)); // ELEMENT_DATA;
  
  startDate : Date = new Date(2010, 0, 1);
  endDate : Date = new Date();
  transactionType : number = 0;
  product : string = "";
  company : string = "";
  
  transTypes : ListItem[] = [
      { itemValue : 0, itemText: 'All' },
      { itemValue : 1, itemText: 'Purchase' },
      { itemValue : 2, itemText: 'Sale' },
      { itemValue : 3, itemText: 'Return Purchase' },
      { itemValue : 4, itemText: 'Return Sale' },
    ];

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
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
    transaction: Transaction;
    }) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}

