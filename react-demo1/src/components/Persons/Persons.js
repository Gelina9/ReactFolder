import React , { Component }from 'react'
import Person from './Person/Person'

//有状态组件
class Persons extends Component{
    constructor(props){
        console.log('[Persons.js] constructor is running...')
        super(props);
      }
    componentWillMount(){
        console.log('[Persons.js] componentWillMount is running...')
    }
    componentDidMount(){
        console.log('[Persons.js] componentDidMount is running...')
    }
    componentWillReceiveProps(nextProps){
        console.log('[Persons.js] componentWillReceiveProps is run...');
        console.log(nextProps)
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('[Persons.js] shouldComponentUpdate is run...');
        console.log(nextProps,nextState)
        return nextProps.persons !== this.props.persons;
    }
    componentWillUpdate(nextProps,nextState){
        console.log('[Persons.js] componentWillUpdate is run...');
        console.log(nextProps,nextState)
    }
    componentDidUpdate(prevProps,prevState){
        console.log('[Persons.js] componentDidUpdate is run...');
        console.log(prevProps,prevState)
    }
    render(){
        console.log('[Persons.js] render is running...')
        return this.props.persons.map((per)=>{
            return <Person
                key = {per.id}
                name = {per.name}
                changeValue = {(event)=>{this.props.changeValue(event,per.id)}}
                deleteIt = {()=>{this.props.deleteIt(per.id)}}
            />
        })
    }
}
export default Persons