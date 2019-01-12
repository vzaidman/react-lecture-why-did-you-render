import React, {PureComponent} from 'react'

export default class ReviewField extends PureComponent {
  reviewMouseHandler = e => {
    e.preventDefault()
    if (e.buttons) {
      this.props.onChange(e.nativeEvent.layerX)
    }
  }

  render(){
    console.log('ReviewField render')
    const {score} = this.props
    return (
      <div>
        Review:
        <div
          style={{position: 'relative', margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', width: 101, height: 50}}
          onMouseDown={this.reviewMouseHandler}
          onMouseMove={this.reviewMouseHandler}
        >
          <div
            style={{position: 'absolute', backgroundColor: 'red', pointerEvents: 'none', left: 0, top: 0, width: `${score}%`, height: '100%'}}
          />
          <div style={{position: 'absolute', color: 'black', textAlign: 'center', left: 0, right: 0, pointerEvents: 'none'}}>
            {`${score || 0}%`}
          </div>
        </div>
      </div>
    )
  }
}
