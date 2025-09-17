import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTab } from '@angular/material/tabs';
import { TableTwoComponent } from "../table-two/table-two.component";
import { ProductTableComponent } from "../product-table/product-table.component";

@Component({
  selector: 'app-table-tabs',
  imports: [MatTabsModule, TableTwoComponent, ProductTableComponent],
  templateUrl: './table-tabs.component.html',
  styleUrl: './table-tabs.component.scss'
})
export class TableTabsComponent {

}
