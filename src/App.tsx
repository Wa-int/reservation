import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom";
import './App.scss';
import ReportScreen from './screens/ReportScreen/report';
import ReservationsScreen from './screens/ReservationsScreen/reservations';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Restaurant</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/reservation">Reservations</Nav.Link>
          <Nav.Link href="/reservation/report">Report</Nav.Link>
        </Nav>
      </Navbar>

      <div className="App">
        <Switch>
          <Route exact path='/reservation' component={ReservationsScreen} />
          <Route exact path='/reservation/report' component={ReportScreen} />
        </Switch>
      </div>
    </>
  );
}


export default App;
