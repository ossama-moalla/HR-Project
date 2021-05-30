import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import AddEmployee from './Components/AddEmployee.component';
import Employees from './Components/Employees.component';

function App() {
  return (
    <div className="container">
        <Router>
            <Route path="/" exact component={Employees}/>
            <Route path="/addemployee" exact component={AddEmployee}/>

        </Router>
    </div>
  );
}

export default App;
