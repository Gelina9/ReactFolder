import React from 'react'
import './CommonHeader.css';

const commonHeader =  props=>{
    const btnStyle = {
      padding:10,
      color:'#fff',
      backgroundColor:'#449933',
      outline:'none'
    }
    let titleStyle = [];
    if(props.persons.length<=2){
      titleStyle.push('fontC');
    }
    if(props.persons.length<=1){
      titleStyle.push('fontC','fontW');
    }
    if(props.isShow){
        btnStyle.backgroundColor = '#dd6677'
    }
    return (
        <div>
            <h1 className = {titleStyle.join(" ")}>Hello React!</h1>
            <button style = {btnStyle} onClick = {props.toggleCt}>点击显示/隐藏</button>
        </div>
    )
}
export default commonHeader