import React from 'react'

export default class TestButton extends React.Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    this.props.testSort( this.props.barCount );
  }
  render() {
    return (
      <button className="btn btn-primary" onClick={this.handleClick}>Test</button>
    )
  }

}