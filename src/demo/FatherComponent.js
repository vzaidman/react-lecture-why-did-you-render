import React, {PureComponent} from 'react'

class FatherComponent extends PureComponent {

  shouldComponentUpdate(nextProps) {
    // This is roughly what PureComponent does.
    return Object.keys({...nextProps, ...this.props})
      .some(propName => {
        if (nextProps[propName] !== this.props[propName]) {
          debugger
          return true
        }
        return false
      })
  }

  componentDidMount() {
    console.log('FatherComponent Did Mount')
  }

  componentWillUnmount() {
    console.log('FatherComponent Un-mount :*(')
  }

  componentDidUpdate() {
    console.log('FatherComponent Component Did Update')
  }

  render() {
    console.log('FatherComponent Render')
    const {children} = this.props
    return (
      <div style={{border: '1px solid white', padding: 5, position: 'relative'}} >
        <span style={{fontSize: 16, position: 'absolute', top: -15, left: 0}}>
          FatherComponent
        </span>

        {children}

      </div>
    )
  }
}

export default FatherComponent
