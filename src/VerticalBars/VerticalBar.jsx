import React from 'react'
import '../App.css'

export default class VerticalBar extends React.Component {
  constructor( props ) {
    super( props );
  }
  render() {
    let classText =
      `vertical-bar
      ${this.props.currentBar ? 'current-bar' : ''}
      ${this.props.currentPartition ? 'partition-bar' : ''}`
    return (
      <div className={classText} style={{height: this.props.heightVal}}></div>
    )
  }
}