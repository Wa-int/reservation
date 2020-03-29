import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import ReservationsScreen from './screens/ReservationsScreen/reservations';

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
