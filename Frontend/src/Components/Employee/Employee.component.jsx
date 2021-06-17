import React,{Component} from 'react';
import axios from 'axios';
import './../components.css';
import { ChevronBarDown  } from 'bootstrap-icons-react';
import * as moment from 'moment'
import DateInput from './../DateInput.component';


export default class Employee extends Component{
    constructor(props)
    {
        super(props);
        if(this.props.location.state.employee!==undefined)
        {
            const {employee}=this.props.location.state;
            this.state.Method=1;
            this.state.EmployeeID=employee._id;
            this.state.EmployeeName=employee.EmployeeName;
            this.state.Gender=employee.Gender;
            this.state.BirthDate=employee.BirthDate;
            this.state.NationalID=employee.NationalID;
            this.state.MaritalStatus=employee.MaritalStatus;
            this.state.Mobile=employee.Mobile;
            this.state.Phone=employee.Phone;
            this.state.Email=employee.Email;
            this.state.Address=employee.Address;
            this.state.Report=employee.Report;
            this.state.EmployeeImageTemp=employee.EmployeeImage;
            this.state.EmployeeImageFile=undefined;
            this.state.CurrencyID=employee.CurrencyID;
            this.state.CertificateList=employee.CertificateList;
            this.state.QualificationList=employee.QualificationList

        }

    }

