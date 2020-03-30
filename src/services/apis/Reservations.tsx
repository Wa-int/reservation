import moment from "moment";
import { ReservationForm, ReservationFormResponse, ReservationList } from "../../models/Customer";
import LocalStorageService from "../LocalStorageSevice";
import { FormUtils, DateTimeFormat } from "../FormUtils";

export class ReservationService {

    /**
     * Save Reservation Form
     */
    public static saveReservations(reservationForm: ReservationForm | undefined): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (reservationForm && FormUtils.validateForm(reservationForm)) {
                const reservationList = JSON.parse(LocalStorageService.getReservationList() || "[]") as ReservationForm[];
                reservationList.push(reservationForm);
                const details = JSON.stringify(reservationList);
                LocalStorageService.setReservationList(details)
                resolve(true);
            } else {
                reject(new Error('Data could not be saved, please try again.'))
            }
        });
    }

    /**
     * Get Reservation Form
     */

    public static getReservationsByDate(date: string | null | undefined): Promise<ReservationFormResponse> {
        return new Promise((resolve, reject) => {
            if (date && FormUtils.validateDateFormat(date)) {
                let reservationList = JSON.parse(LocalStorageService.getReservationList() || "[]") as ReservationForm[];
                reservationList = reservationList.filter((e) => e.arrivalDate === date);
                const unit = 4;
                const allTables = FormUtils.calculatePeriod(
                    // Convert Time (HH:mm A) to ISO String 
                    // Since It's hard to compare when creating a new Moment variable by time only
                    reservationList.map((e) => {
                        e.arrivalTime = moment(`${moment().format(DateTimeFormat.date)} ${e.arrivalTime}`).toISOString();
                        e.departureTime = moment(`${moment().format(DateTimeFormat.date)} ${e.departureTime}`).toISOString();
                        return e;
                    })
                    , unit);
                const reservationFormResponse: ReservationFormResponse = { allTable: 0, reservationList: [] };
                if (Array.isArray(reservationList) && reservationList.length > 0) {
                    let result = reservationList
                        // Group by First name + Last name.
                        // In case a customer reserves more than 1 in this day.
                        .reduce((r, a) => {
                            const key = `${a.firstName.toUpperCase()} ${a.lastName.toUpperCase()}`
                            r[key] = r[key] || [];
                            r[key].push(a);
                            return r;
                        }, Object.create(null));

                    for (let [key, value] of Object.entries(result)) {
                        const reservationList: ReservationList = { name: '', total: 0, table: 0, reservationListDetails: [] };
                        const totalByName = (value as ReservationForm[]).reduce((n, e) => n + Number(e.total), 0)

                        const table = Math.ceil(totalByName / unit);
                        reservationList.name = key;
                        reservationList.reservationListDetails = value as ReservationForm[];
                        reservationList.total = totalByName;
                        reservationList.table = table;

                        reservationFormResponse.reservationList.push(reservationList);
                    }
                    reservationFormResponse.allTable = allTables;
                }
                resolve(reservationFormResponse);
            } else {
                reject(new Error('Unable to complete your request.'));
            }
        });
    }
}


export default ReservationService;