import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { ReservationForm } from './models/Customer';
import ReservationsScreen from './screens/ReservationsScreen/reservations';

import ReservationService from './services/apis/Reservations';
import moment from 'moment';
import { FormUtils, DateTimeFormat } from './services/FormUtils';

const createProps = (props: any = {}) => {
  return {
    navigation: {
      addListener: jest.fn().mockImplementation(),
    },
    ...props,
  };
};

function loadComponent(props: any, disableLifecycleMethods = true): ShallowWrapper<any, any, ReservationsScreen> {
  return shallow(<ReservationsScreen {...props} />, { disableLifecycleMethods });
}

describe('ReservationsScreen', () => {
  let wrapper: ShallowWrapper<any, any, ReservationsScreen>;

  beforeEach(() => {
    wrapper = loadComponent(createProps());
  });

  it('Expect at least 1 ToastContainer component is called when pressing a submit button', () => {
    const instance = wrapper.instance();
    instance.setState({ firstName: 'Waint', lastName: 'Klinkasen', phone: '023232121', arrivalDate: moment(), arrivalTime: moment(), departureTime: moment().add(30, 'minutes'), total: 10 });
    instance._onSubmit();
    expect(wrapper.find('ToastContainer').length).toBe(1)
  });
});

describe('ReservationService', () => {
  describe('GetReservationByDate', () => {
    it('should return the error when input us null', () => {
      expect.assertions(1);
      return expect(ReservationService.getReservationsByDate(null)).rejects.toThrowError();
    })

    it('should return the error when input us undefinde', () => {
      expect.assertions(1);
      return expect(ReservationService.getReservationsByDate(undefined)).rejects.toThrowError();
    })

    it('should return the error when date forrmat is not correct', () => {
      expect.assertions(1);
      return expect(ReservationService.getReservationsByDate('20/12/2020')).rejects.toThrowError();
    })

    it('should return an object when input format is correct', () => {
      return expect(ReservationService.getReservationsByDate('2020-03-30').then(data => typeof data)).resolves.toBe("object");
    })
  });

  describe('SaveReservationByDate', () => {
    it('should return true when all fields are correct', () => {
      const now = moment();
      const formBody: ReservationForm = {
        firstName: 'Waint',
        lastName: 'Waint',
        arrivalDate: now.format(DateTimeFormat.date),
        arrivalTime: now.format(DateTimeFormat.time),
        departureTime: now.add(1, 'minute').format(DateTimeFormat.time),
        total: 2,
        phone: '029823321',
      }
      return expect(ReservationService.saveReservations(formBody)).resolves.toBeTruthy();
    });

    it('should return the error when Arrival Date format is not correct', () => {
      const formBody: ReservationForm = {
        firstName: 'Waint',
        lastName: 'Waint',
        arrivalDate: '30/03/2020',
        arrivalTime: '7:12 PM',
        departureTime: '8:12 PM',
        total: 2,
        phone: '029823321',
      }
      expect.assertions(1);
      return expect(ReservationService.saveReservations(formBody)).rejects.toThrowError();
    });

    it('should return the error when Departure Time is less than Arrival Time', () => {
      const formBody: ReservationForm = {
        firstName: 'Waint',
        lastName: 'Waint',
        arrivalDate: '30/03/2020',
        arrivalTime: '7:12 PM',
        departureTime: '5:12 PM',
        total: 2,
        phone: '029823321',
      }
      expect.assertions(1);
      return expect(ReservationService.saveReservations(formBody)).rejects.toThrowError();
    });
  })

  it('should return the error when duration between Arrival Time and Departure Time is 0', () => {
    const formBody: ReservationForm = {
      firstName: 'Waint',
      lastName: 'Waint',
      arrivalDate: '30/03/2020',
      arrivalTime: '7:12 PM',
      departureTime: '7:12 PM',
      total: 2,
      phone: '029823321',
    }
    expect.assertions(1);
    return expect(ReservationService.saveReservations(formBody)).rejects.toThrowError();
  });
})

it('should return the error when Arrival Date is the past dates', () => {
  const now = moment();
  const formBody: ReservationForm = {
    firstName: 'Waint',
    lastName: 'Waint',
    arrivalDate: now.subtract(1, 'day').format(DateTimeFormat.date),
    arrivalTime: '7:12 PM',
    departureTime: '7:12 PM',
    total: 2,
    phone: '029823321',
  }
  expect.assertions(1);
  return expect(ReservationService.saveReservations(formBody)).rejects.toThrowError();
});

