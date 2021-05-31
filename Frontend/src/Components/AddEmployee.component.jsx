import React,{Component} from 'react';
import axios from 'axios';
import './components.css';
import DatePicker from 'react-datepicker';
import { ChevronBarDown  } from 'bootstrap-icons-react';

export default class AddEmployee extends Component{
    constructor(props)
    {
        super(props);
    }

    state={
          EmployeeName:"",
          Gender:null,
          BirthDate:new Date(),
          NationalID:"",
          MaritalStatus:null,
          Mobile:"",
          Phone:"",
          Email:"",
          Address:"",
          Report:"",
          EmployeeImageTemp:process.env.PUBLIC_URL + '/employee.jpg',
          EmployeeImageFile:undefined,
          CurrencyID:null,
          CertificateList:[],
          QualificationList:[]
    
    }
     readfile=async (params) =>{
        
    }
    readFile=(e)=>{
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.readAsDataURL(e)
            })
    }
    onsubmit=async(e)=>{
        e.preventDefault(); 
        var reader = new FileReader();
        var result=[];
        try
        {
             result=await this.readFile(this.state.EmployeeImageFile);

        }catch{
            result=[]
        }
            const item={
                ItemName:this.state.ItemName,
                ItemCompany:this.state.ItemCompany,
                FolderID:this.state.FolderID,
                ItemImage:result
            }
            

            await axios.post("http://localhost:5000/item/add",item)
            .then(res=>console.log('item added'))
            .catch(err=>console.log('Client:item add error:'+err.response.data)); 
            this.props.history.push({
                pathname: '/folders/',
                state: { ParentFolderID: this.state.FolderID }
           })        
            
    }
    onChangeItemName=(e)=>{
        this.setState({ItemName:e.target.value});
    }
    onChangeItemCompany=(e)=>{
        this.setState({ItemCompany:e.target.value});
    }
    
    onChangeEmployeeImageURL =async(event)  => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
         
          this.setState({

            EmployeeImageTemp: URL.createObjectURL(img),
            EmployeeImageFile:img
          });
        }
      };

    render(){
        console.log('render')
        return(
            <div className="container">
                <div className="row" style={{border:"ridge",marginTop:15}}>
                    <div>
                            <button id="ShowBasic_Information"className="btn btn-light" 
                            type="button" 
                            data-bs-toggle="collapse" data-bs-target="#Basic_Information" 
                            aria-expanded="true" 
                            aria-controls="Basic_Information">
                                Basic Information
                                <span>  <ChevronBarDown  /></span>
                             </button>
                    </div>
                    <div className="collapse show" id="Basic_Information">
                        <div className="card card-body"> 
                            <div className="row " style={{margin:0}}>
                                <div className="col-md-7">
                                    <div className="row mt-1">
                                        <label >Employee Name</label>
                                        <input type="text"
                                        required className="form-control" 
                                        value={this.state.ItemName}
                                        placeholder="Employee Name..."
                                        onChange={this.onChangeItemName}
                                        autoFocus
                                        />
                                    </div>
                            
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label>Gender:</label><br/>
                                            <div className="form-group">
                                                <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                id="inlineRadio1" value="option1" defaultChecked/>
                                                <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                id="inlineRadio2" value="option2"/>
                                                <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label>Material Status:</label>
                                            <select className="form-select" >
                                            <option value="1">Single</option>
                                            <option value="2">Married</option>
                                            <option value="3">divorced</option>
                                            <option value="4">Widower</option>

                                            </select>
                                        </div>
                                        <div className="col">
                                            <label>Birth Date:</label><br/>
                                            <div className="form-group">
                                                <DatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={new Date()}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <label >National ID:</label>

                                        <input type="text"
                                        required className="form-control" 
                                        value={this.state.ItemName}
                                        placeholder="National ID..."
                                        onChange={this.onChangeItemName}
                                        autoFocus
                                        />    
                                    </div>
                                     <div className="row mt-3">
                                        <div className="col">
                                            <label>Mobile:</label><br/>
                                            <input type="text"
                                            required className="form-control" 
                                            value={this.state.ItemName}
                                            placeholder="Mobile..."
                                            onChange={this.onChangeItemName}
                                            autoFocus
                                            />
                                        </div>
                                    <div className="col">
                                        <label>Phone:</label>
                                        <input type="text"
                                        required className="form-control" 
                                        value={this.state.ItemName}
                                        placeholder="Phone..."
                                        onChange={this.onChangeItemName}
                                        autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label >Email:</label>
                                        <input type="text"
                                        required className="form-control" 
                                        value={this.state.ItemName}
                                        placeholder="Email..."
                                        onChange={this.onChangeItemName}
                                        autoFocus
                                        />    

                                    </div>
                                    <div className="col">
                                        <label >Address:</label>
                                        <input type="text"
                                        required className="form-control" 
                                        value={this.state.ItemName}
                                        placeholder="Address..."
                                        onChange={this.onChangeItemName}
                                        autoFocus
                                        />    

                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <label >Report:</label>

                                    <input type="text"
                                    required className="form-control" 
                                    value={this.state.ItemName}
                                    placeholder="Report..."
                                    onChange={this.onChangeItemName}
                                    autoFocus
                                    />    
                                </div>
                        
                            </div>
                            <div className="col-md-4" style={{marginLeft:20}}>
                                    <label>Employee Image</label><br/>

                                    <img src={this.state.EmployeeImageTemp} style={{width:400,height:400,
                                        display:"block"}} alt=""/>
                                    <input type="button" value="Upload Image" onClick={()=>{
                                        document.getElementById('image').click()
                                    }}></input>
                                    
                                    <input style={{visibility:"hidden"}} type="file" id="image"
                                    name="image" value="" onChange={this.onChangeEmployeeImageURL}></input>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                </div>
                <div className="row align-items-center" style={{border:"ridge",marginTop:15}} >

                        <div>
                            <button id="ShowAdditinal_Information"className="btn btn-light" 
                            type="button" 
                            data-bs-toggle="collapse" data-bs-target="#Additinal_Information" 
                            aria-expanded="false" 
                            aria-controls="Additinal_Information">
                                Additinal Information
                                <span>  <ChevronBarDown  /></span>
                             </button>
                        </div>
                            
                        <div className="collapse" id="Additinal_Information">
                            <div className="card card-body"> 
                                {<Certificates CertificateList={this.state.CertificateList} onsubmitCertificate={this.onsubmitCertificate}/>}
                                {<Qualifications QualificationList={this.state.QualificationList} 
                                onsubmitQualification={this.onsubmitQualification}/>}
        
                            </div>
                        </div>          
                    
                </div>
                <div className="row" style={{margin:10}}>
                    <div style={{margin:"auto",float:"left",width:400}}>
                        <input type="submit"  value="Add Employee" className="btn btn-primary" 
                        style={{margin:5,width:200,height:50}}/>
                        <button style={{margin:5,width:100,height:50}} className="btn btn-primary" onClick={()=>{this.props.history.push({
                                pathname: '/'
                            })}}>Back</button>     
                    </div>
                   
                </div>
            </div>
        );

    }
    onsubmitCertificate=(props)=>{
        let { CertificateList } = this.state;
        CertificateList.push(props);
        this.setState({CertificateList: CertificateList})
    }
    onsubmitQualification=(props)=>{
        let { QualificationList } = this.state;
        QualificationList.push(props);
        this.setState({QualificationList: QualificationList})
    }
}
 
