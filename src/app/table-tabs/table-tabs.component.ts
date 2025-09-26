import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTableComponent } from "../product-table/product-table.component";
import { DepartmentTableComponent } from "../department-table/department-table.component";

@Component({
  selector: 'app-table-tabs',
  imports: [MatTabsModule, ProductTableComponent, DepartmentTableComponent],
  templateUrl: './table-tabs.component.html',
  styleUrl: './table-tabs.component.scss'
})
export class TableTabsComponent {

}
