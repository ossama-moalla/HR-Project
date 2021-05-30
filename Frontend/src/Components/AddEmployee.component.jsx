import React,{Component} from 'react';
import axios from 'axios';
import './components.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment'
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
          Address:"",
          Report:"",
          EmployeeImage:"",
          CurrencyID:null
    
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
             result=await this.readFile(this.state.ItemImageFile);

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
    
    onChangeItemImageURL =async(event)  => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
         
          this.setState({

            ItemImageTemp: URL.createObjectURL(img),
            ItemImageFile:img
          });
        }
      };
    render(){

        return(
            <form>
                <div className="row " style={{margin:20}}>
                <div className="col-md-8">
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
                            id="inlineRadio1" value="option1" checked/>
                            <label className="form-check-label" for="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions"
                            id="inlineRadio2" value="option2"/>
                            <label className="form-check-label" for="inlineRadio2">Female</label>
                            </div>
                        </div>
                        </div>
                        <div className="col">
                        <label>Material Status:</label>
                            <select className="form-select" >
                               <option selected>Single</option>
                               <option>Married</option>
                               <option>Divorce</option>
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
                <div className="col-md-4">
                        <label>Item Image</label><br/>

                        <img src={this.state.ItemImageTemp} style={{width:400,height:400,display:"block"}} alt=""/>
                        <input type="button" value="Upload Image" onClick={()=>{
                            document.getElementById('image').click()
                        }}></input>
                        
                        <input style={{visibility:"hidden"}} type="file" id="image"
                        name="image" value="" onChange={this.onChangeItemImageURL}></input>
                </div>
                </div>
                <div className="row align-items-center" style={{margin:10}}>
                    <div className="col">
                        <label>Certificate's</label><br/>
                        <table className="table">
                        <thead>
                            <tr>
                                <th>Certificate Description</th>
                                <th>University</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>

                            
                        </tbody>
                    </table>

                    </div>
                    <div className="col">
                        <label>Qualification's</label><br/>
                        <table className="table">
                        <thead>
                            <tr>
                                <th>Qualification Description</th>
                                <th>Period</th>
                                <th>Notes</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            
                        </tbody>
                    </table>
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
            </form>
        );

    }
}