class Certificates extends Component{
    state={
        Description:'',
        University:'',
        StartYear:'',
        FinishYear:''
    }
    onChangeDescription=(e)=>{
        this.setState({Description:e.target.value});
    }
    onChangeUniversity=(e)=>{
        this.setState({University:e.target.value});      
    }
    onChangeStartYear=(e)=>{
        this.setState({StartYear:e.target.value});      
    }
    onChangeFinishYear=(e)=>{
        this.setState({FinishYear:e.target.value});       
    }
   render(){
    return(
            <div className="row">
                
            <div className="row" style={{margin:15}}>
                            <h4>Certificate's</h4>
                            <div>
                            <button id="ShowAddCertificateForm"className="btn btn-primary" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#AddCertificateForm" aria-expanded="false" 
                            aria-controls="AddCertificateForm">
                                Add Certificate
                             </button>
                            </div>
                            
                            <div className="collapse" id="AddCertificateForm">
                            <div className="card card-body">   
                                                            
                                <div className="row mt-3">
                                <div className="col-md-4">
                                        <label >Certificate Name:</label>
                                        <input type="text"
                                         className="form-control" 
                                        value={this.state.Description}
                                        placeholder="Name..."
                                        onChange={this.onChangeDescription}
                                        autoFocus
                                        />    
                                    </div>
                                    <div className="col-md-4">
                                        <label >University:</label>
                                        <input type="text"
                                         className="form-control" 
                                        value={this.state.University}
                                        placeholder="University..."
                                        onChange={this.onChangeUniversity}
                                        />    

                                    </div>
                                
                                    <div className="col-md-2">
                                        <label >Start Year:</label>
                                        <input type="text"
                                         className="form-control" 
                                        value={this.state.StartYear}
                                        placeholder="Start Year..."
                                        onChange={this.onChangeStartYear}
                                        
                                        />    
                                    </div>
                                    <div className="col-md-2">
                                        <label >Finish Year:</label>
                                        <input type="text"
                                         className="form-control" 
                                        value={this.state.FinishYear}
                                        placeholder="Finish Year..."
                                        onChange={this.onChangeFinishYear}
                                        
                                        />    
                                    </div>
                                </div>
                                <div className="row" style={{margin:15}}>
                                    <div style={{margin:"auto",float:"left",width:200}}>
                                        <button onClick={()=>{this.props.onsubmitCertificate(this.state);
                                        this.setState({
                                            Description:'',
                                            University:'',
                                            StartYear:'',
                                            FinshYear:''
                                        })} }
                                         className="btn btn-primary" 
                                         style={{margin:10}}>ADD</button>   
                                        <button  className="btn btn-primary"
                                        style={{margin:10}}
                                        onClick={()=>{document.getElementById("ShowAddCertificateForm").click()}}
                                        >Close</button>
                                    </div>
                                </div>
                                
                                </div>
                            </div>
                            <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th>Certificate Description</th>
                                    <th>University</th>
                                    <th>Start Year</th>
                                    <th>Finish Year</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.CertificateList.map(function(currentCer, i){
                                    console.log('test');
                                    return <tr key={i}>
                                        <td>
                                        <img src={process.env.PUBLIC_URL + '/certificate.png'} style={{width:25,height:25,marginTop:-8,marginRight:5}} /> 

                                            {currentCer.Description}</td>
                                        <td>{currentCer.University}</td>
                                        <td>{currentCer.StartYear}</td>
                                        <td>{currentCer.FinishYear}</td>

                                        </tr>
                                  })
                            }
                                
                            </tbody>
                        </table>

                        </div>
                              
            </div>
            
    );
   }
    
}

