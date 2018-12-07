import React, {Component} from 'react'

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
        ChildComponent
      </div>
    )
  }
}

export default ChildComponent
