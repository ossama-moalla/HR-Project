import React,{Component} from 'react';

export default class DateInput extends Component{
    constructor(props)
    {
        super(props);
        for(var i=1970;i<=(new Date().getFullYear());i++)
        this.state.YearArray.push(i);
        
        for(var i=1;i<=12;i++)
        this.state.MonthArray.push(i);
        const {BirthDate}=this.props;
        if(BirthDate!==undefined)
        {
            this.state.selectedYear=BirthDate.Year;
            this.state.selectedMonth=BirthDate.Month;
            this.state.selectedDay=BirthDate.Day;

        }

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
    onChangeYear=async(e)=>{
        const dayscount=(new Date(Number(e.target.value),this.state.selectedMonth, 0).getDate());

        await this.setState({
            selectedYear:Number(e.target.value),
            selectedMonth:this.state.selectedMonth,
            selectedDay:this.state.selectedDay>dayscount?dayscount:this.state.selectedDay,
            DaysCount:dayscount
        })
            
            this.props.onChange({
                Year:this.state.selectedYear,
                Month:this.state.selectedMonth,
                Day:this.state.selectedDay,

            })
    }
    onChangeMonth=async(e)=>{
        const dayscount=(new Date(this.state.selectedYear, Number(e.target.value), 0).getDate());

        await this.setState({
            selectedMonth:Number(e.target.value),
            selectedDay:this.state.selectedDay>dayscount?dayscount:this.state.selectedDay,
            DaysCount:dayscount
            })
            this.props.onChange({
                Year:this.state.selectedYear,
                Month:this.state.selectedMonth,
                Day:this.state.selectedDay,

            })
    }
    onChangeDay=async(e)=>{
        await this.setState({selectedDay:Number(e.target.value)})
        this.props.onChange({
            Year:this.state.selectedYear,
            Month:this.state.selectedMonth,
            Day:this.state.selectedDay,

        })
    }
    render(){
        const labelstyle={margin:3}

    let Days=[];

        
    for(var i=1;i<=this.state.DaysCount;i++)
    Days.push(i);
        return(
            
            <div className="row" style={{width:260}}>
                <div className="col-6" style={{padding:0,width:90}} >
                    <div class="d-inline-flex mt-2" >
                        <div class="mr-2">
                            <label for="from_year"
                             style={{backgroundColor:"white",paddingTop:2, height:35}}>
                                 Year:</label>
                        </div>
                        <div>
                            <select  name="from_year" class="form-control form-control-sm" id="from_year"
                               onChange={this.onChangeYear} value={this.state.selectedYear}>
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
                </div>
                <div className="col-3" style={{padding:0,width:85,marginLeft:5}}>
                    <div class="d-inline-flex mt-2">
                        <div class="mr-2">
                            <label 
                            style={{backgroundColor:"white",paddingTop:2, height:35}} for="from_month">Month:</label>
                        </div>
                        <div>
                            <select name="from_month" class="form-control form-control-sm" id="from_month"
                                onChange={this.onChangeMonth} value={this.state.selectedMonth}>                     
                                    {
                                    this.state.MonthArray.map(month => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                    ))
                                    }
                            </select>
                        </div>
                    </div>                    
                </div>
                
                <div className="col-3" style={{padding:0,margin:0,width:70,marginLeft:5}}>
                    <div class="d-inline-flex mt-2">
                        <div class="mr-2">
                            <label
                            style={{backgroundColor:"white",paddingTop:2, height:35}}
                             for="from_day">Day:</label>
                        </div>
                        <div>
                            <select name="from_day" class="form-control form-control-sm" id="from_day"
                                onChange={this.onChangeDay} value={this.state.selectedDay}>          
                                {
                                    Days.map(day => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>                    
                </div>
            </div>
        )
    }
}