import React from 'react'
import VerticalBarContainer from './VerticalBars/VerticalBarContainer.jsx';
import ControlContainer from './ControlBar/ControlContainer.jsx';
import './App.css';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {heightValues: sortArray};
  }



  render(){
    return (
      <div className='app-container'>
        <ControlContainer />
        <VerticalBarContainer />
      </div>
    )
  }
}
