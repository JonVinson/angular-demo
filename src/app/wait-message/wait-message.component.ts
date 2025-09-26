import { Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-wait-message',
  imports: [MatProgressSpinner],
  templateUrl: './wait-message.component.html',
  styleUrl: './wait-message.component.scss'
})
export class WaitMessageComponent {
  message = input<string>();
}
