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

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.inputEmail = this.inputEmail.bind(this)
        this.inputPassword = this.inputPassword.bind(this)
        this.loginUserInfo = this.loginUserInfo.bind(this)
    }

    resetToast() {
        const successToast = document.querySelector('.toast_success')
        const faildToast = document.querySelector('.toast_faild')
        successToast.style.display = 'none'
        faildToast.style.display = 'none'
    }

    loginUserInfo() {
        this.resetToast()
        const successToast = document.querySelector('.toast_success')
        const faildToast =  document.querySelector('.toast_faild')
        successToast.style.display = 'none'
        faildToast.style.display = 'none'
        const email = this.state.email
        const password = this.state.password
        if (email.match(/.+@.+\..+/) == null) {
            const toast = document.querySelector('.toast_faild')
            toast.innerText = 'this is not format of email'
            toast.style.display = null
            return
        }
        const body = {
            email: email,
            password: password
        }
        axios.post('/api/v1/user/login', body)
            .then(res => {
                const user = res.data
                const userId = user.id;
                Cookie.set(Define.COOKIE_USER_ID_KEY(), userId, { path: '/' })

                const toast = document.querySelector('.toast_success')
                toast.style.display = null
                location.reload()
            })
            .catch(err => {
                const toast = document.querySelector('.toast_faild')
                toast.innerText = 'bad request'
                toast.style.display = null
                console.log(err)
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
                        <button className='send_button' style={sendButtonStyle} onClick={this.loginUserInfo}>login</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
