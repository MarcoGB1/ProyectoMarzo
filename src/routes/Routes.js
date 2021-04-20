import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Periodo from '../pages/Periodo';
import Nomenclatura from '../pages/Nomenclatura';
import Movimiento from '../pages/Movimiento';
import Balance from '../pages/Balance';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/periodo" component={Periodo}/>
        <Route exact path="/nomenclatura" component={Nomenclatura}/>
         <Route exact path="/movimiento" component={Movimiento}/>
         <Route exact path="/balance" component={Balance}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
