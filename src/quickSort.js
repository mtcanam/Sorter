export default function quickSort(arrayToSort){
  let sortedArray = [];
  let animationArray = [];
  let pivotIndex;
  if (arrayToSort.length < 2) { return [arrayToSort, animationArray]; }
  pivotIndex = getMedianPivotIndex(arrayToSort, 0, arrayToSort.length - 1, animationArray);
  [sortedArray, animationArray] = quickSortRecursiveCall(arrayToSort, pivotIndex, 0, arrayToSort.length - 1, animationArray);
  return [sortedArray, animationArray];
}

function quickSortRecursiveCall(arrayToSort, pivotIndex, leftIndex, rightIndex, animationArray){
  //Recursion exit condition
  if (rightIndex - leftIndex < 1) { return [arrayToSort, animationArray]}

  //Swap the pivot to the lowest position in the section of array to be sorted
  [arrayToSort, animationArray] = swapBars(arrayToSort, pivotIndex, leftIndex, pivotIndex, animationArray);
  //Then, partition the array
  [arrayToSort, pivotIndex, animationArray] = partitionArray(arrayToSort, leftIndex, rightIndex, animationArray);
  //We now have an array that is partioned with all values lower than the pivotValue
  //to the left, and all larger to the right.
  //Recursively call this on each half.
  const leftPivot = getMedianPivotIndex(arrayToSort,
                                        leftIndex,
                                        pivotIndex - 1);
  const rightPivot = getMedianPivotIndex(arrayToSort,
                                        pivotIndex + 1,
                                        rightIndex);

  [arrayToSort, animationArray] = quickSortRecursiveCall(arrayToSort, leftPivot, leftIndex, pivotIndex - 1, animationArray);
  [arrayToSort, animationArray] = quickSortRecursiveCall(arrayToSort, rightPivot, pivotIndex + 1, rightIndex, animationArray);

  return [arrayToSort, animationArray];
}

function partitionArray(arrayToSort, leftIndex, rightIndex, animationArray){
  //Pivot value is in the left most slot of this array
  const pivotValue = arrayToSort[leftIndex].barHeight;
  //Initialize the pivot index
  let travellingPivotIndex = leftIndex + 1;
  /*
  Iterate over all the values in the segment defined by leftIndex and rightIndex
  If the values are less than the pivotValue, swap the value to the leading edge
  of the lower partition (ie j) and increment the travellingPivotIndex to move
  the boundary.
  */
  for (let i = leftIndex + 1; i <= rightIndex; i++) {
    if (arrayToSort[i].barHeight < pivotValue) {
      [arrayToSort, animationArray] = swapBars(arrayToSort, i, travellingPivotIndex, leftIndex, animationArray);
      travellingPivotIndex++;
    }
  }
  //After looping, insert the pivot to the left of the travellingPivotIndex
  [arrayToSort, animationArray] = swapBars(arrayToSort, leftIndex, travellingPivotIndex - 1, leftIndex, animationArray);

  return [arrayToSort, travellingPivotIndex - 1, animationArray];
}


function getMedianPivotIndex(arrayToSort, leftIndex, rightIndex){
  //Returns the index of the median value of the set of indices:
  //leftIndex, median(leftIndex, rightIndex), rightIndex

  //If the left and right indices are within one index of each other,
  //return the low (though it doesn't matter)
  if (rightIndex - leftIndex < 2) { return leftIndex }

  const medIndex = Math.floor((leftIndex + rightIndex) / 2);

  //Create an array of objects for each index
  const indexObjectArray = [leftIndex, medIndex, rightIndex].map((element) => ({
      index: element,
      value: arrayToSort[element].barHeight
  }))

  //Calculate the lowest and highest values
  const lowestIndexVal = indexObjectArray.reduce((accumulator, element) => (
    Math.min(accumulator, element.value)),
    Infinity);

  const highestIndexVal = indexObjectArray.reduce((accumulator, element) => (
    Math.max(accumulator, element.value)),
    -Infinity);

  //Filter the array to the object that is not the highest or lowest value
  const medObject = indexObjectArray.filter((element) => (
            element.value !== lowestIndexVal &&
            element.value !== highestIndexVal));

  //Return if we have a value (may not if two duplicate values)
  if (medObject.length === 1){return medObject[0].index;}

  //Otherwise, we have at least one duplicate, so just return the low value
  return indexObjectArray[0].index;
}

function swapBars(arrayToSort, indexOne, indexTwo, pivotIndex, animationArray){
  const originalArray = arrayToSort.slice();
  const indexOneValue = originalArray[indexOne];
  const indexTwoValue = originalArray[indexTwo];
  arrayToSort[indexOne] = indexTwoValue;
  arrayToSort[indexTwo] = indexOneValue;
  animationArray.push([indexOne, indexTwo, pivotIndex]);
  return [arrayToSort, animationArray];
}
