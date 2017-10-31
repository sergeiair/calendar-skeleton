import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CalendarSkeleton } from '../calendar-skeleton.class';

@Component({
  selector: 'example-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './example-date-picker.component.html',
  styleUrls: ['./example-date-picker.component.scss'],
})
export class ExampleDatePickerComponent extends CalendarSkeleton {
  constructor() {
    super();
  }
}
