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
      barObjects: []
    };
    this.resetBars = this.resetBars.bind( this );
    this.sortBars = this.sortBars.bind( this );
    this.animateSorting = this.animateSorting.bind( this );
  }

  componentDidMount() {
    this.resetBars( BAR_COUNT );
  }

  resetBars( barCount ) {
    let arr = []
    for ( let i = 0; i < barCount; i++ ) {
      arr.push( {
        barHeight: Math.floor( Math.random() * 800 ),
        currentBar: false,
        activeRange: false
      } );
    }
    this.setState( ( state, props ) => ( {
      barObjects: arr
    } ) );
  }

  sortBars() {
    let sortedArray = [];
    let animationArray = [];
    [ sortedArray, animationArray ] = mergeSort( this.state
      .barObjects, 0,
      this.state.barObjects.length, [] );
    this.animateSorting( this.state.barObjects, animationArray );
  }

  animateSorting( unsortedArray, animationArray ) {
    let originalArray = unsortedArray.slice();
    const tempArray = unsortedArray.slice();
    for ( let i = 0; i < animationArray.length; i++ ) {

      //Current operation
      let opArray = animationArray[ i ];
      if ( opArray === 0 ) {
        originalArray = tempArray.slice();
      }
      //Bar to take for original array
      let barOne = originalArray[ opArray[ 0 ] ];
      //Location to place it
      let newLoc = opArray[ 1 ];
      tempArray[ newLoc ] = barOne;
      let out = tempArray.slice();
      setTimeout( () => (
        this.setState( {
          barObjects: out
        } ) ), 20 * i )
    }
  }

  render() {
    return (
      <div className='app-container'>
        <ControlContainer barCount={BAR_COUNT} resetBars={this.resetBars} sortBars={this.sortBars} />
        <VerticalBarContainer barState={this.state} />
      </div>
    )
  }
}