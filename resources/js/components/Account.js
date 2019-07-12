import React, { Component } from 'react'
import axios from 'axios'

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

export default class Account extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: ''
        }
        this.changeUserName = this.changeUserName.bind(this)
        this.changeUserEmail = this.changeUserEmail.bind(this)
        this.updateUserInfo = this.updateUserInfo.bind(this)
    }

    resetToast() {
        const successToast = document.querySelector('.toast_success')
        const faildToast = document.querySelector('.toast_faild')
        successToast.style.display = 'none'
        faildToast.style.display = 'none'
    }

    componentWillMount() {
        axios.get('/api/v1/user/1')
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    changeUserName(e) {
        this.setState({
            name: e.target.value.toString()
        })
    }

    changeUserEmail(e) {
        this.setState({
            email: e.target.value.toString()
        })
    }

    updateUserInfo() {
        this.resetToast()
        const name = this.state.name.toString()
        const email = this.state.email.toString()
        if (email.match(/.+@.+\..+/) == null) {
            const toast = document.querySelector('.toast_faild')
            toast.innerText = 'this is not format of email'
            toast.style.display = null
            return
        }
        const body = {
            name: name,
            email: email
        }
        axios.patch('/api/v1/user/1', body)
            .then(res => {

                const toast = document.querySelector('.toast_success')
                toast.style.display = null
            })
            .catch(err => {
                const toast = document.querySelector('.toast_faild')
                toast.innerText = 'request faild'
                toast.style.display = null
                console.log(err)
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
                                    <td><input className='any_textbox' type='text' placeholder={this.state.name} style={anyTextboxStyle} onKeyUp={this.changeUserName}/></td>
                                </tr>
                                <tr>
                                    <td className='form_column_title' style={formColumnTitle}>email</td>
                                    <td><input className='any_textbox' type='text' placeholder={this.state.email} style={anyTextboxStyle} onKeyUp={this.changeUserEmail}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div className='send_button_inner'>
                        <button className='send_button' style={sendButtonStyle} onClick={this.updateUserInfo}>save</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
