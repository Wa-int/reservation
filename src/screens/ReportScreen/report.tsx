import React from 'react';
import { Table } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { ReservationList } from '../../models/Customer';
import './report.scss';
import { ReservationService } from '../../services/apis/Reservations';
import moment, { Moment } from 'moment';
import { DateTimeFormat } from '../../services/FormUtils';

interface Props {}
interface State {
    reservationList: ReservationList[],
    summary: number,
    selectedDate: Moment,
}


class ReportScreen extends React.Component<Props, State>  {

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
        ReservationService.getReservationsByDate(selectedDate.format(DateTimeFormat.date))
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
                                            const key = `${i}${j}-${customer.name}-${details.arrivalTime}-${details.departureTime}--${details.phone}-${details.total}`
                                            const rowSpanCond = j === 0 ? true : false;
                                            count = count + 1;
                                            return (
                                                <tr key={key}>
                                                    <td>{count}</td>
                                                    {rowSpanCond && <td rowSpan={lengthSpan}>{customer.name}</td>}
                                                    <td>{moment(details.arrivalTime).format(DateTimeFormat.time)}</td>
                                                    <td>{moment(details.departureTime).format(DateTimeFormat.time)}</td>
                                                    <td>{details.phone}</td>
                                                    <td>{details.total}</td>
                                                    {rowSpanCond && <td rowSpan={lengthSpan}>{customer.total}</td>}
                                                    {rowSpanCond && <td rowSpan={lengthSpan}>{customer.table}</td>}
                                                </tr>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                </Table>
                <div className='summary-style'>
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
