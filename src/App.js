import React, { Component } from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render/src/whyDidYouRender'

import logo from './logo.svg'
import wellDoneLogo from './logo-wd.png'
import './App.css'

import Demo from './demo/Demo'

whyDidYouRender(React)

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Performance</h1>
        <img src={logo} className="App-logo" alt="react logo" />
        <Demo />
        <img src={wellDoneLogo} className="well-done-logo" alt="well done software logo" />
      </div>
    )
  }
}

export default App
