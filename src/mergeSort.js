export default function mergeSort(arrayToSort){
  //Return the input array if length is 1
  let arrayLength = arrayToSort.length;
  if (arrayLength === 1) {return arrayToSort}

  //Splice the array into halves
  let midPoint = Math.floor(arrayLength / 2)
  let lArray = arrayToSort.slice(0, midPoint)
  let rArray = arrayToSort.slice(midPoint, arrayLength)

  //Recursively call this function on both halves of the array
  lArray = mergeSort(lArray);
  rArray = mergeSort(rArray);

  //Merge the sorted left and right arrays
  let mergedArray = mergeLeftAndRightArrays(lArray, rArray);

  return mergedArray;
}

function mergeLeftAndRightArrays(lArray,rArray){
  let mergedArray = [];
  let lSize = lArray.length;
  let rSize = rArray.length;
  let totalLength = lSize + rSize;

  let i = 0; //Index for left array
  let j = 0; //Index for right array
  let k = 0; //Index for merged array

  //Iterate over each position in the final merged array, adding the
  //lowest value from the left or right array as appropriate.
  for (let k = 0; k < totalLength; k++) {
    if (i >= lSize) {
      mergedArray.push(rArray[j]);
      j++;
    }else if (j >= rSize) {
      mergedArray.push(lArray[i]);
      i++;
    }else{
      if(lArray[i] < rArray[j]){
        mergedArray.push(lArray[i]);
        i++;
      }else{
        mergedArray.push(rArray[j]);
        j++;
      }
    }
  }
  return mergedArray;
}
