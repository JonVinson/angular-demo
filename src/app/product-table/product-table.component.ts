import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { HttpClient } from '@angular/common/http';
import {ChangeDetectionStrategy, Component, Inject, inject, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './Product';
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
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'product-table',
  styleUrl: 'product-table.component.scss',
  templateUrl: 'product-table.component.html',
  imports: [MatTableModule, MatButtonModule],
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  service = inject(DataService);
  dataSource = new TableDs<Product>(this.service.getProducts); // ELEMENT_DATA;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.dataSource.refresh();
  }
  
  addProduct() : void {
    let dialogRef = this.dialog.open(AddProductDialog, { data: { name: '', code: ''} }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.addProduct(data.name, data.code).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }
  
  editProduct(id: number, name: string, code: string) : void {
    let dialogRef = this.dialog.open(EditProductDialog, { data: { name: name, code: code} }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.updateProduct(id, data.name, data.code).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }

  deleteProduct(id: number) : void {
    this.dialog.open(DeleteProductDialog, {
      data:  { id: id }
    }).afterClosed().subscribe((yes: Boolean) => {
      if (yes) {
        console.log("Deleting " + id);
        this.service.deleteProduct(id).subscribe(data => this.dataSource.refresh());
      } else {
        console.log("Delete canceled");
      }
    });
  }
}

export class TableDs<T> implements DataSource<T> {
  private subject = new BehaviorSubject<T[]>([]);
  private http: HttpClient = inject(HttpClient);
  private refreshMethod: () => Observable<T[]>;

  constructor (refreshMethod: () => Observable<T[]>) {
    this.refreshMethod = refreshMethod;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
  }

  refresh() : void {
    this.refreshMethod().subscribe(data => {
      this.subject.next(data);
    });
  }
}

@Component({
  selector: 'delete-product-dialog',
  templateUrl: 'delete-product-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteProductDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}) { }
}

@Component({
  selector: 'add-product-dialog',
  templateUrl: 'add-product-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductDialog {
  readonly dialogRef = inject(MatDialogRef<AddProductDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, code: string}) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'edit-product-dialog',
  templateUrl: 'edit-product-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductDialog {
  readonly dialogRef = inject(MatDialogRef<AddProductDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, code: string}) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}
