import { CalendarSkeleton } from './calendar-skeleton.class';


describe('CalendarSkeletonClass', () => {
  const dt = new Date();
  const currentDate = dt.getDate();
  const currentYear = dt.getFullYear();
  const currentMonth = dt.getMonth();

  const instance = new CalendarSkeleton();

  beforeEach(() => {
    instance.setInitialCalendarState();
  });


  it('should check if current date is defined correctly', () => {
    expect(instance.activeDate.year).toEqual(currentYear);
    expect(instance.activeDate.month).toEqual(currentMonth);
  });

  it('should check if sequent dates are defined correctly', () => {
    if (currentMonth === 0) {

      expect(instance.prevMonthDate.year).toEqual(currentYear - 1);
      expect(instance.prevMonthDate.month).toEqual(11);

    } else if (currentMonth > 0 && currentMonth < 11) {

      expect(instance.prevMonthDate.year).toEqual(currentYear);
      expect(instance.prevMonthDate.month).toEqual(currentMonth - 1);

    } else if (currentMonth === 11) {

      expect(instance.prevMonthDate.year).toEqual(currentYear + 1);
      expect(instance.prevMonthDate.month).toEqual(0);

    }
  });

  it('should check if calendar cells data was build', () => {
    instance.dateState = {
      month: 9,
      year: 2016
    };

    const nineSixteen3DaysArray = [
      {
        'date': 26,
        'month': 8,
        'year': 2016,
        'type': 'past',
        'dcEpochTime': 1474848000000
      },
      {
        'date': 27,
        'month': 8,
        'year': 2016,
        'type': 'past',
        'dcEpochTime': 1474934400000
      },
      {
        'date': 28,
        'month': 8,
        'year': 2016,
        'type': 'past',
        'dcEpochTime': 1475020800000
      }
    ];

    expect(instance.calendarData[0].slice(0, 3)).toEqual(nineSixteen3DaysArray);
  });

});
