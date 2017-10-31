import { compose, range, values } from 'ramda';

import { DateState, ActiveDateParams, DayCell } from './calendar-skeleton.models';

export class CalendarSkeleton {

  public daysLabels =  ['Mo', 'Tu', 'We', 'Th', 'Fr', 'St', 'Su'];

  public monthLabels = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December',
  ];

  private _activeDate: DateState;
  private _currentDate: DateState;
  private _calendarData: DayCell[][];
  private _todaysEpochTime: number;

  private buildCalendarData = compose(
    this.prepareSeparatedDaysArray,
    this.defineCellTypeModifiers,
    this.decorateDaysData,
    this.defineVisibleDaysData,
    this.extendDateParams,
    this.defineDateParams
  );

  constructor(private readonly dateInstance = new Date()) {
    this._currentDate = {
      year: dateInstance.getFullYear(),
      month: dateInstance.getMonth(),
      date: dateInstance.getDate(),
    };

    this._todaysEpochTime = Date.UTC(
      dateInstance.getFullYear(),
      dateInstance.getMonth(),
      dateInstance.getDate()
    );

    this.setInitialCalendarState();
  }

  private get currentDate(): DateState {
    return this._currentDate;
  }

  private get todaysEpochTime(): number {
    return this._todaysEpochTime;
  }

  private get leftSequentYear(): number {
    return this.activeDate.month === 0
      ? this.activeDate.year - 1 : this.activeDate.year;
  }

  private get leftSequentMonth(): number {
    return this.activeDate.month === 0
      ? 11 : this.activeDate.month - 1;
  }

  private get rightSequentYear(): number {
    return this.activeDate.month === 11
      ? this.activeDate.year + 1 : this.activeDate.year;
  }

  private get rightSequentMonth(): number {
    return this.activeDate.month === 11
      ? 0 : this.activeDate.month + 1;
  }

  private defineDateParams(year, month): ActiveDateParams {
    return {
      daysInPrevMonth: new Date(year, month, 0).getDate(),
      daysInCurrMonth: new Date(year, month + 1, 0).getDate(),
      currMonthStartDay: new Date(year, month, 1).getDay(),
      currMonthEndDay: new Date(year, month + 1, 0).getDay(),
    };
  }

  private extendDateParams(prm: ActiveDateParams): ActiveDateParams {
    return Object.assign({}, prm, {
      visiblePrevMonthDays: prm.currMonthStartDay > 0 ? prm.currMonthStartDay - 1 : 6,
      visibleNextMonthDays: 7 - prm.currMonthEndDay,
    });
  }

  private defineVisibleDaysData(prm: ActiveDateParams) {
    return {
      prevMonth: range(prm.daysInPrevMonth - prm.visiblePrevMonthDays + 1, prm.daysInPrevMonth + 1),
      currentMonth: range(1, prm.daysInCurrMonth + 1),
      nextMonth: range(1, prm.visibleNextMonthDays + 1),
    };
  }

  private decorateDaysData(visibleDaysSet): any[] {
    return [
      ...visibleDaysSet.prevMonth.map(date => this.getLeftNeighborDate(date)),
      ...visibleDaysSet.currentMonth.map(date => Object.assign({}, this.activeDate, {date})),
      ...visibleDaysSet.nextMonth.map(date => this.getRightNeighborDate(date)),
    ];
  }

  private prepareSeparatedDaysArray(plainArray): DayCell[][] {
    return plainArray.reduce((acc, curr, index, array) => {
      if (index % 7 === 0) {
        acc.push(array.slice(index, index + 7));
      }

      return acc;
    }, []);
  }

  private getLeftNeighborDate(date: number): DateState {
    return {
      date,
      month: this.leftSequentMonth,
      year: this.leftSequentYear,
    };
  }

  private getRightNeighborDate(date: number): DateState {
    return {
      date,
      month: this.rightSequentMonth,
      year: this.rightSequentYear,
    };
  }

  private defineCellParams(timeData: any): {} {
    return {
      type: timeData.timeDiff > 0 ? 'future' : timeData.timeDiff === 0 ? 'today' : 'past',
      dcEpochTime: timeData.dcEpochTime,
    };
  }

  private getTimeData(dc: DayCell, todaysEpochTime: number): {} {
    const dcEpochTime = Date.UTC(dc.year, dc.month, dc.date);
    const timeDiff = dcEpochTime - todaysEpochTime;

    return { timeDiff, dcEpochTime };
  }

  private defineCellTypeModifiers(dcArray: DayCell[]): DayCell[] {
    return dcArray.map(dc => Object.assign({}, dc, compose(
      this.defineCellParams,
      this.getTimeData,
    ).call(this, dc, this.todaysEpochTime)));
  }

  public get nextMonthDate(): DateState {
    return {
      month: this.rightSequentMonth,
      year: this.rightSequentYear,
    };
  }

  public get prevMonthDate(): DateState {
    return {
      month: this.leftSequentMonth,
      year: this.leftSequentYear,
    };
  }

  public setInitialCalendarState(dateState: DateState = null): void {
    this.dateState = dateState
      ? {
        year: dateState.year,
        month: dateState.month,
      } : {
        year: this.currentDate.year,
        month: this.currentDate.month,
      };
  }

  public set dateState(value: DateState) {
    this._activeDate = value;

    this._calendarData = this.buildCalendarData(value.year, value.month);
  }

  public get calendarData(): DayCell[][] {
    return this._calendarData;
  }

  public get activeMonthLabel(): string {
    return this.monthLabels[this.activeDate.month];
  }

  public get activeDate(): DateState {
    return this._activeDate;
  }

  public switchNextMonth(): void {
    this.dateState = this.nextMonthDate;
  }

  public switchPrevMonth(): void  {
    this.dateState = this.prevMonthDate;
  }
}
