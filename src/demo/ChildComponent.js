import React, {Component} from 'react'
import FNWorker from '../FNWorker'

const numberOfPixels = 1000000

function createOffscreenCanvasWorkerFn() {
  let drawing = false
  let ctx = null

  function getRandomRgbColor(){
    const red = Math.random() * 255
    const green = Math.random() * 255
    const blue = Math.random() * 255
    return `rgb(${red},${green},${blue})`
  }

  function drawHugeList({width, height}) {
    ctx.fillStyle = getRandomRgbColor()
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = getRandomRgbColor()
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (Math.round(Math.random()) === 1) {
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }

  // eslint-disable-next-line no-restricted-globals
  self.onmessage = ({data: {canvas, width, height}}) => {
    if (drawing) {
      return
    }

    drawing = true
    if (canvas) {
      ctx = canvas.getContext("2d")
    }

    drawHugeList({width, height})

    setTimeout(() => drawing = false, 300)
  }
}

const offscreenCanvasWorker = new FNWorker(createOffscreenCanvasWorkerFn)

class ChildComponent extends Component {

  static whyDidYouRender = true

  componentDidMount() {
    console.log('ChildComponent Component Did Mount')
  }

  componentWillUnmount() {
    console.log('ChildComponent Un-mount :*(')
  }

  componentDidUpdate() {
    console.log('ChildComponent Component Did Update')
    this.recalculateCanvas()
  }

  recalculateCanvas = () => {
    const {canvasRef} = this
    if (!canvasRef) {
      return
    }
    offscreenCanvasWorker.postMessage({width: canvasRef.width, height: canvasRef.height})
  }

  canvasMounted = canvasRef => {
    if (!canvasRef) {
      return
    }

    const width = canvasRef.parentElement.scrollWidth
    const height = numberOfPixels / width

    canvasRef.width = width
    canvasRef.height = height

    this.canvasRef = canvasRef
    this.offscreenCanvas = this.canvasRef.transferControlToOffscreen()
    offscreenCanvasWorker.postMessage({canvas: this.offscreenCanvas, width, height}, [this.offscreenCanvas])
    this.recalculateCanvas()
  }

  render() {
    console.log('ChildComponent Render')

    return (
      <div>
        ChildComponent
        <canvas className="pixel-container" ref={this.canvasMounted}/>
      </div>
    )
  }
}

export default ChildComponent
