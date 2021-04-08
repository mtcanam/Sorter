import VerticalBar from './VerticalBar.jsx'

export default function VerticalBarContainer( props ) {
  let outArr = props.barState.barObjects.map( ( element, idx ) =>
    <VerticalBar key={idx}
                 heightVal={element.barHeight}
                 currentBar={element.currentBar}
                 currentPartition={element.partitionBar} /> )
  return (
    <div className='bar-container'>
      {outArr}
    </div>
  );
}