import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableTabsComponent } from "./table-tabs/table-tabs.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TableTabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mat-table-test';
}
