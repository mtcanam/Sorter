import React from 'react'
import '../App.css'

export default class VerticalBar extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className='vertical-bar' style={{height: this.props.heightVal}}></div>
    )
  }
}