class Qualifications extends Component{
    state={
        Description:'',
        Period:'',
        Notes:''    }
    onChangeDescription=(e)=>{
        this.setState({Description:e.target.value});
    }
    onChangePeriod=(e)=>{
        this.setState({Period:e.target.value});      
    }
    onChangeNotes=(e)=>{
        this.setState({Notes:e.target.value});      
    }
    
   render(){
    return(
            <div className="row">
                
            <div className="row" style={{margin:15}}>
                            <h4>Qualification's</h4>
                            <div>
                            <button id="ShowAddQualificationForm"className="btn btn-primary"
                             type="button" data-bs-toggle="collapse" data-bs-target="#AddQualificationForm"
                              aria-expanded="false" aria-controls="AddQualificationForm">
                                Add Qualification
                             </button>
                            </div>
                            
                            <div className="collapse" id="AddQualificationForm">
                            <div className="card card-body">   
                                                            
                                <div className="row mt-3">
                                <div className="col-md-5">
                                        <label >Qualification Name:</label>
                                        <input type="text"
                                         className="form-control" 
                                        value={this.state.Description}
                                        placeholder="Name..."
                                        onChange={this.onChangeDescription}
                                        autoFocus
                                        />    
                                    </div>
                                    <div className="col-md-2">
                                        <label >Period:</label>
                                        <input type="text"
                                         className="form-control" 
                                        value={this.state.Period}
                                        placeholder="Period..."
                                        onChange={this.onChangePeriod}
                                        />    

                                    </div>
                                
                                    <div className="col-md-5">
                                        <label >Notes:</label>
                                        <input type="text"
                                         className="form-control" 
                                        value={this.state.Notes}
                                        placeholder="Notes..."
                                        onChange={this.onChangeNotes}
                                        
                                        />    
                                    </div>
                                </div>
                                <div className="row" style={{margin:15}}>
                                    <div style={{margin:"auto",float:"left",width:200}}>
                                        <button onClick={()=>{this.props.onsubmitQualification(this.state);
                                        this.setState({
                                            Description:'',
                                            Period:'',
                                            Notes:''
                                        })} }
                                         className="btn btn-primary" 
                                         style={{margin:10}}>ADD</button>   
                                        <button  className="btn btn-primary"
                                        style={{margin:10}}
                                        onClick={()=>{document.getElementById("ShowAddQualificationForm").click()}}
                                        >Close</button>
                                    </div>
                                </div>
                                
                                </div>
                            </div>
                            <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th>Qualification Description</th>
                                    <th>Period</th>
                                    <th>Notes</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.QualificationList.map(function(currentQ, i){
                                    console.log('test');
                                    return <tr className="table-primary" key={i}>
                                        <td>
                                            <img src={process.env.PUBLIC_URL + '/qualafication.png'} style={{width:25,height:25,marginTop:-8,marginRight:5}} /> 
                                             {currentQ.Description}
                                            </td>
                                        <td>{currentQ.Period}</td>
                                        <td>{currentQ.Notes}</td>

                                        </tr>
                                  })
                            }
                                
                            </tbody>
                        </table>

                        </div>
                              
            </div>
            
    );
   }
    
}
