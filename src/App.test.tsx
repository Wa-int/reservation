import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import ReservationsScreen from './screens/ReservationsScreen/reservations';
import ReservationService from './services/apis/Reservations';

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
    instance.setState({ phone: '0' });
    expect(instance.validatePhone()).toBeFalsy();
  });

});

describe('ReReservationServiceser', () => {
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
