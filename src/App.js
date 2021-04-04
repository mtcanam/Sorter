import React from 'react'
import VerticalBarContainer from './VerticalBars/VerticalBarContainer.jsx';
import ControlContainer from './ControlBar/ControlContainer.jsx';
import mergeSort from './mergeSort.js'
import './App.css';

const BAR_COUNT = 100;

export default class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      heightValues: []
    };
    this.resetBars = this.resetBars.bind( this );
    this.sortBars = this.sortBars.bind( this );
  }

  componentDidMount() {
    this.resetBars( BAR_COUNT );
  }

  resetBars( barCount ) {
    let arr = []
    for ( let i = 0; i < barCount; i++ ) {
      arr.push( Math.floor( Math.random() * 800 ) )
    }
    this.setState( ( state, props ) => ( {
      heightValues: arr
    } ) );
  }

  sortBars() {
    let sortedArray = mergeSort( this.state.heightValues );
    this.setState( ( state, props ) => ( {
      heightValues: sortedArray
    } ) )
  }

  render() {
    return (
      <div className='app-container'>
        <ControlContainer barCount={BAR_COUNT} resetBars={this.resetBars} sortBars={this.sortBars} />
        <VerticalBarContainer barHeights={this.state.heightValues}/>
      </div>
    )
  }
}