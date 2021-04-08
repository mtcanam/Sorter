export default function mergeSort(arrayToSort){
  let animationArray = [];
  let sortedArray = [];
  if (arrayToSort.length < 2) { return [arrayToSort, animationArray] }
  [sortedArray, animationArray] = mergeSortRecursiveCall(arrayToSort, 0, arrayToSort.length, animationArray)
  return [sortedArray, animationArray];
}

function mergeSortRecursiveCall(arrayToSort, leftIndex, rightIndex, animationArray){
  //Return the input array if indices are the same
  let arrayLength = rightIndex - leftIndex;
  if (arrayLength < 2) {return [arrayToSort, animationArray]}

  //Define the splitting point of the array
  let midPoint = Math.floor(arrayLength / 2) + leftIndex;
  //Recursively call this function on both halves of the array
  [arrayToSort, animationArray] = mergeSortRecursiveCall(arrayToSort, leftIndex, midPoint, animationArray);
  [arrayToSort, animationArray] = mergeSortRecursiveCall(arrayToSort, midPoint, rightIndex, animationArray);
  //Merge the sorted left and right arrays
  let sortedArray = [];
  [sortedArray, animationArray] = mergeLeftAndRightArrays(arrayToSort, leftIndex, midPoint, rightIndex, animationArray)
  return [sortedArray, animationArray];
}

function mergeLeftAndRightArrays(arrayToMerge, leftIndex, midPoint, rightIndex, animationArray){
  let mergedArray = arrayToMerge.slice();

  let i = leftIndex; //Index for left array
  let j = midPoint; //Index for right array

  //Iterate over each position in the final merged array, adding the
  //lowest value from the left or right array as appropriate.
  for (let k = leftIndex; k < rightIndex; k++) {
    if (i >= midPoint) {
      mergedArray[k] = arrayToMerge[j];
      animationArray.push([j,k]);
      j++;
    }else if (j >= rightIndex) {
      mergedArray[k] = arrayToMerge[i];
      animationArray.push([i,k]);
      i++;
    }else{
      if(arrayToMerge[i].barHeight < arrayToMerge[j].barHeight){
        mergedArray[k] = arrayToMerge[i];
        animationArray.push([i,k]);
        i++;
      }else{
        mergedArray[k] = arrayToMerge[j];
        animationArray.push([j,k]);
        j++;
      }
    }
  }
  //Signal to end the current animation
  animationArray.push(0);
  return [mergedArray, animationArray];
}
