import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Employee from './Components/Employee/Employee.component';
import Employees from './Components/Employee/Employees.component';
import * as moment from 'moment'
import  Test  from './Components/test.component';
import Error from './Components/Error.component';
import Main from './Components/Main.component';
import Part from './Components/Part/Part.component';
import Employeement from './Components/Part/Employeement.component'
function App() {
  return (
    <div>
        <div className="container">
            <Router>

                <Route path="/" exact component={Main}/>
                <Route path="/addemployee" exact component={Employee}/>
                <Route path="/editemployee" exact component={Employee}/>
                <Route path="/error" exact component={Error}/>
                <Route path="/part" exact component={Part}/>
                <Route path="/editpart" exact component={Part}/>
                <Route path="/employeement" exact component={Employeement}/>
                
      

            </Router>
        </div>
    </div>
    
  );
}

export default App;
