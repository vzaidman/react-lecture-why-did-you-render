import React, { Component } from 'react'
import ChildComponent from './ChildComponent'
import FatherComponent from './FatherComponent'

export default class Demo extends Component {
  state = {counter: 0}
  render() {
    return (
      <div className="demo">
        <button onClick={
          () => this.setState({counter: this.state.counter + 1})
        }>
          Increase Counter ({this.state.counter})
        </button>

        <FatherComponent>
          <ChildComponent/>
        </FatherComponent>
      </div>
    )
  }
}
