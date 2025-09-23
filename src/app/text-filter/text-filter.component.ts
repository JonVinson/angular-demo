import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-text-filter',
  imports: [MatInputModule, FormsModule],
  templateUrl: './text-filter.component.html',
  styleUrl: './text-filter.component.scss'
})
export class TextFilterComponent {
  label = input();
  text = model();
}
