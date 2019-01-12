import React, {PureComponent} from 'react'
import {debounce} from 'lodash'

import TextField from './TextField'
import PasswordsFields from './PasswordsFields'
import CountrySelect from './CountrySelect'
import TelephoneField from './TelephoneField'
import ReviewField from './ReviewField'
import AvatarField from './AvatarField'

class BigForm extends PureComponent {
  constructor(...args) {
    super(...args)

    const stateFromLocalStorageStr = localStorage.getItem('form-state')
    this.state = stateFromLocalStorageStr ? {
      ...JSON.parse(stateFromLocalStorageStr),
      password: ''
    } : {
      name: '',
      lastName: '',
      occupation: '',
      password: '',
      countryCode: '',
      telephone: '',
      score: 0,
      avatar: null
    }
  }

  componentDidMount() {
    console.log('BigForm Component Did Mount')
  }

  componentWillUnmount() {
    console.log('BigForm Un-mount :*(')
  }

  componentDidUpdate(prevState) {
    console.log('BigForm Component Did Update')
    if (this.state !== prevState) {
      this.saveStateDebounced()
    }
  }

  saveStateDebounced = debounce(() => {
    localStorage.setItem('form-state', JSON.stringify(this.state))
  }, 500)

  onFirstNameChange = newName => this.setState({name: newName})
  onLastNameChange = newLastName => this.setState({lastName: newLastName})
  onOccupationChange = newOccupation => this.setState({occupation: newOccupation})
  onPasswordChange = newPassword => this.setState({password: newPassword})
  onCountryCodeChange = newCountryCode => this.setState({countryCode: newCountryCode})
  onTelephoneChange = newTelephone => this.setState({telephone: newTelephone})
  onScoreChange = newScore => this.setState({score: newScore})
  onAvatarChange = newAvatar => this.setState({avatar: newAvatar})

  onSubmit = () => {
    this.passwordRef.saveCurrentPasswordAsUsed()
    alert('submit!')
  }

  render() {
    console.log('BigForm Render')
    const {name, lastName, occupation, password, countryCode, telephone, score, avatar} = this.state
    const canSubmit = !!(password && countryCode && telephone)

    return (
      <form>

        <TextField label="First Name" name="name" value={name} onChange={this.onFirstNameChange} />

        <TextField label="Last Name" name="lastName" value={lastName} onChange={this.onLastNameChange} />

        <TextField label="Occupation" name="occupation" value={occupation} onChange={this.onOccupationChange} />

        <PasswordsFields ref={ref => this.passwordRef = ref} usedBeforePasswords={this.usedBeforePasswords} onChange={this.onPasswordChange} />

        <CountrySelect countryCode={countryCode} onChange={this.onCountryCodeChange} />

        <TelephoneField countryCode={countryCode} initialTelephone={telephone} onChange={this.onTelephoneChange} />

        <ReviewField score={score} onChange={this.onScoreChange} />

        <AvatarField avatar={avatar} onChange={this.onAvatarChange} />

        <button disabled={!canSubmit} onClick={this.onSubmit}>
          Submit
        </button>
      </form>
    )
  }
}

export default BigForm
