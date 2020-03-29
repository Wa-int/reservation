import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom";
import './App.scss';
import ReservationsScreen from './screens/ReservationsScreen/reservations';
import ReportScreen from './screens/ReportScreen/report';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Restaurant</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/reservations">Reservations</Nav.Link>
          <Nav.Link href="/report">Report</Nav.Link>
        </Nav>
      </Navbar>

      <div className="App">
        <Switch>
          <Route exact path='/reservations' component={ReservationsScreen} />
          <Route exact path='/report' component={ReportScreen} />
          <Route render={function () {
            return <p>Not found</p>
          }} />
        </Switch>
      </div>
    </>
  );
}


export default App;
