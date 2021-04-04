import VerticalBar from './VerticalBar.jsx'

export default function VerticalBarContainer( props ) {
  let outArr = props.barHeights.map( ( element, idx ) =>
    <VerticalBar key={idx} heightVal={element} /> )
  return (
    <div className='bar-container'>
      {outArr}
    </div>
  );
}