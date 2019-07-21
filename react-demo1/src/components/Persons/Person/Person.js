import React ,{Component} from 'react'
import './Person.css'

//有状态组件
class Person extends Component{
    constructor(props){
        console.log('[Person.js] constructor is running...')
        super(props);
      }
    componentWillMount(){
        console.log('[Person.js] componentWillMount is running...')
    }
    componentDidMount(){
        console.log('[Person.js] componentDidMount is running...')
    }
    render(){
        console.log('[Person.js] render is running...')
        var stopFn = (event)=>{
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        }
        return(
            <div onClick = {this.props.deleteIt} className = "Personbox">
                <h3>我的名字叫{this.props.name}</h3>
                <input type = "text" defaultValue = {this.props.name} onClick={(event)=>stopFn(event)} onChange={this.props.changeValue}/>
            </div>
        )
    }
}
export default Person