describe('FormUtilsService', () => {
  describe('ValidateNecessaryFields', () => {
    it('should return the false when phone does not begin with Zero(0) digit', () => {
      const phone = '203222422'
      return expect(FormUtils.validatePhone(phone)).toBeFalsy();
    })

    it('should return the true when phone is 029232124 (9 digits)', () => {
      const phone = '029232124'
      return expect(FormUtils.validatePhone(phone)).toBeTruthy();
    })

    it('should return false when the amount of people for reservations is 0', () => {
      const total = 0;
      return expect(FormUtils.validateNumber(total)).toBeFalsy();
    })

    it('should return false when the amount of people for reservations is -1', () => {
      const total = -1;
      return expect(FormUtils.validateNumber(total)).toBeFalsy();
    })

    it('should return true when the amount of people for reservations is more than 0', () => {
      const total = 1;
      return expect(FormUtils.validateNumber(total)).toBeTruthy();
    });

    describe('CalculateTables', () => {
      it('should return 10 tables', () => {
        const data = [
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T02:00:00.000Z', departureTime: '2020-03-30T05:00:00.000Z', total: 8, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:00:00.000Z', departureTime: '2020-03-30T03:30:00.000Z', total: 2, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:15:00.000Z', departureTime: '2020-03-30T08:30:00.000Z', total: 1, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T04:15:00.000Z', departureTime: '2020-03-30T04:30:00.000Z', total: 3, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T07:00:00.000Z', departureTime: '2020-03-30T08:20:00.000Z', total: 1, arrivalDate: '', phone: '' },
        ];
        const expectValue = 4;
        const unit = 4;
        return expect(FormUtils.calculateTables(data, unit)).toBe(expectValue);
      })

      it('should return 5 tables', () => {
        const data = [
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T02:00:00.000Z', departureTime: '2020-03-30T05:00:00.000Z', total: 8, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:00:00.000Z', departureTime: '2020-03-30T03:30:00.000Z', total: 2, arrivalDate: '', phone: '' },
          { firstName: 'WaintWaint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:15:00.000Z', departureTime: '2020-03-30T08:30:00.000Z', total: 1, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T04:15:00.000Z', departureTime: '2020-03-30T04:30:00.000Z', total: 3, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T07:00:00.000Z', departureTime: '2020-03-30T08:20:00.000Z', total: 1, arrivalDate: '', phone: '' },
        ];
        const expectValue = 5;
        const unit = 4;
        return expect(FormUtils.calculateTables(data, unit)).toBe(expectValue);
      })

      it('should return 21 tables', () => {
        const data = [
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T02:00:00.000Z', departureTime: '2020-03-30T05:00:00.000Z', total: 34, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:00:00.000Z', departureTime: '2020-03-30T03:30:00.000Z', total: 14, arrivalDate: '', phone: '' },
          { firstName: 'WaintWaint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:15:00.000Z', departureTime: '2020-03-30T08:30:00.000Z', total: 27, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T04:15:00.000Z', departureTime: '2020-03-30T04:30:00.000Z', total: 5, arrivalDate: '', phone: '' },
          { firstName: 'WaintWaint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T07:00:00.000Z', departureTime: '2020-03-30T08:20:00.000Z', total: 6, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T08:30:00.000Z', departureTime: '2020-03-30T08:31:00.000Z', total: 100, arrivalDate: '', phone: '' },
        ];
        const expectValue = 21;
        const unit = 4;
        return expect(FormUtils.calculateTables(data, unit)).toBe(expectValue);
      });

      it('should return 18 tables', () => {
        const data = [
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T02:00:00.000Z', departureTime: '2020-03-30T05:00:00.000Z', total: 36, arrivalDate: '', phone: '' },
          { firstName: 'WaintWaint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:00:00.000Z', departureTime: '2020-03-30T07:30:00.000Z', total: 14, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T02:15:00.000Z', departureTime: '2020-03-30T05:00:00.000Z', total: 5, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T04:59:00.000Z', departureTime: '2020-03-30T08:30:00.000Z', total: 13, arrivalDate: '', phone: '' },
        ];
        const expectValue = 18;
        const unit = 4;
        return expect(FormUtils.calculateTables(data, unit)).toBe(expectValue);
      });

      it('should return 17 tables', () => {
        const data = [
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T04:59:00.000Z', departureTime: '2020-03-30T08:30:00.000Z', total: 13, arrivalDate: '', phone: '' },
          { firstName: 'WaintWaint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T07:00:00.000Z', departureTime: '2020-03-30T10:00:00.000Z', total: 36, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T08:00:00.000Z', departureTime: '2020-03-30T12:30:00.000Z', total: 14, arrivalDate: '', phone: '' },
          { firstName: 'WaintWaint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T02:00:00.000Z', departureTime: '2020-03-30T05:00:00.000Z', total: 36, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:00:00.000Z', departureTime: '2020-03-30T07:30:00.000Z', total: 14, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:15:00.000Z', departureTime: '2020-03-30T06:00:00.000Z', total: 5, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T08:15:00.000Z', departureTime: '2020-03-30T11:00:00.000Z', total: 5, arrivalDate: '', phone: '' },
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T09:59:00.000Z', departureTime: '2020-03-30T13:30:00.000Z', total: 18, arrivalDate: '', phone: '' },
        ];
        const expectValue = 17;
        const unit = 4;
        return expect(FormUtils.calculateTables(data, unit)).toBe(expectValue);
      });

      it('should return 0 table', () => {
        const data = [] as ReservationForm[];
        const expectValue = 0;
        const unit = 4;
        return expect(FormUtils.calculateTables(data, unit)).toBe(expectValue);
      });

      it('should return 4 table', () => {
        const data = [
          { firstName: 'Waint', lastName: 'Klinkasen', arrivalTime: '2020-03-30T03:00:00.000Z', departureTime: '2020-03-30T07:30:00.000Z', total: 14, arrivalDate: '', phone: '' },
        ];
        const expectValue = 4;
        const unit = 4;
        return expect(FormUtils.calculateTables(data, unit)).toBe(expectValue);
      });
    });
  });
});