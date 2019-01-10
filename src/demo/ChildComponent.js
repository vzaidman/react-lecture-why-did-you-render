import React, {Component} from 'react'
import {uniqBy} from 'lodash'
import {parsePhoneNumberFromString} from 'libphonenumber-js'
import ImageUploader from 'react-images-upload'

import countryList from './countryList'

class ChildComponent extends Component {

  constructor(...args) {
    super(...args)
    const stateFromLocalStorage = localStorage.getItem('form-state')
    this.state = stateFromLocalStorage ?
      JSON.parse(stateFromLocalStorage) :
      {
        name: '',
        lastName: '',
        occupation: '',
        password: '',
        repeatPassword: '',
        countryCode: '',
        telephone: '',
        score: null,
        avatar: null
      }
  }

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

    const {name, lastName, occupation, password, repeatPassword, countryCode, telephone, score, avatar} = this.state

    localStorage.setItem('form-state', JSON.stringify(this.state))

    const savedPrevPasswords = localStorage.getItem('prev-passwords')
    const prevPasswords = savedPrevPasswords ? JSON.parse(savedPrevPasswords) : []
    const passwordUsedBefore = prevPasswords.indexOf(password) !== -1

    const parsedTelephone = parsePhoneNumberFromString(telephone)
    const telephoneError = telephone && (
      !parsedTelephone || parsedTelephone.country !== countryCode
    )

    const reviewMouseHandler = e => {
      e.preventDefault()
      if (e.buttons) {
        this.setState({score: e.nativeEvent.layerX})
      }
    }

    const canSubmit = (
      password === repeatPassword &&
      !passwordUsedBefore &&
      countryCode &&
      telephone && !telephoneError
    )

    const countryListArray = uniqBy([
      [countryCode, countryList[countryCode]],
      ...Object.entries(countryList)
    ], '0')

    return (
      <div>
        <div>ChildComponent</div>
        <form>
          <div>
            <label>
              FirstName:
              <input type="text" name="name" value={name} onChange={e => {
                this.setState({name: e.target.value})
              }}/>
            </label>
          </div>
          <div>
            <label>
              LastName:
              <input type="text" name="lastName" value={lastName} onChange={e => {
                this.setState({lastName: e.target.value})
              }}/>
            </label>
          </div>
          <div>
            <label>
              Occupation:
              <input type="text" name="occupation" value={occupation} onChange={e => {
                this.setState({occupation: e.target.value})
              }}/>
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" name="password" value={password} onChange={e => {
                this.setState({password: e.target.value})
              }}/>
            </label>
          </div>
          <div>
            <label>
              Repeat Password:
              <input type="password" name="repeatPassword" value={repeatPassword} onChange={e => {
                this.setState({repeatPassword: e.target.value})
              }}/>
            </label>
          </div>
          {!!password && password !== repeatPassword && (
            <div style={{color: 'red'}}>
              Password was not repeated right.
            </div>
          )}
          {passwordUsedBefore && (
            <div style={{color: 'red'}}>
              Password was used before.
            </div>
          )}
          <div>
            <label>
              Country:
              <select
                value={countryCode}
                onChange={e => {
                  this.setState({countryCode: e.target.value})
                }}
              >
                {countryListArray.map(([countryCode, countryName]) => (
                  <option key={countryCode} value={countryCode}>
                    {countryName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Telephone:
              <input type="tel" name="telephone" value={telephone} onChange={e => {
                this.setState({telephone: e.target.value})
              }}/>
            </label>
          </div>
          {telephoneError && (
            <div style={{color: 'red'}}>
              Sorry, this telephone is invalid.
            </div>
          )}
          <div>
            <label>
              Review:
              <div
                style={{position: 'relative', margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', width: 101, height: 50}}
                onMouseDown={reviewMouseHandler}
                onMouseMove={reviewMouseHandler}
              >
                <div
                  style={{position: 'absolute', backgroundColor: 'red', pointerEvents: 'none', left: 0, top: 0, width: `${score}%`, height: '100%'}}
                />
                <div style={{position: 'absolute', color: 'black', textAlign: 'center', left: 0, right: 0, pointerEvents: 'none'}}>
                  {`${score || 0}%`}
                </div>
              </div>
            </label>
          </div>
          <ImageUploader
            withIcon
            singleImage
            withPreview
            defaultImage={avatar}
            buttonText='Choose Avatar'
            onChange={images => {
              if (!images.length) {
                this.setState({avatar: null})
                return
              }
              const reader = new FileReader()
              reader.readAsDataURL(images[0])
              reader.onload = () => this.setState({avatar: reader.result})
            }}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
          />
          <button
            disabled={!canSubmit}
            onClick={() => {
              localStorage.setItem('prev-passwords', JSON.stringify(prevPasswords.concat([password])))
              alert('submit!')
            }}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default ChildComponent
