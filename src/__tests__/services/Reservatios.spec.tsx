import ReservationService from "../../services/apis/Reservations";
import { ReservationForm } from "../../models/Customer";
import moment from "moment";
import { DateTimeFormat } from "../../services/FormUtils";

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
  });