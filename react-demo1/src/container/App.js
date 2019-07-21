import React ,{Component}from 'react';
import CommonHeader from '../components/CommonHeader/CommonHeader'
import Persons from '../components/Persons/Persons'
import './App.css';

//有状态组件
class App extends Component{
  constructor(props){
    console.log('[App.js] constructor is running...')
    super(props);
    this.state = {
      person:[
        {id:0,name:'Jerry'},
        {id:1,name:'Lucy'},
        {id:2,name:'Alexxx'}
      ],
      isShow:false
    }
  }

  componentWillMount(){
    console.log('[App.js] componentWillMount is running...')
  }
  componentDidMount(){
    console.log('[App.js] componentDidMount is running...')
  }
  //双向绑定
  changeValue = (event,id)=>{
    //找到当前修改的person的id
    const personIndex = this.state.person.findIndex((per)=>{
      return per.id === id;
    })
    //当前修改的person对象
    const person = this.state.person[personIndex];
    //绑定输入的值
    person.name = event.target.value;
    //重新赋给state里面的person
    const persons = [...this.state.person];
    persons[personIndex] = person;
    this.setState({
      person:persons
    })
  }

  //删除
  deleteIt = (id)=>{
    const persons = [...this.state.person];
    persons.forEach((item,index)=>{
      if(item.id === id){
        persons.splice(index,1);
      }
    })
    this.setState({
      person:persons
    })
  }
  //显示隐藏
  toggleCt = ()=>{
    this.setState({
      isShow:!this.state.isShow
    })
  }

  render(){
    console.log('[App.js] render is running...')

    let person = null;
    if(this.state.isShow){
      person = <div>
        <Persons 
          persons = {this.state.person}
          changeValue = {this.changeValue}
          deleteIt = {this.deleteIt}
        />
      </div>
    }

    return (
      <div className="App">
        <CommonHeader 
          toggleCt = {this.toggleCt}
          persons = {this.state.person}
          isShow = {this.state.isShow}
        />
        {person}
      </div>
    );
  }
}

export default App;
