import React, {Component} from 'react'
import {times} from 'lodash'

class ChildComponent extends Component {

  componentDidMount() {
    console.log('ChildComponent Component Did Mount')
  }

  componentWillUnmount() {
    console.log('ChildComponent Un-mount :*(')
  }

  componentDidUpdate() {
    console.log('ChildComponent Component Did Update')
  }

  render() {
    console.log('ChildComponent Render')

    let num = Math.random() * 1000
    times(Math.pow(10, 7), () => num = Math.sin(num))

    return (
      <div>
        ChildComponent
        <br/>
        Random sum: {num}
      </div>
    )
  }
}

export default ChildComponent
