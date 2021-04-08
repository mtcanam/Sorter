import React from 'react'

export default class SortButton extends React.Component {
  constructor( props ) {
    super( props );
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    this.props.sortBars();
  }
  render() {
    return (
      <button className="btn btn-primary" onClick={this.handleClick}>{this.props.text}</button>
    )
  }

}
