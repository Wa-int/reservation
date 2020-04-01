import moment, { Moment } from "moment";
import { ReservationForm } from "../models/Customer";

export const DateTimeFormat = {
    date: 'YYYY-MM-DD',
    time: 'h:mm A',
};

interface UniqueCustomerName {
    name: string,
    total: number,
}

export class FormUtils {

    // Validate all
    public static validateForm(form: ReservationForm): boolean {
        return this.validateText(form.firstName)
            && this.validateText(form.lastName)
            && this.validateDate(moment(form.arrivalDate))
            && this.validateDateFormat(form.arrivalDate)
            && this.validateArrivalTime(moment(form.arrivalDate), moment(form.arrivalTime, DateTimeFormat.time))
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

    public static calculateTables(customer: ReservationForm[], unit: number): number {

        const calTalblesByPeriod = (tempNameList: UniqueCustomerName[], unit: number): number => {
            return Array.from(new Set(tempNameList.map((e) => e.name))).map((i) => {
                return Math.ceil(tempNameList.reduce((n, e) => i === e.name ? n + Number(e.total) : n, 0) / unit)
            }).reduce((n, e) => n + Number(e), 0)
        };

        if (Array.isArray(customer) && customer.length > 0 && unit > 0) {
            customer.sort((a, b) => moment(a.arrivalTime).diff(moment(b.arrivalTime)));
            if (customer.length > 1) {
                const numberCandidate = [];
                let departureTime = moment(customer[0].departureTime).valueOf();
                let tempNameList: UniqueCustomerName[] = [{ name: `${customer[0].firstName} ${customer[0].lastName}`, total: customer[0].total }];
                let tempIndex = -1; // For coming back to period that it's needed to start checking again.
                for (let i = 1; i < customer.length; i++) {
                    const currentArrivalTime = moment(customer[i].arrivalTime).valueOf();
                    const currentDepartureTime = moment(customer[i].departureTime).valueOf();
                    if (currentDepartureTime <= departureTime) {
                        tempNameList.push({ name: `${customer[i].firstName} ${customer[i].lastName}`, total: customer[i].total });
                    } else if (currentDepartureTime > departureTime && currentArrivalTime < departureTime) {
                        tempNameList.push({ name: `${customer[i].firstName} ${customer[i].lastName}`, total: customer[i].total });
                        tempIndex = tempIndex === -1 ? i : tempIndex;
                    } else if (currentArrivalTime >= departureTime) {
                        numberCandidate.push(calTalblesByPeriod(tempNameList, unit))
                        if (tempIndex !== -1) {
                            i = tempIndex;
                        }
                        tempIndex = -1;
                        tempNameList = [];
                        departureTime = moment(customer[i].departureTime).valueOf();
                    }

                    if (i === customer.length - 1) {
                        numberCandidate.push(calTalblesByPeriod(tempNameList, unit));
                    }
                }
                return Math.max(...numberCandidate);
            } else {
                return Math.ceil(customer[0].total / unit);
            }
        } else {
            return 0;
        }
    }
}