    state={
            Method:0,
          EmployeeID:undefined,
          EmployeeName:"",
          Gender:true,
          BirthDate:{Day:1,Month:1,Year:1990},
          NationalID:"",
          MaritalStatus:1,
          Mobile:"",
          Phone:"",
          Email:"",
          Address:"",
          Report:"",
          EmployeeImageTemp:process.env.PUBLIC_URL + '/employee.jpg',
          EmployeeImageFile:undefined,
          CurrencyID:null,
          CertificateList:[],
          QualificationList:[],
          ErrorMessage:undefined
    
    }
    readFile=(e)=>{
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.readAsDataURL(e)
            })
    }
    ShowError()
    {
        if(this.state.ErrorMessage)
        return(
                <div style={{width:500,margin:"auto",marginTop:20}} className="alert alert-danger d-flex align-items-center" role="alert">

                        <div style={{marginLeft:20}}>{this.state.ErrorMessage}</div>
                </div>
        )
        else return(
            <div></div>)
    }
    onsubmit=async(e)=>{
        if(this.state.EmployeeName==='' ||this.state.EmployeeName.length<10)
        {
            this.setState({ErrorMessage:'Employee Name Is Required and Length must be at least 10 chars'});
            return

        }
        this.setState({ErrorMessage:undefined})
        e.preventDefault(); 
        var reader = new FileReader();
        var result=[];
        try
        {
             result=await this.readFile(this.state.EmployeeImageFile);

        }catch{
            result=undefined
        }
        const employee={
          EmployeeID:this.state.EmployeeID,
          EmployeeName:this.state.EmployeeName,
          Gender:this.state.Gender,
          BirthDate:this.state.BirthDate,
          NationalID:this.state.NationalID,
          MaritalStatus:this.state.MaritalStatus,
          Mobile:this.state.Mobile,
          Phone:this.state.Phone,
          Email:this.state.Email,
          Address:this.state.Address,
          Report:this.state.Report,
          EmployeeImage:result,
          CurrencyID:null,
          CertificateList:this.state.CertificateList,
          QualificationList:this.state.QualificationList
    
    }
            
        if(this.state.Method===0){
            await axios.post("http://localhost:5000/employee/add",employee)
            .then(res=>{console.log('Employee Added');
            this.props.history.push({
                pathname: '/',
           })})
            .catch(err=>{
                let Message;
                if(err.response)
                    Message=err.response.data
                else if(err.request)
                    Message='No Response From Server'
                else 
                    Message=err.message
                
                this.setState({ErrorMessage:Message
                })    
            
            }); 
            
        }else{
            await axios.put("http://localhost:5000/employee/edit",employee)
            .then(res=>{console.log('Employee Updated');
            this.props.history.push({
                pathname: '/',
           })})
            .catch(err=>{
                let Message;
                if(err.response)
                    Message=err.response.data
                else if(err.request)
                    Message='No Response From Server'
                else 
                    Message=err.message
                
                this.setState({ErrorMessage:Message
                })
            }); 
            
        }
                   
            
    }
    onChangeEmployeeName=(e)=>{
        this.setState({EmployeeName:e.target.value});
    }
    onChangeGender=async(e)=>{
         this.setState({Gender:Number(e.target.value)===0?false:true});
    }
    onChangeBirthDate=(date)=>{
         this.setState({BirthDate:{
            Year:date.Year,
            Month:date.Month,
            Day:date.Day,

        }});
    }
    onChangeNationalID=(e)=>{
        this.setState({NationalID:e.target.value});
    }
    onChangeMaritalStatus=(e)=>{
        this.setState({MaritalStatus:e.target.value});
    }
    onChangeMobile=(e)=>{
        this.setState({Mobile:e.target.value});
    }
    onChangePhone=(e)=>{
        this.setState({Phone:e.target.value});
    }
    onChangeEmail=(e)=>{
        this.setState({Email:e.target.value});
    }
    onChangeAddress=(e)=>{
        this.setState({Address:e.target.value});
    }
    onChangeReport=(e)=>{
        this.setState({Report:e.target.value});
    }
    onChangeCurrencyID=(e)=>{
        this.setState({CurrencyID:e.target.value});
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
        const style={
            LabelInputheader:{
                backgroundColor :"wheat"

            }
        }
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
                                        value={this.state.EmployeeName}
                                        placeholder="Employee Name..."
                                        onChange={this.onChangeEmployeeName}
                                        autoFocus
                                        />
                                    </div>
                            
                                    <div className="row mt-3">
                                    <div className="col-6 ">
                                            <label style={{padding:0, margin:0}}>Birth Date:</label><br/>
                                            <div className="form-group border border-1 rounded" 
                                            style={{paddingLeft:20,paddingTop:0}}>
                                                <DateInput onChange={this.onChangeBirthDate}
                                                BirthDate={this.state.BirthDate}/>

                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <label className="InputHeader">Gender:</label><br/>
                                            <div className="form-group">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="inlineRadio1" value="1" onChange={this.onChangeGender}
                                                    checked={this.state.Gender}
                                                    />
                                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="inlineRadio2" value="0" onChange={this.onChangeGender}
                                                    checked={!this.state.Gender}
                                                    />
                                                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <label>Material Status:</label>
                                            <select className="form-select" onChange={this.onChangeMaritalStatus} >
                                            <option value="1">Single</option>
                                            <option value="2">Married</option>
                                            <option value="3">Divorced</option>
                                            <option value="4">Widower</option>

                                            </select>
                                        </div>
                                        
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col" >
                                            <label >National ID:</label>
                                            <input type="text"
                                            required className="form-control" 
                                            value={this.state.NationalID}
                                            placeholder="National ID..."
                                            onChange={this.onChangeNationalID}

                                            />
                                        </div>
                                        <div className="col">
                                            <label>Mobile:</label><br/>
                                            <input type="text"
                                            required className="form-control" 
                                            value={this.state.Mobile}
                                            placeholder="Mobile..."
                                            onChange={this.onChangeMobile}
                                            
                                            />
                                        </div>
                                    <div className="col">
                                        <label>Phone:</label>
                                        <input type="text"
                                        required className="form-control" 
                                        value={this.state.Phone}
                                        placeholder="Phone..."
                                        onChange={this.onChangePhone}
                                        
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label >Email:</label>
                                        <input type="text"
                                        required className="form-control" 
                                        value={this.state.Email}
                                        placeholder="Email..."
                                        onChange={this.onChangeEmail}
                                        
                                        />    

                                    </div>
                                    <div className="col">
                                        <label >Address:</label>
                                        <input type="text"
                                        required className="form-control" 
                                        value={this.state.Address}
                                        placeholder="Address..."
                                        onChange={this.onChangeAddress}
                                        
                                        />    

                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <label >Report:</label>

                                    <input type="text"
                                    required className="form-control" 
                                    value={this.state.Report}
                                    placeholder="Report..."
                                    onChange={this.onChangeReport}
                                    
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
                {
                    this.ShowError()
                }
                <div className="row" style={{margin:10}}>
                    <div style={{margin:"auto",float:"left",width:250}}>
                        <div>
                            <button onClick={this.onsubmit}  value="Save " className="btn btn-primary" 
                            style={{margin:5,width:100,height:50}}> Save </button>
                            <button style={{margin:5,width:100,height:50}} className="btn btn-primary" onClick={()=>{this.props.history.push({
                                    pathname: '/'
                                })}}>Back</button>
                        </div>        
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
