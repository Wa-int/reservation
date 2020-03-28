import React from 'react';
import { Table } from 'react-bootstrap';
import { Customer, CustomerList } from '../../models/Customer';
import DatePicker from "react-datepicker";
import './report.scss';

interface State {
    customerList: CustomerList[],
    date: Date | null,
}


class ReportScreen extends React.Component<any, State>  {

    constructor(props: any) {
        super(props);
        this.state = {
            customerList: [],
            date: null
        };

    }

    componentDidMount() {
    }

    getReservationList(date: Date) {

        let orderList = JSON.parse(localStorage.getItem("orders") || "[]") as Customer[];

        if (Array.isArray(orderList) && orderList.length === 0) {
            return;
        }

        let result = orderList
            .filter((e) => e.arrivalDate === date.toLocaleDateString())
            // Group by First name + Last name.
            // In case a customer reserves more than 1.
            .reduce((r, a) => {
                const key = `${a.firstName} ${a.lastName}`
                r[key] = r[key] || [];
                r[key].push(a);
                return r;
            }, Object.create(null));

        let allTables = 0;
        const unit = 4;

        const customerList: CustomerList[] = [];
        for (let [key, value] of Object.entries(result)) {
            const totalByName = (value as Customer[]).reduce((n, e) => n + e.total, 0)

            let table = 0;

            table = Math.floor(totalByName / unit)
            table = totalByName % unit > 0 ? table + 1 : table;

            allTables = allTables + table;
            customerList.push({ name: key.toUpperCase(), total: totalByName } as CustomerList)
        }

        this.setState({ customerList });

    }

    renderTable() {
        const { customerList } = this.state;
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((e, i) => {
                        const key = `${i}-${e.name}`;
                        return (
                            <tr key={key}>
                                <td>{i + 1}</td>
                                <td>{e.name}</td>
                                <td>{e.total}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    handleOnChangeArrivalDate(date: Date | null) {
        if (date) {
            this.setState({ date: date });
            this.getReservationList(date);
        }
    }

    render() {
        const { customerList, date } = this.state;
        return (

            <div className="container">
                <DatePicker
                    selected={date}
                    onChange={(date) => this.handleOnChangeArrivalDate(date)}
                />
                {date ? (customerList.length > 0 ? this.renderTable() : <h5>No reservations</h5>) : <h5>Select Date</h5>}
            </div>
        )
    }
}
export default ReportScreen;
