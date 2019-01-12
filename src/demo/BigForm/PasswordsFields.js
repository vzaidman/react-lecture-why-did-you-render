import React, {PureComponent} from 'react'
import {uniq} from 'lodash'

function keepNewUsedPassword(password) {
  const prevPasswordsStr = localStorage.getItem('prev-passwords')
  const prevPasswords = prevPasswordsStr ? JSON.parse(prevPasswordsStr) : []
  const newPasswords = uniq([...prevPasswords, password])
  localStorage.setItem('prev-passwords', JSON.stringify(newPasswords))
}

function isPasswordUsedBefore(password, repeatPassword) {
  const usedBeforePasswordsStr = localStorage.getItem('prev-passwords')
  const usedBeforePasswords = usedBeforePasswordsStr ? JSON.parse(usedBeforePasswordsStr) : []
  return usedBeforePasswords.indexOf(password) !== -1
}

export default class PasswordsFields extends PureComponent {
  static whyDidYouRender = true

  state = {
    password: '',
    repeatPassword: '',
    passwordUsedBefore: false,
  }

  componentDidUpdate(prevProps, prevState){
    const {password, repeatPassword} = this.state
    const {onChange} = this.props

    if (password !== prevState.password || repeatPassword !== prevState.repeatPassword) {
      const passwordUsedBefore = isPasswordUsedBefore(password)
      const validPassword = (
        !passwordUsedBefore &&
        password === repeatPassword
      )
      this.setState({passwordUsedBefore}, () => {
        onChange(validPassword ? password : '')
      })
    }
  }

  saveCurrentPasswordAsUsed = () => {
    console.log('keepNewUsedPassword', this.state.password)
    keepNewUsedPassword(this.state.password)
  }

  render(){
    console.log('PasswordsFields render')

    const {password, repeatPassword, passwordUsedBefore} = this.state

    return (
      <>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => {
                this.setState({password: e.target.value})
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Repeat Password:
            <input
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={e => {
                this.setState({repeatPassword: e.target.value})
              }}
            />
          </label>
        </div>
        {!!password && password !== repeatPassword && (
          <div style={{color: 'red'}}>
            Password was not repeated right.
          </div>
        )}
        {passwordUsedBefore && (
          <div style={{color: 'red'}}>
            Password was use before.
          </div>
        )}
      </>
    )
  }
}
