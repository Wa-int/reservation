import { shallow, ShallowWrapper } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { toast } from 'react-toastify';
import ReservationsScreen from './screens/ReservationsScreen/reservations';
import ReservationService from './services/apis/Reservations';


jest.mock('./services/apis/Reservations');
jest.setTimeout(3000);


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
    jest.clearAllMocks();
    wrapper = loadComponent(createProps());
  });

  afterAll(() => {
    jest.unmock('./services/apis/Reservations');
  });

  it('Expect at least 1 ToastContainer component is called when pressing a submit button', () => {
    const instance = wrapper.instance();
    instance.setState({ firstName: 'Waint', lastName: 'Klinkasen', phone: '023232121', arrivalDate: moment(), arrivalTime: moment(), departureTime: moment().add(30, 'minutes'), total: 10 });
    ReservationService.saveReservations = jest.fn().mockImplementation(() => Promise.resolve(true));
    instance._onSubmit();
    expect(wrapper.find('ToastContainer').length).toBe(1);
  });

  it('Expect at least 1 ToastContainer component is called when pressing a submit button', async () => {
    const toastSpy = spyOn(toast, 'success');
    const instance = wrapper.instance();
    instance.setState({ firstName: 'Waint', lastName: 'Klinkasen', phone: '023232121', arrivalDate: moment(), arrivalTime: moment(), departureTime: moment().add(30, 'minutes'), total: 10 });
    ReservationService.saveReservations = jest.fn().mockResolvedValue(true);

    await instance._onSubmit();
    await ReservationService.saveReservations
    expect(toastSpy).toHaveBeenCalledWith("Your reservations is successful.", {
      "position": toast.POSITION.TOP_CENTER,
      "autoClose": 3000,
    });
  });

  it('Expect at least 1 ToastContainer component is called when pressing a submit button', async () => {
    const toastSpy = spyOn(toast, 'error');
    const instance = wrapper.instance();
    instance.setState({ firstName: 'Waint', lastName: 'Klinkasen', phone: '023232121', arrivalDate: moment(), arrivalTime: moment(), departureTime: moment().add(30, 'minutes'), total: 10 });
    ReservationService.saveReservations = jest.fn().mockRejectedValue(new Error('Async error'));


    await instance._onSubmit();
    await ReservationService.saveReservations;
    expect(toastSpy).toBeCalledTimes(1);
    expect(toastSpy).toHaveBeenCalledWith('Async error', {
      "position": toast.POSITION.TOP_CENTER,
      "autoClose": 3000,
    });
  });

  it('Expect at least 1 ToastContainer component is called when pressing a submit button', async () => {
    const toastSpy = spyOn(toast, 'warn');
    const instance = wrapper.instance();
    instance.setState({ firstName: '', lastName: 'Klinkasen', phone: '023232121', arrivalDate: moment(), arrivalTime: moment(), departureTime: moment().add(30, 'minutes'), total: 10 });
    instance._onSubmit();
    expect(toastSpy).toHaveBeenCalledWith('Please correct your information!', {
      "position": toast.POSITION.TOP_CENTER,
      "autoClose": 2000,
    });
  });
});