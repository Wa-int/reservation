import React from 'react';
import { Table } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { ReservationList } from '../../models/Customer';
import './report.scss';
import { ReservationService } from '../../services/apis/Reservations';
import moment, { Moment } from 'moment';

interface State {
    reservationList: ReservationList[],
    summary: number,
    selectedDate: Moment,
}


class ReportScreen extends React.Component<any, State>  {

    constructor(props: any) {
        super(props);
        this.state = {
            reservationList: [],
            selectedDate: moment(),
            summary: 0,
        };

    }

    componentDidMount() {
        this.getReservationList(this.state.selectedDate);
    }

    getReservationList(selectedDate: Moment) {
        ReservationService.getReservationsByDate(selectedDate.format('YYYY-MM-DD'))
            .then((data) => {
                this.setState({ reservationList: data.reservationList, summary: data.allTable });
            })
            .catch((e) => console.log(e));
    }

    renderTable() {
        const { reservationList, summary } = this.state;
        let count = 0;
        return (
            <div className='table-style'>
                <Table responsive='sm'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Arrival Time</th>
                            <th>Departure Time</th>
                            <th>Tel</th>
                            <th>Total/Reservation</th>
                            <th>Total</th>
                            <th>Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservationList.map((customer, i) => {
                            const lengthSpan = customer.reservationListDetails.length;
                            return (
                                <>
                                    {customer.reservationListDetails.map((details, j) => {
                                        const key = `${i}${j}-${customer.name}-${details.arrivalTime}`
                                        count = count + 1;
                                        return (
                                            <tr key={key}>
                                                <td>{count}</td>
                                                {j === 0 && <td rowSpan={lengthSpan}>{customer.name}</td>}
                                                <td>{details.arrivalTime}</td>
                                                <td>{details.departureTime}</td>
                                                <td>{details.phone}</td>
                                                <td>{details.total}</td>
                                                {j === 0 && <td rowSpan={lengthSpan}>{customer.total}</td>}
                                                {j === 0 && <td rowSpan={lengthSpan}>{customer.table}</td>}
                                            </tr>
                                        )
                                    })}
                                </>
                            )
                        })}
                    </tbody>
                </Table>
                <div className='summary-style '>
                    {`Summary: ${summary} Table(s)`}
                </div>
            </div>
        )
    }

    handleOnChangeArrivalDate(selectedDate: Moment | null) {
        if (selectedDate) {
            this.setState({ selectedDate, reservationList: [] });
            this.getReservationList(selectedDate);
        }
    }

    render() {
        const { reservationList, selectedDate } = this.state;
        return (
            <div>
                <div>
                    <DatePicker
                        defaultValue={selectedDate}
                        onChange={(date) => this.handleOnChangeArrivalDate(date)}
                        allowClear={false}
                    />
                </div>
                <div className="body-container">
                    {selectedDate ? (reservationList.length > 0 ? this.renderTable() : <h5>No reservations</h5>) : <h5>Select Date</h5>}
                </div>
            </div>
        )
    }
}
export default ReportScreen;
