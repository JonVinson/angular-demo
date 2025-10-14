import { Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-wait-message',
  imports: [MatProgressSpinner],
  templateUrl: './wait-message.component.html',
  styleUrl: './wait-message.component.scss'
})
export class WaitMessageComponent {
  defaultMessage = environment.WAIT_MESSAGE_TEMPLATE;
  message = input<string>();
}
