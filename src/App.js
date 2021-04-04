import React from 'react'
import VerticalBarContainer from './VerticalBars/VerticalBarContainer.jsx';
import ControlContainer from './ControlBar/ControlContainer.jsx';
import mergeSort from './mergeSort.js'
import './App.css';

const BAR_COUNT = 1000;

export default class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      heightValues: []
    };
    this.resetBars = this.resetBars.bind( this );
    this.sortBars = this.sortBars.bind( this );
    this.updateArray = this.updateArray.bind( this );
  }

  componentDidMount() {
    this.resetBars( BAR_COUNT );
  }

  updateArray( newArray, currentBar, leftSorted, rightSorted ) {
    this.setState( ( state, props ) => ( {
      heightValues: newArray
    } ) )
    return null;
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
    let sortedArray = mergeSort( this.state.heightValues, 0, this.state
      .heightValues.length, this.updateArray );

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