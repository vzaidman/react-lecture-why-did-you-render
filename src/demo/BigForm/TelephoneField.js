import React, {PureComponent} from 'react'
import {parsePhoneNumberFromString} from 'libphonenumber-js'

function isTelephoneValid(telephone, countryCode){
  const parsedTelephone = parsePhoneNumberFromString(telephone)
  return telephone && parsedTelephone && parsedTelephone.country === countryCode
}

export default class TelephoneField extends PureComponent {
  state = {
    telephone: this.props.initialTelephone,
    telephoneValid: isTelephoneValid(this.props.initialTelephone, this.props.countryCode)
  }

  componentDidUpdate(prevProps, prevState){
    const {telephone} = this.state
    const {onChange, countryCode} = this.props

    if (telephone !== prevState.telephone || countryCode !== prevProps.countryCode) {
      const telephoneValid = isTelephoneValid(telephone, countryCode)
      this.setState({telephoneValid}, () => {
        onChange(telephoneValid && telephone)
      })
    }
  }

  render(){
    console.log('TelephoneField render')

    const {telephone, telephoneValid} = this.state

    return (
      <>
        <div>
          <label>
            Telephone:
            <input type="tel" name="telephone" value={telephone} onChange={e => {
              this.setState({telephone: e.target.value})
            }}/>
          </label>
        </div>
        {!telephoneValid && (
          <div style={{color: 'red'}}>
            Sorry, this telephone is invalid.
          </div>
        )}
      </>
    )
  }
}
