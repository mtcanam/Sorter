export default function bubbleSort(arrayToSort){
  //Basically, just pass over the entire array with a window of size 2
  //If values are out of order, swap them
  let animationArray = [];
  if (arrayToSort.length < 2) { return [arrayToSort, animationArray] }
  let swapCounter = 0;
  do {
    swapCounter = 0;
    for (let i = 0; i < arrayToSort.length - 1; i++){
        if (arrayToSort[i].barHeight > arrayToSort[i+1].barHeight) {
          [arrayToSort, animationArray] = swapBars(arrayToSort, i, i+1, animationArray);
          swapCounter++;
        }
    }
  } while (swapCounter > 0);
  return [arrayToSort, animationArray];
}

function swapBars(arrayToSort, indexOne, indexTwo, animationArray){
  const originalArray = arrayToSort.slice();
  const indexOneValue = originalArray[indexOne];
  const indexTwoValue = originalArray[indexTwo];
  arrayToSort[indexOne] = indexTwoValue;
  arrayToSort[indexTwo] = indexOneValue;
  animationArray.push([indexOne, indexTwo]);
  return [arrayToSort, animationArray];
}
