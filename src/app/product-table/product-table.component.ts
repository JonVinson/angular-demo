import {ChangeDetectionStrategy, Component, Inject, inject, model, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Manufacturer, Product } from '../inventory-objects';
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
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'product-table',
  styleUrl: 'product-table.component.scss',
  templateUrl: 'product-table.component.html',
  imports: [MatTableModule, MatButtonModule, MatSortModule, SelectorComponent, MatFormFieldModule, TextFilterComponent, MatProgressSpinner],
  encapsulation: ViewEncapsulation.None
})
export class ProductTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();
  
  displayedColumns: string[] = ['departmentCode', 'manufacturerCode', 'modelNumber', 'description', 'price', 'actions'];
  service = inject(DataService);
  dataSource = new MatTableDataSource<Product>(); // ELEMENT_DATA;
  
  departments: ListItem[] = [];
  manufacturers: ListItem[] = [];

  departmentId : number = 0;
  manufacturerId : number = 0;
  description : string = "";
  ready : boolean = false;

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getDepartments();
    this.getManufacturers();
    this.refresh();
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.ready = true;
  }

  refresh(): void {
    this.service.getProducts(this.departmentId, this.manufacturerId, this.description).subscribe(data => {
      this.dataSource.data = data;
    });
  }
  
  addProduct() : void {
    let dialogRef = this.dialog.open(AddProductDialog, { 
      data: {
        title: 'New Product',
        product: new Product,
        departments: this.departments, 
        manufacturers: this.manufacturers
      } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Adding " + data);
        this.service.addProduct(data.product).subscribe(data => this.refresh());
      } else {
        console.log("Add canceled");
      }
    });
  }
  
  editProduct(product: Product) : void {
    let dialogRef = this.dialog.open(AddProductDialog, { 
      data: { 
        title: 'Edit Product',
        product: structuredClone(product),
        departments: this.departments, 
        manufacturers: this.manufacturers
      } }).afterClosed().subscribe(data => {
      if (data != "cancel") {
        console.log("Updating " + data);
        this.service.updateProduct(data.product).subscribe(data => this.refresh());
      } else {
        console.log("Update canceled");
      }
    });
  }

  deleteProduct(id: number) : void {
    this.dialog.open(DeleteProductDialog, {
      data:  { id: id }
    }).afterClosed().subscribe((yes: Boolean) => {
      if (yes) {
        console.log("Deleting " + id);
        this.service.deleteProduct(id).subscribe(data => this.refresh());
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
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatFormFieldModule, MatInputModule, SelectorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductDialog {
  readonly dialogRef = inject(MatDialogRef<AddProductDialog>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    manufacturers: ListItem[]|undefined;
    departments: ListItem[]|undefined;
    product: Product;
    }) { }
  closeDialog() : void {
    this.dialogRef.close(this.data);
  }
}

