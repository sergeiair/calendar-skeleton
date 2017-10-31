import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDatePickerComponent } from './example-date-picker.component';

describe('ExampleDatePickerComponent', () => {
  let component: ExampleDatePickerComponent;
  let fixture: ComponentFixture<ExampleDatePickerComponent>;
  let element = null;

  const currentDate = new Date();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExampleDatePickerComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleDatePickerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should check that today is marked', () => {
    expect(element.querySelector('.d-picker__week__cell--today').innerText)
      .toEqual(currentDate.getDate().toString());
  });
});
