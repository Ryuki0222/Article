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

const bodyTextboxStyle = {
    width: '70%',
    height: '150px',
    fontSize: '12pt',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '15px',
    border: '2px #e5e5e5 solid',
    borderRadius: '4px',
    marginBottom: '30px',

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

export default class NewArticle extends Component{
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            body: '',
            image_path: 'null'
        }
        this.changeTitle = this.changeTitle.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
        this.changeBody = this.changeBody.bind(this)
        this.postArticle = this.postArticle.bind(this)
    }

    resetToast() {
        const successToast = document.querySelector('.toast_success')
        const faildToast = document.querySelector('.toast_faild')
        successToast.style.display = 'none'
        faildToast.style.display = 'none'
    }

    changeTitle(e) {
        this.setState({
            title: e.target.value.toString()
        })
    }

    changeDescription(e) {
        this.setState({
            description: e.target.value.toString()
        })
    }

    changeBody(e) {
        this.setState({
            body: e.target.value.toString()
        })
    }

    postArticle() {
        this.resetToast()
        const title = this.state.title
        const description = this.state.description
        const body = this.state.body
        const postBody = {
            title: title,
            description: description,
            body: body
        }
        const userId = Cookie.get(Define.COOKIE_USER_ID_KEY())
        axios.post(`/api/v1/user/${userId}/article`, postBody)
            .then(res => {
                location.reload()
            })
            .catch(err => {
                const toast = document.querySelector('.toast_faild')
                toast.innerText = 'bad request'
                toast.style.display = null
                console.log(err)
            })
    }

    render() {
        return(
            <React.Fragment>
                <div className='form_body'>
                    <div className='toast_success' style={toastSuccessStyle}>success</div>
                    <div className='toast_faild' style={toastFaildStyle}>faild</div>
                    <form action=''>
                        <table className='form_table' style={formTableStyle}>
                            <tbody>
                                <tr>
                                    <td className='form_column_title' style={formColumnTitle}>title</td>
                                    <td><input className='any_textbox' type='text' style={anyTextboxStyle} onKeyUp={this.changeTitle}/></td>
                                </tr>
                                <tr>
                                    <td className='form_column_title' style={formColumnTitle}>description</td>
                                    <td><input className='any_textbox' type='text' style={anyTextboxStyle} onKeyUp={this.changeDescription}/></td>
                                </tr>
                                <tr>
                                    <td className='form_column_title' style={formColumnTitle}>body</td>
                                    {/* <td><input className='any_textbox' type='text' style={anyTextboxStyle} onKeyUp={this.changeBody}/></td> */}
                                    <td><textarea name='body_textbox' rows='10' cols='100' style={bodyTextboxStyle} onKeyUp={this.changeBody}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div className='send_button_inner'>
                        <button className='send_button' style={sendButtonStyle} onClick={this.postArticle}>save</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
