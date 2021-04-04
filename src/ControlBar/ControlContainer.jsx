import ResetButton from './ResetButton.jsx';
import SortButton from './SortButton.jsx';

export default function ControlContainer( props ) {
  return (
    <div className='control-container'>
      <ResetButton barCount={props.barCount} resetBars={props.resetBars} />
      <SortButton sortBars={props.sortBars} />
    </div>
  )
}