export default function heapSort( arrayToSort ) {

  let animationArray = [];

  if ( arrayToSort.length < 2 ) {
    return [ arrayToSort, animationArray ]
  }
  const arrayLength = arrayToSort.length;

  //Iterate over all nodes save for the leaves (any index past n/2-1 is a leaf)
  //Start at the deepest nodes, work shallower, allowing the recursion to fix
  for ( let i = Math.floor( arrayLength / 2 ) - 1; i >= 0; i-- ) {
    [ arrayToSort, animationArray ] = heapSortRecursiveCall( arrayToSort, i,
      arrayLength, animationArray );
  }

  //Pick off the roots one by one, and re-heapify remainder
  for ( let i = arrayLength - 1; i > 0; i-- ) {
    let prevRoot = arrayToSort[ 0 ];
    //Swap root with one of the leaves at the end of the array;
    [ arrayToSort, animationArray ] = swapBars( arrayToSort, 0, i,
      animationArray );
    //Re-heapify the remaining array
    [ arrayToSort, animationArray ] = heapSortRecursiveCall( arrayToSort, 0, i,
      animationArray );
  }

  return [ arrayToSort, animationArray ];
}

function heapSortRecursiveCall( arrayToSort, rootIndex, arrayLength,
  animationArray ) {
  //Assume the array is a binary tree that, for every index i
  //Has left child in index 2 * i + 1
  //Has right child in index 2 * i + 2
  //If these indices are out of bounds, child does not exist

  //Assume value at root is the smallest
  let smallestIndex = rootIndex;

  //Get value of left and right children
  const leftIndex = 2 * rootIndex + 1;
  const rightIndex = 2 * rootIndex + 2;

  //Compare the root and left child and save the smaller
  if ( ( leftIndex < arrayLength ) && ( arrayToSort[ leftIndex ].barHeight >
      arrayToSort[ smallestIndex ].barHeight ) ) {
    smallestIndex = leftIndex;
  }
  //Compare the smaller of root and left with right and save the smaller
  if ( ( rightIndex < arrayLength ) && ( arrayToSort[ rightIndex ].barHeight >
      arrayToSort[ smallestIndex ].barHeight ) ) {
    smallestIndex = rightIndex;
  }
  //Check to see if we are changing anything. If so, cascade down changed branch
  if ( smallestIndex !== rootIndex ) {
    [ arrayToSort, animationArray ] = swapBars( arrayToSort, rootIndex,
      smallestIndex, animationArray );
    [ arrayToSort, animationArray ] = heapSortRecursiveCall( arrayToSort,
      smallestIndex, arrayLength, animationArray );
  }

  return [ arrayToSort, animationArray ];
}

function swapBars( arrayToSort, indexOne, indexTwo, animationArray ) {
  const originalArray = arrayToSort.slice();
  const indexOneValue = originalArray[ indexOne ];
  const indexTwoValue = originalArray[ indexTwo ];
  arrayToSort[ indexOne ] = indexTwoValue;
  arrayToSort[ indexTwo ] = indexOneValue;
  animationArray.push( [ indexOne, indexTwo ] );
  return [ arrayToSort, animationArray ];
}