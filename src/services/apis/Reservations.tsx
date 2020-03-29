import LocalStorageService from "../LocalStorageSevice";
import { ReservationForm, ReservationFormResponse, ReservationList } from "../../models/Customer";


export class ReservationService {

    /**
     * Save Reservation Form
     */
    public static saveReservations(reservationForm: ReservationForm | undefined): Promise<void> {
        return new Promise((resolve, reject) => {
            if (reservationForm) {
                const reservationList = JSON.parse(LocalStorageService.getReservationList() || "[]") as ReservationForm[];
                
                reservationList.push(reservationForm);
                const details = JSON.stringify(reservationList);

                resolve(LocalStorageService.setReservationList(details));
            } else {
                reject(new Error('Data could not be saved, please try again.'))
            }
        });
    }

    /**
     * Use Lottery
     * @path {PATCH} /lotteries/bonuses
     * @return {Observable<UseLotteryResponse>} Observable<UseLotteryResponse>
     */

    public static getReservationsByDate(date: string | undefined): Promise<ReservationFormResponse> {
        return new Promise((resolve, reject) => {
            if (date) {
                const reservationList = JSON.parse(LocalStorageService.getReservationList() || "[]") as ReservationForm[];
                const reservationFormResponse: ReservationFormResponse = { allTable: 0, reservationList: [] };
                if (Array.isArray(reservationList) && reservationList.length > 0) {

                    let result = reservationList
                        .filter((e) => e.arrivalDate === date)
                        // Group by First name + Last name.
                        // In case a customer reserves more than 1.
                        .reduce((r, a) => {
                            const key = `${a.firstName.toUpperCase()} ${a.lastName.toUpperCase()}`
                            r[key] = r[key] || [];
                            r[key].push(a);
                            return r;
                        }, Object.create(null));

                    let allTables = 0;
                    const unit = 4;

                    for (let [key, value] of Object.entries(result)) {
                        const reservationList: ReservationList = { name: '', total: 0, table: 0, reservationListDetails: [] };

                        const totalByName = (value as ReservationForm[]).reduce((n, e) => n + Number(e.total), 0)

                        let table = 0;

                        table = Math.floor(totalByName / unit)
                        table = totalByName % unit > 0 ? table + 1 : table;

                        allTables = allTables + table;

                        reservationList.name = key;
                        reservationList.reservationListDetails = value as ReservationForm[];
                        reservationList.total = totalByName;
                        reservationList.table = table;
                        
                        reservationFormResponse.reservationList.push(reservationList);
                    }
                    reservationFormResponse.allTable = allTables;
                    resolve(reservationFormResponse);
                } else {
                    resolve(reservationFormResponse);
                }
            } else {
                reject(new Error('Unable to complete your request.'))
            }
        });
    }

}

export default ReservationService;