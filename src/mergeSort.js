export default function mergeSort(arrayToSort, leftIndex, rightIndex, updateArray){
  //Return the input array if indices are the same
  let arrayLength = rightIndex - leftIndex;
  if (arrayLength < 2) {return arrayToSort}

  //Define the splitting point of the array
  let midPoint = Math.floor(arrayLength / 2) + leftIndex

  //Recursively call this function on both halves of the array
  arrayToSort = mergeSort(arrayToSort, leftIndex, midPoint, updateArray);
  arrayToSort = mergeSort(arrayToSort, midPoint, rightIndex, updateArray);
  //Merge the sorted left and right arrays
  let sortedArray = mergeLeftAndRightArrays(arrayToSort, leftIndex, midPoint, rightIndex, updateArray)
  return sortedArray;

}

function mergeLeftAndRightArrays(arrayToMerge, leftIndex, midPoint, rightIndex, updateArray){
  let mergedArray = arrayToMerge.slice();

  let i = leftIndex; //Index for left array
  let j = midPoint; //Index for right array

  //Iterate over each position in the final merged array, adding the
  //lowest value from the left or right array as appropriate.
  for (let k = leftIndex; k < rightIndex; k++) {
    if (i >= midPoint) {
      mergedArray[k] = arrayToMerge[j];
      j++;
    }else if (j >= rightIndex) {
      mergedArray[k] = arrayToMerge[i];
      i++;
    }else{
      if(arrayToMerge[i] < arrayToMerge[j]){
        mergedArray[k] = arrayToMerge[i];
        i++;
      }else{
        mergedArray[k] = arrayToMerge[j];
        j++;
      }
    }
    sleep(100).then(() => { updateArray(mergedArray); });
  }

  return mergedArray;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
