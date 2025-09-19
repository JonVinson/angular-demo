import { Attribute, Component, input, OnInit } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOption, MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  imports: [MatFormFieldModule, MatSelect, MatOption]
})
export class SelectorComponent implements OnInit {
  label  = input<string>();
  
  private source : () => Observable<{ itemValue : any, itemText : string }[]>;
  list : { itemValue: any, itemText: string }[] = [];

  constructor(@Attribute('source') public sourceMethod :  () => Observable<{ itemValue : any, itemText : string }[]> ) {
    this.source = sourceMethod;
  }

  ngOnInit(): void {
    this.source().subscribe((data) => { this.list = data; });
  }
}
