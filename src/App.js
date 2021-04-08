import React from 'react'
import VerticalBarContainer from './VerticalBars/VerticalBarContainer.jsx';
import ControlContainer from './ControlBar/ControlContainer.jsx';
import mergeSort from './mergeSort.js'
import quickSort from './quickSort.js'
import bubbleSort from './bubbleSort.js'
import heapSort from './heapSort.js'
import './App.css';

const BAR_COUNT = 250;
const REFRESH_RATE = 20;
const TEST_ARRAY_COUNT = 100;
const TEST_ARRAY_MAX_LENGTH = 1000;
const TEST_ARRAY_VALUE_MAX = 15000;

export default class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      barObjects: []
    };
    this.resetBars = this.resetBars.bind( this );
    this.mergeSortWrapper = this.mergeSortWrapper.bind( this );
    this.quickSortWrapper = this.quickSortWrapper.bind( this );
    this.bubbleSortWrapper = this.bubbleSortWrapper.bind( this );
    this.heapSortWrapper = this.heapSortWrapper.bind( this );
    this.animateMergeSort = this.animateMergeSort.bind( this );
    this.animateQuickSort = this.animateQuickSort.bind( this );
    this.animateBubbleSort = this.animateBubbleSort.bind( this );
    this.animateHeapSort = this.animateHeapSort.bind( this );
    this.testSort = this.testSort.bind( this );
  }

  componentDidMount() {
    this.resetBars( BAR_COUNT );
  }

  resetBars( barCount ) {
    let arr = []
    for ( let i = 0; i < barCount; i++ ) {
      arr.push( {
        barHeight: Math.floor( 900 * Math.random() + 100 ),
        currentBar: false,
        partitionBar: false
      } );
    }
    this.setState( ( state, props ) => ( {
      barObjects: arr
    } ) );
  }

  mergeSortWrapper() {
    let sortedArray = [];
    let animationArray = [];

    [ sortedArray, animationArray ] = mergeSort( this.state.barObjects
      .slice() );
    this.animateMergeSort( this.state.barObjects, animationArray );
  }

  quickSortWrapper() {
    let sortedArray = [];
    let animationArray = [];
    [ sortedArray, animationArray ] = quickSort( this.state.barObjects
      .slice() );
    this.animateQuickSort( this.state.barObjects, animationArray );
  }

  bubbleSortWrapper() {
    let sortedArray = [];
    let animationArray = [];
    [ sortedArray, animationArray ] = bubbleSort( this.state.barObjects
      .slice() );
    this.animateBubbleSort( this.state.barObjects, animationArray );
  }

  heapSortWrapper() {
    let sortedArray = [];
    let animationArray = [];
    [ sortedArray, animationArray ] = heapSort( this.state.barObjects
      .slice() );
    this.animateHeapSort( this.state.barObjects, animationArray );
  }

  testSort() {
    //Populate testing array
    const arrayToSort = [ TEST_ARRAY_COUNT ];
    for ( let i = 0; i < TEST_ARRAY_COUNT; i++ ) {
      let testArrayLength = Math.floor( Math.random() *
        TEST_ARRAY_MAX_LENGTH + 1 )
      arrayToSort[ i ] = [];
      for ( let j = 0; j < testArrayLength; j++ ) {
        arrayToSort[ i ].push( {
          barHeight: Math.floor( Math.random() *
            TEST_ARRAY_VALUE_MAX )
        } );
      }
    }

    //Run the sorting algorithms on the arrays
    for ( let i = 0; i < arrayToSort.length; i++ ) {
      const [ mergeSortedArray, ] = mergeSort( arrayToSort[ i ] );
      const [ quickSortedArray, ] = quickSort( arrayToSort[ i ] );
      const [ bubbleSortedArray, ] = bubbleSort( arrayToSort[ i ] );
      const [ heapSortedArray, ] = heapSort( arrayToSort[ i ] );
      const jsSortedArray = arrayToSort[ i ].sort( ( a, b ) => a.barHeight -
        b
        .barHeight );

      if ( this.arraysEqual( mergeSortedArray, jsSortedArray ) ) {
        console.log( "Merge Sort Working Properly" );
      } else {
        console.log( "Merge Sort Failed" );
        console.log( arrayToSort[ i ] );
        console.log( mergeSortedArray );
      }
      if ( this.arraysEqual( quickSortedArray, jsSortedArray ) ) {
        console.log( "Quick Sort Working Properly" );
      } else {
        console.log( 'Quick Sort Failed' );
        console.log( arrayToSort[ i ] );
        console.log( mergeSortedArray );
      }
      if ( this.arraysEqual( bubbleSortedArray, jsSortedArray ) ) {
        console.log( "Bubble Sort Working Properly" );
      } else {
        console.log( 'Bubble Sort Failed' );
        console.log( arrayToSort[ i ] );
        console.log( mergeSortedArray );
      }
      if ( this.arraysEqual( heapSortedArray, jsSortedArray ) ) {
        console.log( "Heap Sort Working Properly" );
      } else {
        console.log( 'Heap Sort Failed' );
        console.log( arrayToSort[ i ] );
        console.log( mergeSortedArray );
      }
    }
  }

  arraysEqual( a, b ) {
    if ( a === b ) return true;
    if ( a == null || b == null ) return false;
    if ( a.length !== b.length ) return false;

    for ( var i = 0; i < a.length; ++i ) {
      if ( a[ i ].barHeight !== b[ i ].barHeight ) {
        return false
      }

    }
    return true;
  }

  animateMergeSort( unsortedArray, animationArray ) {
    //let originalArray = unsortedArray.slice();
    let tempArray = unsortedArray.slice();
    let skippedSteps = 0;
    let cache = [];

    for ( let i = 0; i < animationArray.length; i++ ) {
      //Read current operation from animation array
      let opArray = animationArray[ i ];
      //If we have a 0, then the particular merge is done,
      //and we can use the created array as the new baseline
      if ( opArray === 0 ) {
        //originalArray = tempArray.slice();
        continue;
      }
      let locationOne = opArray[ 0 ];
      let locationTwo = opArray[ 1 ];
      //If the operation results in no change, skip this index
      if ( locationOne < locationTwo ) {
        skippedSteps++;
        continue;
      }
      //If we are past the first animation, unhighlight the bar that was
      //highlighted in the previous step
      if ( cache.length > 0 ) {
        tempArray = this.undoLastAnimation( tempArray, cache )
          .slice()
      }
      [ tempArray, cache ] = this.processAnimation( 'insert', tempArray,
        locationOne, locationTwo )
      let newArray = tempArray.slice();
      //Set the state every 20ms (delaying a further 20ms each successful step)
      setTimeout( () => (
        this.setState( {
          barObjects: newArray
        } ) ), REFRESH_RATE * ( i - skippedSteps ) )
    }
  }

  animateQuickSort( unsortedArray, animationArray ) {
    let originalArray = unsortedArray.slice();
    let skippedSteps = 0;
    let cache = [];

    for ( let i = 0; i < animationArray.length; i++ ) {

      let opArray = animationArray[ i ];
      let locationOne = opArray[ 0 ];
      let locationTwo = opArray[ 1 ];
      let pivotIndex = opArray[ 2 ];

      //If the operation results in no change, skip this index
      if ( locationOne === locationTwo ) {
        skippedSteps++;
        continue;
      }

      //Unhighlight current and pivots from last iteration
      if ( cache.length > 0 ) {
        originalArray = this.undoLastAnimation( originalArray, cache )
          .slice()
      }

      [ originalArray, cache ] = this.processAnimation( 'swap with pivot',
        originalArray, locationOne, locationTwo, pivotIndex )

      let newArray = originalArray.slice();
      //Set the state every 20ms (delaying a further 20ms each successful step)
      setTimeout( () => (
        this.setState( {
          barObjects: newArray
        } ) ), REFRESH_RATE * ( i - skippedSteps ) )
    }

  }

  animateBubbleSort( unsortedArray, animationArray ) {
    let originalArray = unsortedArray.slice();
    let skippedSteps = 0;
    let cache = [];

    for ( let i = 0; i < animationArray.length; i++ ) {

      let opArray = animationArray[ i ];
      let locationOne = opArray[ 0 ];
      let locationTwo = opArray[ 1 ];

      //If the operation results in no change, skip this index
      if ( locationOne === locationTwo ) {
        skippedSteps++;
        continue;
      }

      //Unhighlight current and pivots from last iteration
      if ( cache.length > 0 ) {
        originalArray = this.undoLastAnimation( originalArray, cache )
          .slice()
      }

      [ originalArray, cache ] = this.processAnimation( 'swap',
        originalArray, locationOne, locationTwo )

      let newArray = originalArray.slice();
      //Set the state every 20ms (delaying a further 20ms each successful step)
      setTimeout( () => (
        this.setState( {
          barObjects: newArray
        } ) ), REFRESH_RATE * ( i - skippedSteps ) )
    }

  }

  animateHeapSort( unsortedArray, animationArray ) {
    let originalArray = unsortedArray.slice();
    let skippedSteps = 0;
    let cache = [];

    for ( let i = 0; i < animationArray.length; i++ ) {

      let opArray = animationArray[ i ];
      let locationOne = opArray[ 0 ];
      let locationTwo = opArray[ 1 ];

      //If the operation results in no change, skip this index
      if ( locationOne === locationTwo ) {
        skippedSteps++;
        continue;
      }

      //Unhighlight current and pivots from last iteration
      if ( cache.length > 0 ) {
        originalArray = this.undoLastAnimation( originalArray, cache )
          .slice()
      }

      [ originalArray, cache ] = this.processAnimation( 'swap',
        originalArray, locationOne, locationTwo )

      let newArray = originalArray.slice();
      //Set the state every 20ms (delaying a further 20ms each successful step)
      setTimeout( () => (
        this.setState( {
          barObjects: newArray
        } ) ), REFRESH_RATE * ( i - skippedSteps ) )
    }

  }

  processAnimation( animType, arrayToAnim, indexOne, indexTwo, pivotIndex ) {
    if ( animType === 'insert' ) {
      //By convention, take the value at index one, and insert at index two
      let barToMove = JSON.parse(
        JSON.stringify( arrayToAnim[ indexOne ] )
      );
      barToMove.currentBar = true;
      arrayToAnim.splice( indexOne, 1 );
      arrayToAnim.splice( indexTwo, 0, barToMove );
      let cache = [ animType, indexOne, indexTwo, barToMove ];
      return [ arrayToAnim, cache ];
    }
    if ( animType === 'swap with pivot' ) {
      //Take values at index one and two, and exchange, making both current
      //Set the pivot index
      //Special case is when we have indexOne === pivotIndex, which is where
      //the pivot is being moved to/from the start of the partition
      let barOne = JSON.parse(
        JSON.stringify( arrayToAnim[ indexOne ] )
      );
      let barTwo = JSON.parse(
        JSON.stringify( arrayToAnim[ indexTwo ] )
      );
      let barPivot = JSON.parse(
        JSON.stringify( arrayToAnim[ pivotIndex ] )
      );
      barOne.currentBar = true;
      barTwo.currentBar = true;
      barPivot.partitionBar = true;
      arrayToAnim[ indexOne ] = barTwo;
      arrayToAnim[ indexTwo ] = barOne;
      if ( indexOne !== pivotIndex ) {
        arrayToAnim[ pivotIndex ] = barPivot;
      }
      let cache = [ animType, indexOne, indexTwo, barOne, barTwo,
        pivotIndex, barPivot
      ];
      return [ arrayToAnim, cache ];
    }
    if ( animType === 'swap' ) {
      //Take values at index one and two, and exchange, making both current
      let barOne = JSON.parse(
        JSON.stringify( arrayToAnim[ indexOne ] )
      );
      let barTwo = JSON.parse(
        JSON.stringify( arrayToAnim[ indexTwo ] )
      );
      barOne.currentBar = true;
      barTwo.currentBar = true;
      arrayToAnim[ indexOne ] = barTwo;
      arrayToAnim[ indexTwo ] = barOne;
      let cache = [ animType, indexOne, indexTwo, barOne, barTwo, ];
      return [ arrayToAnim, cache ];
    }
  }

  undoLastAnimation( arrayToAnim, cache ) {
    const animType = cache[ 0 ];
    if ( animType === 'insert' ) {
      let [ , indexOne, indexTwo, barOne ] = cache;
      barOne = JSON.parse( JSON.stringify( barOne ) );
      barOne.currentBar = false;
      arrayToAnim[ indexTwo ] = barOne;
      return arrayToAnim;
    }
    if ( animType === 'swap with pivot' ) {
      let [ , indexOne, indexTwo, barOne, barTwo, pivotIndex, barPivot ] =
      cache;
      barOne = JSON.parse( JSON.stringify( barOne ) );
      barTwo = JSON.parse( JSON.stringify( barTwo ) );
      barPivot = JSON.parse( JSON.stringify( barPivot ) );
      barOne.currentBar = false;
      barTwo.currentBar = false;
      barPivot.partitionBar = false;
      arrayToAnim[ indexOne ] = barTwo;
      arrayToAnim[ indexTwo ] = barOne;
      if ( indexOne !== pivotIndex ) {
        arrayToAnim[ pivotIndex ] = barPivot;
      }
      return arrayToAnim;
    }
    if ( animType === 'swap' ) {
      let [ , indexOne, indexTwo, barOne, barTwo ] =
      cache;
      barOne = JSON.parse( JSON.stringify( barOne ) );
      barTwo = JSON.parse( JSON.stringify( barTwo ) );
      barOne.currentBar = false;
      barTwo.currentBar = false;
      arrayToAnim[ indexOne ] = barTwo;
      arrayToAnim[ indexTwo ] = barOne;
      return arrayToAnim;
    }
  }

  render() {
    return (
      <div className='app-container'>
        <ControlContainer barCount={BAR_COUNT}
                          resetBars={this.resetBars}
                          mergeSort={this.mergeSortWrapper}
                          quickSort={this.quickSortWrapper}
                          bubbleSort={this.bubbleSortWrapper}
                          heapSort={this.heapSortWrapper}
                          testSort={this.testSort} />
        <VerticalBarContainer barState={this.state} />
      </div>
    )
  }
}