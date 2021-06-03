import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Employee from './Components/Employee.component';
import Employees from './Components/Employees.component';
import * as moment from 'moment'
import  Test  from './Components/test.component';
import Error from './Components/Error.component';

function App() {
  return (
    <div className="container">
        <Router>
            <Route path="/" exact component={Employees}/>
            <Route path="/addemployee" exact component={Employee}/>
            <Route path="/editemployee" exact component={Employee}/>
            <Route path="/error" exact component={Error}/>


        </Router>
    </div>
  );
}

export default App;
