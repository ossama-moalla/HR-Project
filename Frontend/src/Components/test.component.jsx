import React,{Component} from 'react';

export default class Test extends Component{
    constructor(props)
    {
        super(props);
        for(var i=1970;i<=2000;i++)
        this.state.YearArray.push(i);
        
        for(var i=1;i<=12;i++)
        this.state.MonthArray.push(i);
        
        
        this.state.DaysCount=(new Date(this.state.selectedYear, this.state.selectedMonth, 0).getDate());
    
    }
    state={
        YearArray:[],
        MonthArray:[],
        selectedYear:1990,
        selectedMonth:1,
        selectedDay:1,
        DaysCount:undefined
    }
    onChangeYear=(e)=>{

        this.setState({
            selectedYear:e.target.value,
            selectedMonth:1,
            selectedDay:1,
            DaysCount:(new Date(e.target.value, 1, 0).getDate())})
    }
    onChangeMonth=(e)=>{
        this.setState({selectedMonth:e.target.value,
        selectedDay:1,
            DaysCount:(new Date(this.state.selectedYear, e.target.value, 0).getDate())})
    }
    onChangeDay=(e)=>{
        this.setState({selectedDay:e.target.value})
    }
    render(){
    let Days=[];

        
    for(var i=1;i<=this.state.DaysCount;i++)
    Days.push(i);
        return(
            <div className="row" style={{width:300}}>
                <div className="col-3" style={{padding:5,width:75}}>
                    <label>Day</label>
                    <select className="form-select" value={this.state.selectedDay}
                     onChange={this.onChangeDay}>
                        {
                                Days.map(day => (
                                <option key={day} value={day}>
                                     {day}
                                </option>
                                ))
                        }
                    </select>                    
                </div>
                <div className="col-3" style={{padding:5,width:75}}>
                    <label>Month</label>
                    <select className="form-select" value={this.state.selectedMonth} onChange={this.onChangeMonth}>
                        {
                                this.state.MonthArray.map(month => (
                                <option key={month} value={month}>
                                     {month}
                                </option>
                                ))
                        }
                    </select>
                    
                </div>
                <div className="col-6"  style={{padding:5,width:110}}>
                            <label>Year</label>
                    <select className="form-select" value={this.state.selectedYear} onChange={this.onChangeYear}>
                        {
                               this.state. YearArray.map(year => (
                                <option key={year} value={year}>
                                     {year}
                                </option>
                                ))
                        }
                    </select>
 
                   
                </div>
            </div>
        )
    }
}