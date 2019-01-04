import React, { Component } from 'react'
import ChildComponent from './ChildComponent'
import FatherComponent from './FatherComponent'

export default class Demo extends Component {
  state = {counter: 0}
  render() {
    const childShouldHaveFather = this.state.counter % 2 === 0
    return (
      <div className="demo">
        <button onClick={
          () => this.setState({counter: this.state.counter + 1})
        }>
          Increase Counter ({this.state.counter})
        </button>

        {childShouldHaveFather ? (
          <FatherComponent>
            <ChildComponent/>
          </FatherComponent>
        ) : (
          <ChildComponent/>
        )}
      </div>
    )
  }
}
