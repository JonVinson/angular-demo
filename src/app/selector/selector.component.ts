import { Attribute, Component, input, model, OnInit } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOption, MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  imports: [MatFormFieldModule, MatSelect, MatOption]
})
export class SelectorComponent {
  label  = input<string>();
  source = input<ListItem[]>();
  selectedValue = model();
}

export class ListItem {
  public itemValue : any;
  public itemText : string = '';

  constructor(v : any, t : string) {
    this.itemText = t;
    this.itemValue = v;
  }
}
