import React, {PureComponent} from 'react'
import {times} from 'lodash'

const numberOfPixels = 1000

function getRandomRgbColor(){
  const red = Math.random() * 255
  const green = Math.random() * 255
  const blue = Math.random() * 255
  return `rgb(${red},${green},${blue})`
}

function HugeList(){
  const color1 = getRandomRgbColor()
  const color2 = getRandomRgbColor()
  return (
    <div className="pixel-container">
      {times(numberOfPixels, i => {
        const backgroundColor = Math.round(Math.random()) === 1 ? color1 : color2
        return <div key={i} style={{backgroundColor}}/>
      })}
    </div>
  )
}

class ChildComponent extends PureComponent {

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
        <HugeList/>
      </div>
    )
  }
}

export default ChildComponent
