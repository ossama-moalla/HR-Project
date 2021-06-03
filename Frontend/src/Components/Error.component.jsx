import React,{Component} from 'react';

export default class Error extends Component{
    render(){
        console.log(this.props)
        return(
            <div classsName="container">
                <h1>Error:</h1>
                <p style={{fontSize:20,color:"red"}}>ErrorMessage:{this.props.location.Message}</p>
            </div>
        );
    }
}