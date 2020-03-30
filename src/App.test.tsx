import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import ReservationsScreen from './screens/ReservationsScreen/reservations';
import ReservationService from './services/apis/Reservations';
import { FormUtils } from './services/apis/FormUtils';

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
  })
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