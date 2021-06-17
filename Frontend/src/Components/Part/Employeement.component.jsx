import React,{Component} from 'react'
import axios from 'axios'
export default class Employeement extends Component{
    constructor(props){
        super(props);
        console.log(props)
       if(this.props.location.ParentPart)
       {
           const {Part}=this.props.location.ParentPart;
           this.state.ParentPart=Part;
        this.state.ParentPartID=
        (Part===undefined?undefined:Part._id);
    
       }
       if(this.props.location.ExistsEmployeement)
        {

            const {Employeement}=this.props.location.ExistsEmployeement;
            this.state.Method=1;
            this.state.EmployeementID=Employeement._id;
            this.state.EmployeementName=Employeement.EmployeementName;
            this.state.Tasks=Employeement.Tasks;
            this.state.LevelNO=Employeement.LevelNO;
        }
    }
    state={
        PartID:null,
        EmployeementID:undefined,
        EmployeementName:'',
        Tasks:'',
        LevelNO:null,
        Method:0,

    }
    onsubmit=async(e)=>{
        e.preventDefault();
        const employeement={
            PartID:this.state.PartID,
            EmployeementID:this.state.EmployeementID,
            EmployeementName:this.state.EmployeementName,
            Tasks:this.state.Tasks,
            LevelNO:this.state.LevelNO,
        }
        if(this.state.Method===0)
        {
            await axios.post("http://localhost:5000/employeement/add/",employeement)
            .then(res=>{
                console.log('employeement added');
                this.props.history.push({
                    pathname: '/',
                    state: { CurrentPart: this.state.ParentPart ,SelectedTab:1}      
                })
            })
            .catch(err=>console.log('Client:employeement add error:'+err.response.data)); 
           
        }
        else{
            await axios.put("http://localhost:5000/employeement/update/",employeement)
        .then(res=>{
            console.log('employeement updated');
            this.props.history.push({
                pathname: '/',
                state: { CurrentPart: this.state.ParentPart ,SelectedTab:1}      
            })
        })
        .catch(err=>console.log('Client:part add error:'+err.response.data)); 
       
        }
        
    }
    onChangeEmployeementName=(e)=>{
        this.setState({EmployeementName:e.target.value});
    }
    onChangeTasks=(e)=>{
        this.setState({Tasks:e.target.value});
    }
    onChangeLevelNO=(e)=>{
        this.setState({LevelNO:e.target.value});
    }
    render(){

        return(
            
            <form onSubmit={this.onsubmit}>
                {
                    (this.state.Method===0?
                        (<div className="form-group" >
                        <h2>Add New Employeement to 
                            [{this.state.ParentPart===undefined?"Root":this.state.ParentPart.PartName}]
                        </h2>       
                    </div>
                    ):(<div className="form-group" >
                    <h2>Update  Employeement : 
                        [{this.props.location.ExistsEmployeement.Employeement.EmployeementName}]
                    </h2>       
                </div>
                ))
                    
                }
                <div className="form-group" >
                    <label>Employeement Name:</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.EmployeementName}
                     onChange={this.onChangeEmployeementName}
                     />
                </div>
                <div className="form-group" >
                    <label>Tasks:</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.Tasks}
                     onChange={this.onChangeTasks}
                     />
                </div>  
                <div className="form-group" >
                    <label>Level No:</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.LevelNO}
                     onChange={this.onChangeLevelNO}
                     />
                </div>  
                <div className="form-group">
                    <input type="submit"  value="Save" className="btn btn-primary" style={{margin:5}}/>
                    <button className="btn btn-primary" onClick={()=>{
                        this.props.history.push({
                            pathname: '/',
                            state: { CurrentPart: this.state.ParentPart ,SelectedTab:1}      
                        })

                    }}>Back</button>
                </div>
            </form>

        );

    }
}