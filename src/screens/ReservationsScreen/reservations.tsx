import { DatePicker, TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { ReservationForm } from '../../models/Customer';
import './reservations.scss';
import ReservationService from '../../services/apis/Reservations';
import { DateTimeFormat, FormUtils } from '../../services/FormUtils';
import { toast, ToastContainer } from 'react-toastify';

interface Props { }

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

class ReservationsScreen extends React.Component<Props, State>  {

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
        this._onSubmit = this._onSubmit.bind(this);
    }

    handleOnChangeArrivalDate(date: moment.Moment | null) {
        if (date) {
            this.setState({ arrivalDate: date });
        }
    }

    _onSubmit() {
        this.setState({ validated: true });
        const formBody = this.getFormBody();
        const isAllCorrect = FormUtils.validateForm(formBody);

        if (!isAllCorrect) {
            toast.warn('Please correct your information!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }

        ReservationService.saveReservations(formBody)
            .then(() => {
                toast.success("Your reservations is successful.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
                this.clearData();
            })
            .catch((e: Error) => {
                toast.error(e.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
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

    getFormBody(): ReservationForm {
        const { firstName, lastName, phone, arrivalDate, arrivalTime, departureTime, total } = this.state
        return {
            firstName,
            lastName,
            phone,
            arrivalDate: arrivalDate.format(DateTimeFormat.date),
            arrivalTime: arrivalTime.format(DateTimeFormat.time),
            departureTime: departureTime.format(DateTimeFormat.time),
            total
        }
    }

    clearData() {
        const now = moment();
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
            arrivalDate: now,
            arrivalTime: now,
            departureTime: now,
            total: 0,
            validated: false,
        })
    }

    render() {
        const { firstName, lastName, phone, arrivalDate, arrivalTime, departureTime, total, validated } = this.state;
        return (
            <>
                <Form validated={FormUtils.validateForm(this.getFormBody())}>
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
                                    isInvalid={!FormUtils.validateText(firstName) && validated}
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
                                    isInvalid={!FormUtils.validateText(lastName) && validated}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Last name is required
                        </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="validationCustom03">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(event: any) => this.handleOnChangePhoneNumber(event)}
                                    isInvalid={!FormUtils.validatePhone(phone) && validated}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Phone number is not correct (0XXXXXXX) or (0XXXXXXX-X)
                        </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className='body-group'>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>Arrival Date</Form.Label>
                                <div className={!FormUtils.validateDate(arrivalDate) && validated ? 'time-input-warning' : undefined}>
                                    <DatePicker
                                        defaultValue={arrivalDate}
                                        onChange={(date) => this.handleOnChangeArrivalDate(date)}
                                        allowClear={false}
                                    />
                                </div>
                                {!FormUtils.validateDate(arrivalDate) && validated &&
                                    <div className="custom-warning">
                                        <Form.Text>Cannot select in past dates</Form.Text>
                                    </div>
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>Arrival Time</Form.Label>
                                <div className={!FormUtils.validateArrivalTime(arrivalDate, arrivalTime) && validated ? 'time-input-warning' : ''}>
                                    <TimePicker
                                        defaultValue={arrivalTime}
                                        format={DateTimeFormat.time}
                                        onChange={(time) => time ? this.setState({ arrivalTime: time }) : time}
                                        allowClear={false}
                                    />
                                </div>
                                {!FormUtils.validateArrivalTime(arrivalDate, arrivalTime) && validated &&
                                    <div className="custom-warning">
                                        <Form.Text>Arrival Time cannot be less than Now</Form.Text>
                                    </div>
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="validationCustom06">
                                <Form.Label>Departure Time</Form.Label>
                                <div className={!FormUtils.validateDepartureTime(arrivalTime, departureTime) && validated ? 'time-input-warning' : ''}>
                                    <TimePicker
                                        defaultValue={departureTime}
                                        format={DateTimeFormat.time}
                                        onChange={(time) => time ? this.setState({ departureTime: time }) : time}
                                        allowClear={false}
                                    />
                                </div>
                                {!FormUtils.validateDepartureTime(arrivalTime, departureTime) && validated &&
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
                                    isInvalid={(String(total).length <= 0 || total === 0) && validated}
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
                <ToastContainer />
            </>
        )
    }
}
export default ReservationsScreen;
