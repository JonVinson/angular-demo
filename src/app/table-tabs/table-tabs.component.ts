import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTableComponent } from "../product-table/product-table.component";
import { DepartmentTableComponent } from "../department-table/department-table.component";
import { ManufacturerTableComponent } from "../manufacturer-table/manufacturer-table.component";
import { SupplierTableComponent } from "../supplier-table/supplier-table.component";
import { CustomerTableComponent } from "../customer-table/customer-table.component";
import { IncomeReportComponent } from "../income-report/income-report.component";
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';

@Component({
  selector: 'app-table-tabs',
  imports: [MatTabsModule, ProductTableComponent, DepartmentTableComponent, ManufacturerTableComponent, SupplierTableComponent,
    CustomerTableComponent, IncomeReportComponent, TransactionTableComponent],
  templateUrl: './table-tabs.component.html',
  styleUrl: './table-tabs.component.scss'
})
export class TableTabsComponent {

}
