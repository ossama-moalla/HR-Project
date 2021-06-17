import React,{Component} from 'react';
import axios from 'axios';
import { Mongoose } from 'mongoose';

class Part extends Component{
    constructor(props)
    {

        super(props);

       if(this.props.location.ParentPart)
       {
           const {Part}=this.props.location.ParentPart;
           this.state.ParentPart=Part;
        this.state.ParentPartID=
        (Part===undefined?undefined:Part._id);
    
       }
       if(this.props.location.ExistsPart)
        {

            const {Part}=this.props.location.ExistsPart;
            this.state.Method=1;
            this.state.PartID=Part._id;
            this.state.PartName=Part.PartName;
            this.state.Description=Part.Description;
            this.state.ParentPartID=Part.ParentPartID;
        }
    }
    state={
        Method:0,
        PartID:null,
        PartName:'',
        Description:'',
        ParentPartID:null,
        ParentPart:null
    }
    
    onsubmit=async(e)=>{
        e.preventDefault();
        const part={
            PartID:this.state.PartID,
            PartName:this.state.PartName,
            Description:this.state.Description,
            ParentPartID: this.state.ParentPartID
        }
        if(this.state.Method===0)
        {
            await axios.post("http://localhost:5000/part/add/",part)
            .then(res=>{
                console.log('part added');
                this.props.history.push({
                    pathname: '/',
                    state: { CurrentPart: this.state.ParentPart ,SelectedTab:1}      
                })
            })
            .catch(err=>console.log('Client:part add error:'+err.response.data)); 
           
        }
        else{
            await axios.put("http://localhost:5000/part/update/",part)
        .then(res=>{
            console.log('part updated');
            this.props.history.push({
                pathname: '/',
                state: { CurrentPart: this.state.ParentPart ,SelectedTab:1}      
            })
        })
        .catch(err=>console.log('Client:part add error:'+err.response.data)); 
       
        }
        
    }
    onChangePartName=(e)=>{
        this.setState({PartName:e.target.value});
    }
    onChangeDescription=(e)=>{
        this.setState({Description:e.target.value});
    }
    render(){

        return(
            
            <form onSubmit={this.onsubmit}>
                {
                    (this.state.Method===0?
                        (<div className="form-group" >
                        <h2>Add New Part to 
                            [{this.state.ParentPart===undefined?"Root":this.state.ParentPart.PartName}]
                        </h2>       
                    </div>
                    ):(<div className="form-group" >
                    <h2>Update  Part : 
                        [{this.props.location.ExistsPart.Part.PartName}]
                    </h2>       
                </div>
                ))
                    
                }
                <div className="form-group" >
                    <label>Part Name</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.PartName}
                     onChange={this.onChangePartName}
                     />
                </div>
                <div className="form-group" >
                    <label>Description</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.Description}
                     onChange={this.onChangeDescription}
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

export default Part;