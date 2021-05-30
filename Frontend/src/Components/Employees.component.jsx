import React,{Component} from 'react';

export default class Employees extends Component{
    state={
        EmployeeList:[],
    }
    componentDidMount(){
        console.log('ff')
    }
    UpdateList=(ChangeFlag)=>{

    }
    render()
    {
        console.log('employuees')
        return(
            <div>
                <h1>hello world</h1>
                <a href="/addemployee" onClick={this.UpdateList}>Add Employee</a>
            </div>
        );
    }
}