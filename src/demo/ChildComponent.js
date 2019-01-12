import React, {Component} from 'react'

import BigForm from './BigForm/BigForm'

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

    return (
      <div>
        <div>ChildComponent</div>
        <BigForm/>
      </div>
    )
  }
}

export default ChildComponent
