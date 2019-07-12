import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Login from './Login'
import Signup from './Signup'

const tabTableStyle = {
    width: '100%',
    tableLayout: 'fixed'

}

const tabButtonStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid #999999',
    paddingTop: '15px',
    paddingBottom: '15px',
}

export default class NonAccount extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onClickSignup() {
        ReactDOM.render(<Signup />, document.querySelector('.inner_body'))
    }

    onClickLogin() {
        ReactDOM.render(<Login />, document.querySelector('.inner_body'))
    }

    render() {
        return (
            <React.Fragment>
                <div className='innner_head'>
                    <table style={tabTableStyle}>
                        <tbody>
                            <tr>
                                <td>
                                    <button className='signup_button' style={tabButtonStyle} onClick={this.onClickSignup}>signup</button>
                                </td>
                                <td>
                                    <button className='login_button' style={tabButtonStyle} onClick={this.onClickLogin}>login</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='inner_body'>

                </div>
            </React.Fragment>
        )
    }

}
