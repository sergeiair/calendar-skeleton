
export interface DateState {
  year: number;
  month: number;
  date?: number;
}

export interface ActiveDateParams {
  daysInPrevMonth: number;
  daysInCurrMonth: number;
  currMonthStartDay: number;
  currMonthEndDay: number;
  visiblePrevMonthDays?: number;
  visibleNextMonthDays?: number;
}

export interface DayCell {
  year: number;
  month: number;
  date: number;
  type?: string;
}
