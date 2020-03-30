import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { ReservationForm } from './models/Customer';
import ReservationsScreen from './screens/ReservationsScreen/reservations';
import { FormUtils } from './services/apis/FormUtils';
import ReservationService from './services/apis/Reservations';
import moment from 'moment';

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

  it('Phone number validation should be false when phone is 0', () => {
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
    it('should return true when input all fields', () => {
      const formBody: ReservationForm = {
        firstName: 'Waint',
        lastName: 'Waint',
        arrivalDate: '2020-03-30',
        arrivalTime: '7:12 PM',
        departureTime: '8:12 PM',
        total: 2,
        phone: '029823321',
      }
      return expect(ReservationService.saveReservations(formBody)).resolves.toBeTruthy();
    })

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
  const formBody: ReservationForm = {
    firstName: 'Waint',
    lastName: 'Waint',
    arrivalDate: '1970-01-01',
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
    })

  })
});