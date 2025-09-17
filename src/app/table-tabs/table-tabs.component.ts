import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTab } from '@angular/material/tabs';
import { TableTwoComponent } from "../table-two/table-two.component";

@Component({
  selector: 'app-table-tabs',
  imports: [MatTabsModule, TableTwoComponent],
  templateUrl: './table-tabs.component.html',
  styleUrl: './table-tabs.component.scss'
})
export class TableTabsComponent {

}
