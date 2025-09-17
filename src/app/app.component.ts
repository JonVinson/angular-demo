import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableOneComponent } from "./table-one/table-one.component";
import { TableTwoComponent } from "./table-two/table-two.component";
import { TableTabsComponent } from "./table-tabs/table-tabs.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TableOneComponent, TableTwoComponent, TableTabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mat-table-test';
}
