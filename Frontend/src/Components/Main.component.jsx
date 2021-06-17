import React,{Component} from 'react'
import Employees from './Employee/Employees.component'
import Parts from './Part/Parts.component'
export default class Main extends Component{
    constructor(props)
    {
        super(props);
       // console.log(props)
        if(props.history&&props.history.location&&props.history.location.state)
         {
            if(props.history.location.state.SelectedTab)
                this.state.SelectedTab=props.history.location.state.SelectedTab;
             
            if(props.history.location.state.CurrentPart)
            this.state.CurrentPart=props.history.location.state.CurrentPart;
         } 
    }
    state={
        SelectedTab:0,
        CurrentPart:undefined,
        colorr:'primary'
    }
    onchange=(e)=>{
        this.setState({colorr:e.target.value})
    }
    render(){
       const PartState={
         state:{
            CurrentPart:this.state.CurrentPart,
         }
       }
       const {SelectedTab}=this.state;
        return(
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={"nav-link "+(SelectedTab===0?"active":"")} id="employee-tab" 
                        data-bs-toggle="tab" data-bs-target="#employee" type="button" 
                        role="tab" aria-controls="employee" 
                        aria-selected={this.state.SelectedTab===0?true:false}>Employees</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={"nav-link "+(SelectedTab===1?"active":"")} id="part-tab" data-bs-toggle="tab"
                       data-bs-target="#part" type="button" role="tab" 
                       aria-controls="part" 
                       aria-selected={this.state.SelectedTab===1?true:false}>Parts</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={"nav-link "+(SelectedTab===2?"active":"")} id="employeement-tab" data-bs-toggle="tab" 
                      data-bs-target="#employeement" type="button" role="tab" 
                      aria-controls="employeement"
                       aria-selected={this.state.SelectedTab===2?true:false}>EmployyMents</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className={"tab-pane fade "+(SelectedTab===0?"show active":"")} id="employee" role="tabpanel" aria-labelledby="employee-tab">
                        <Employees/>
                    </div>
                    <div className={"tab-pane fade "+(SelectedTab===1?"show active":"")} id="part" role="tabpanel"  aria-labelledby="part-tab">
                        <Parts location={PartState}/>
                    </div>
                    <div className={"tab-pane fade "+(SelectedTab===2?"show active":"")} id="employeement" role="tabpanel" aria-labelledby="employeement-tab">.
                        fffff..</div>
                    </div>
            </div>
                         
             );
    }
 
}