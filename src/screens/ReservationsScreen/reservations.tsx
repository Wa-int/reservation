import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import './reservations.scss';
import { Customer } from '../../models/Customer';
import { Button, Form, Col, InputGroup, FormText, FormLabel } from 'react-bootstrap';

interface State {
    firstName: string,
    lastName: string,
    phone: string,
    arrivalDate: Date,
    arrivalTime: string,
    departureTime: string,
    total: number,
    validate: { validated: boolean, setValidated: boolean }
}

class ReservationsScreen extends React.Component<any, State>  {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            arrivalDate: new Date(),
            arrivalTime: '',
            departureTime: '',
            total: 0,
            validate: { validated: false, setValidated: false }
        };
    }

    componentDidMount() {

    }

    handleOnChangeArrivalDate(date: Date | null) {
        if (date) {
            this.setState({ arrivalDate: date });
        }
    }

    onSubmit() {
        console.log('waint');
        const isComplelte = this.validateForm();
        if (!isComplelte) {
            console.log('false');
            return;
        }
        const orderList = JSON.parse(localStorage.getItem("orders") || "[]") as Customer[];
        const { firstName, lastName, phone, arrivalDate, arrivalTime, departureTime, total } = this.state

        const d = arrivalDate.toLocaleDateString();
        const customer: Customer = { firstName, lastName, phone, arrivalDate: d, arrivalTime, departureTime, total }
        orderList.push(customer)
        localStorage.setItem("orders", JSON.stringify(orderList));
    }



    _handleOnChangeTotal(event: any) {
        const total = event.target.value;
        if (total >= 0) {
            this.setState({ total })
        }
    }

    validateForm(): boolean {
        const { firstName, lastName, phone, arrivalDate, arrivalTime, departureTime, total } = this.state;
        return firstName.length > 0 &&
            lastName.length > 0 &&
            phone.length > 0 &&
            arrivalDate !== null &&
            arrivalTime !== null &&
            departureTime.length > 0 &&
            total > 0;
    }

    render() {
        const { firstName, lastName, phone, arrivalDate, arrivalTime, departureTime, total } = this.state;
        return (
            <Form validated={this.validateForm()} onSubmit={this.onSubmit}>
                <div className="header-boundary">
                    <h3>Reservation Form</h3>
                    <h5>Please fill the form below accurately to enable us serve you better!.. welcome!</h5>
                </div>
                <div className="forms-body">
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(event: any) => { this.setState({ firstName: event.target.value }) }}
                                isInvalid={firstName.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                First name is required
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(event: any) => { this.setState({ lastName: event.target.value }) }}
                                isInvalid={lastName.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                Last name is required
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(event: any) => { this.setState({ phone: event.target.value }) }}
                                isInvalid={phone.length === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                Phone number is required
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="body-group">
                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                            <Form.Label>Arrival Date</Form.Label>
                            <div>
                                <DatePicker
                                    selected={arrivalDate}
                                    onChange={(date) => this.handleOnChangeArrivalDate(date)}
                                />
                            </div>
                            <Form.Control.Feedback type="invalid">
                                Phone number is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>Arrival Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="00:00"
                                value={arrivalTime}
                                onChange={(event: any) => { this.setState({ arrivalTime: event.target.value }) }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Departure Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="00:00"
                                value={departureTime}
                                onChange={(event: any) => { this.setState({ departureTime: event.target.value }) }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Label>Total</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Total"
                                value={total}
                                onChange={(event: any) => { this._handleOnChangeTotal(event) }}
                                isInvalid={total === 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                Phone number is required
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div className="submit-button-container">
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
            </Form >

        )
    }
}
export default ReservationsScreen;
