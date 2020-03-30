import moment, { Moment } from "moment";
import { ReservationForm } from "../../models/Customer";

export const DateTimeFormat = {
    date: 'YYYY-MM-DD',
    time: 'h:mm A',
};

export class FormUtils {

    // Validate all
    public static validateForm(form: ReservationForm): boolean {

        return this.validateText(form.firstName)
            && this.validateText(form.lastName)
            && this.validateDate(moment(form.arrivalDate))
            && this.validateDateFormat(form.arrivalDate)
            && this.validateArrivalTime(moment(form.arrivalDate), moment(form.arrivalDate, DateTimeFormat.time))
            && this.validateDepartureTime(moment(form.arrivalTime, DateTimeFormat.time), moment(form.departureTime, DateTimeFormat.time))
            && this.validatePhone(form.phone)
            && this.validateNumber(form.total);

    }

    // Validate string
    public static validateText(text: string): boolean {
        return text.length > 0;
    }

    // ValidateNumber
    public static validateNumber(number: number): boolean {
        return number > 0;
    }

    // Selected Date must be more than today
    public static validateDate(arrivalDate: Moment): boolean {
        const today = moment();
        return today.isSameOrBefore(arrivalDate, 'day');
    }

    // Expect YYYY-MM-DD format
    public static validateDateFormat(date: string): boolean {
        return moment(date, DateTimeFormat.date, true).isValid();
    }

    // Arrival Time must be equare equal to or more than now
    public static validateArrivalTime(arrivalDate: Moment, arrivalTime: Moment): boolean {
        const selectedTime = moment(`${arrivalDate.format(DateTimeFormat.date)} ${arrivalTime.format(DateTimeFormat.time)}`);
        const now = moment().set({ second: 0, millisecond: 0 })
        return selectedTime.isSameOrAfter(now);
    }

    // Departure Time must be more than Arrival Time
    public static validateDepartureTime(arrivalTime: Moment, departureTime: Moment): boolean {
        arrivalTime.set({ second: 0, millisecond: 0 });
        departureTime.set({ second: 0, millisecond: 0 });
        return arrivalTime.isBefore(departureTime);
    }

    // Phone number must be correct
    public static validatePhone(phone: string): boolean {
        const phoneFormat = /^[0][1-9]\d{7}$|^[0][1-9]\d{8}$/;
        return phoneFormat.test(phone)
    }


}
