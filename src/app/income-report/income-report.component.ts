import {ChangeDetectionStrategy, Component, Inject, inject, model, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ReportItem } from '../inventory-objects';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableDs } from '../table-ds';
import { WaitMessageComponent } from "../wait-message/wait-message.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'income-report',
  styleUrl: 'income-report.component.scss',
  templateUrl: 'income-report.component.html',
  imports: [MatTableModule, MatButtonModule, MatFormFieldModule, WaitMessageComponent, MatDatepickerModule],
  encapsulation: ViewEncapsulation.None
})
export class IncomeReportComponent implements OnInit {
  displayedColumns: string[] = ['department', 'revenue', 'costs', 'net'];
  service = inject(DataService);
  dataSource = new TableDs<ReportItem>(() => this.service.getReport(this.startDate, this.endDate)); // ELEMENT_DATA;
  
  startDate? : Date;
  endDate? : Date;

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.dataSource.refresh();
  }
}

