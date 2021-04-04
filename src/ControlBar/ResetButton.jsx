import React from 'react'

export default class ResetButton extends React.Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    this.props.resetBars( this.props.barCount );
  }
  render() {
    return (
      <button className="btn btn-primary" onClick={this.handleClick}>Reset</button>
    )
  }

}