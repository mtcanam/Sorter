import VerticalBar from './VerticalBar.jsx'

export default function VerticalBarContainer(props){
  let arr = []
  for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 400))
  }
  let outArr = arr.map((element,idx) => <VerticalBar key={idx} heightVal={element} />)
  return (
    <div className='bar-container'>
      {outArr}
    </div>
  );
}
