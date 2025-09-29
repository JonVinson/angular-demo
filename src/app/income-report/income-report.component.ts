import {ChangeDetectionStrategy, Component, Inject, inject, model, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ReportItem } from '../inventory-objects';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { TableDs } from '../table-ds';
import { WaitMessageComponent } from "../wait-message/wait-message.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { AccountingPipe } from "../accounting.pipe";
/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'income-report',
  styleUrl: 'income-report.component.scss',
  templateUrl: 'income-report.component.html',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatButtonModule, MatFormFieldModule, WaitMessageComponent, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatInputModule,
    AccountingPipe]
})
export class IncomeReportComponent implements OnInit {
  displayedColumns: string[] = ['department', 'revenue', 'cost', 'net'];
  service = inject(DataService);
  dataSource = new TableDs<ReportItem>(() => this.service.getReport(this.startDate, this.endDate)); // ELEMENT_DATA;
  
  endDate? : Date = new Date();
  startDate? : Date = new Date(2021, 0, 1);
  
  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.dataSource.refresh();
  }
}

