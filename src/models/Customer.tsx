export interface ReservationForm {
    firstName: string;
    lastName: string;
    phone: string;
    arrivalDate: string;
    arrivalTime: string;
    departureTime: string;
    total: number;
}

export interface ReservationList {
    name: string,
    total: number,
    table: number,
    reservationListDetails: ReservationForm[]
}

export interface ReservationFormResponse {
    reservationList: ReservationList[],
    allTable: number,
}
