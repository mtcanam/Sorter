import ResetButton from './ResetButton.jsx';
import SortButton from './SortButton.jsx';
import TestButton from './TestButton.jsx';

export default function ControlContainer( props ) {
  return (
    <div className='control-container'>
      <ResetButton barCount={props.barCount} resetBars={props.resetBars} />
      <SortButton sortBars={props.mergeSort} text='Merge Sort' />
      <SortButton sortBars={props.quickSort} text='Quick Sort' />
      <SortButton sortBars={props.bubbleSort} text='Bubble Sort' />
      <SortButton sortBars={props.heapSort} text='Heap Sort' />
      <TestButton testSort={props.testSort} />
    </div>
  )
}