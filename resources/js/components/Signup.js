import React, { Component } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import Define from './Define'

const anyTextboxStyle = {
    width: '70%',
    height: '25px',
    fontSize: '16pt',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '15px',
    border: '2px #e5e5e5 solid',
    borderRadius: '4px',
    marginBottom: '30px'
}

const formTableStyle = {
    width: '100%',
    marginTop: '40px'
}

const formColumnTitle = {
    fontSize: '18ot'
}

const sendButtonStyle = {
    width: '40%',
    fontSize: '18ot',
    backgroundColor: 'white',
    border: '2px #e5e5e5 solid',
    paddingTop: '15px',
    paddingBottom: '15px',
    marginBottom: '30px'
}

const toastSuccessStyle = {
    backgroundColor: 'rgba(0,100,200, 0.1)',
    color: '#0033aa',
    paddingBottom: '15px',
    paddingTop: '15px',
    display: 'none'
}

const toastFaildStyle = {
    backgroundColor: 'rgba(255,0,0, 0.1)',
    color: '#aa0000',
    paddingBottom: '15px',
    paddingTop: '15px',
    display: 'none'
}

export default class Signup extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputPassword = this.inputPassword.bind(this)
        this.signupUserInfo = this.signupUserInfo.bind(this)
    }

    resetToast() {
        const successToast = document.querySelector('.toast_success')
        const faildToast = document.querySelector('.toast_faild')
        successToast.style.display = 'none'
        faildToast.style.display = 'none'
    }

    inputName(e) {
        this.setState({
            name: e.target.value.toString()
        })
    }

    inputEmail(e) {
        this.setState({
            email: e.target.value.toString()
        })
    }

    inputPassword(e) {
        this.setState({
            password: e.target.value.toString()
        })
    }

    signupUserInfo() {
        this.resetToast()
        const name = this.state.name
        const email = this.state.email
        const password = this.state.password

        if (email.match(/.+@.+\..+/) == null) {
            const toast = document.querySelector('.toast_faild')
            toast.innerText = 'this is not format of email'
            toast.style.display = null
            return
        }

        const body = {
            name: name,
            email: email,
            password: password
        }

        axios.post('/api/v1/user', body)
            .then(res => {
                const done = res.data.done
                if (done) {
                    const loginBody = {
                        email: email,
                        password: password
                    }
                    axios.post('/api/v1/user/login', loginBody)
                        .then(res => {
                            const user = res.data
                            const userId = user.id
                            Cookie.set(Define.COOKIE_USER_ID_KEY(), userId, { path: '/' })
                            const toast = document.querySelector('.toast_success')
                            toast.style.display = null
                            location.reload()
                        })
                        .catch(err => {
                            const toast = document.querySelector('.toast_faild')
                            toast.innerText = 'faild get user info'
                            toast.style.display = null
                            console.log(err)
                        })
                }
                else {
                    const toast = document.querySelector('.toast_faild')
                    toast.innerText = 'can\'t register'
                    toast.style.display = null
                }
            })
            .catch(err => {
                const toast = document.querySelector('.toast_faild')
                toast.innerText = 'bad response'
                toast.style.display = null
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className='form_body'>
                    <div className='toast_success' style={toastSuccessStyle}>success</div>
                    <div className='toast_faild' style={toastFaildStyle}>faild</div>
                    <form action=''>
                    <table className='form_table' style={formTableStyle}>
                            <tbody>
                                <tr>
                                    <td className='form_column_title' style={formColumnTitle}>name</td>
                                    <td><input className='name_textbox' type='text' style={anyTextboxStyle} onKeyUp={this.inputName}/></td>
                                </tr>
                                <tr>
                                    <td className='form_column_title' style={formColumnTitle}>email</td>
                                    <td><input className='email_textbox' type='text' style={anyTextboxStyle} onKeyUp={this.inputEmail}/></td>
                                </tr>
                                <tr>
                                    <td className='form_column_title' style={formColumnTitle}>password</td>
                                    <td><input className='password_textbox' type='password' style={anyTextboxStyle} onKeyUp={this.inputPassword}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div className='send_button_inner'>
                        <button className='send_button' style={sendButtonStyle} onClick={this.signupUserInfo}>login</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
