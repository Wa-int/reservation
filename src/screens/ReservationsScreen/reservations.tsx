import { DatePicker, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { ReservationForm } from '../../models/Customer';
import './reservations.scss';
import ReservationService from '../../services/apis/Reservations';

interface State {
    firstName: string,
    lastName: string,
    phone: string,
    arrivalDate: Moment,
    arrivalTime: Moment,
    departureTime: Moment,
    total: number,
    validated: boolean,
}

class ReservationsScreen extends React.Component<any, State>  {
    timeFormat: string;

    constructor(props: any) {
        super(props);
        const now = moment();

        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            arrivalDate: now,
            arrivalTime: now,
            departureTime: now,
            total: 0,
            validated: false,
        };
        this.timeFormat = 'h:mm a';
        this._onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() { }

    handleOnChangeArrivalDate(date: moment.Moment | null) {
        if (date) {
            this.setState({ arrivalDate: date });
        }
    }

    async _onSubmit() {
        this.setState({ validated: true });
        const isAllCorrect = this.validateForm();

        if (!isAllCorrect) {
            return;
        }

        const { firstName, lastName, phone, arrivalDate, arrivalTime, departureTime, total } = this.state

        const reservationForm: ReservationForm = {
            firstName,
            lastName,
            phone,
            arrivalDate: arrivalDate.format('YYYY-MM-DD'),
            arrivalTime: arrivalTime.format(this.timeFormat),
            departureTime: departureTime.format(this.timeFormat),
            total
        }

        ReservationService.saveReservations(reservationForm)
            .then(() => {
                window.location.reload(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handleOnChangeTotal(event: any) {
        const total = event.target.value;
        if (Number(total) < 0) {
            return;
        }
        this.setState({ total: total })

    }

    handleOnChangePhoneNumber(event: any) {
        const phone = event.target.value as string;
        if (Number(phone) < 0) {
            return;
        }
        this.setState({ phone })
    }

    validateForm(): boolean {
        const { firstName, lastName, total } = this.state;
        return firstName.length > 0
            && lastName.length > 0
            && this.validateArrivalTime()
            && this.validateDepartureTime()
            && this.validateDay()
            && this.validatePhone()
            && total > 0;

    }
    validateDepartureTime(): boolean {
        const { arrivalTime, departureTime } = this.state;
        arrivalTime.set({second:0,millisecond:0});
        departureTime.set({second:0,millisecond:0});
        return arrivalTime.isBefore(departureTime);
    }

    validateArrivalTime(): boolean {
        const { arrivalTime, arrivalDate } = this.state;
        const selectedTime = moment(`${arrivalDate.format('YYYY-MM-DD')} ${arrivalTime.format('HH:mm')}`);
        const now = moment().set({second:0,millisecond:0})
        return selectedTime.isSameOrAfter(now);
    }

    validatePhone(): boolean {
        const { phone } = this.state;
        const phoneFormat = /^[0][1-9]\d{7}$|^[0][1-9]\d{8}$/;
        return phoneFormat.test(phone)
    }

    validateDay(): boolean {
        const { arrivalDate } = this.state;
        const today = moment();
        return today.isSameOrBefore(arrivalDate, 'day');
    }

    render() {
        const { firstName, lastName, phone, arrivalDate, arrivalTime, departureTime, total, validated } = this.state;
        return (
            <Form validated={this.validateForm()}>
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
                                isInvalid={firstName.length === 0 && validated}
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
                                isInvalid={lastName.length === 0 && validated}
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
                                onChange={(event: any) => this.handleOnChangePhoneNumber(event)}
                                isInvalid={!this.validatePhone() && validated}
                            />
                            <Form.Control.Feedback type="invalid">
                                Phone number is not correct (0XXXXXXX)
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className='body-group'>
                        <Form.Group as={Col} md="3" controlId="validationCustom03">
                            <Form.Label>Arrival Date</Form.Label>
                            <div className={!this.validateDay() && validated ? 'time-input-warning' : ''}>
                                <DatePicker
                                    defaultValue={arrivalDate}
                                    onChange={(date) => this.handleOnChangeArrivalDate(date)}
                                    allowClear={false}
                                />
                            </div>
                            {!this.validateDay() && validated &&
                                <div className="custom-warning">
                                    <Form.Text>Cannot select in past dates</Form.Text>
                                </div>
                            }
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>Arrival Time</Form.Label>
                            <div className={!this.validateArrivalTime() && validated ? 'time-input-warning' : ''}>
                                <TimePicker
                                    defaultValue={arrivalTime}
                                    format={this.timeFormat}
                                    onChange={(time) => time ? this.setState({ arrivalTime: time }) : time}
                                    allowClear={false}
                                />
                            </div>
                            {!this.validateArrivalTime() && validated &&
                                <div className="custom-warning">
                                    <Form.Text>Arrival Time cannot be less than Now</Form.Text>
                                </div>
                            }
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                            <Form.Label>Departure Time</Form.Label>
                            <div className={!this.validateDepartureTime() && validated ? 'time-input-warning' : ''}>
                                <TimePicker
                                    defaultValue={departureTime}
                                    format={this.timeFormat}
                                    onChange={(time) => time ? this.setState({ departureTime: time }) : time}
                                    allowClear={false}
                                />
                            </div>
                            {!this.validateDepartureTime() && validated &&
                                <div className="custom-warning">
                                    <Form.Text>Departure Time must be more than Arrival Time</Form.Text>
                                </div>
                            }
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
                                onChange={(event: any) => { this.handleOnChangeTotal(event) }}
                                isInvalid={total === 0 && validated}
                            />
                            <Form.Control.Feedback type="invalid">
                                Total is required
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div className="submit-button-container">
                        <Button type="button" onClick={this._onSubmit}>Submit</Button>
                    </div>
                </div>
            </Form >

        )
    }
}
export default ReservationsScreen;
