import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Article from './Article'
import MyArticle from './MyArticle'
import Account from './Account'
import NonAccount from './NonAccount'
import Cookie from 'js-cookie'
import NewArticle from './NewArticle'
import Define from './Define'

const tabTableStyle = {
    width: '100%',
    tableLayout: 'fixed'

}

const tabButtonStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid #000000',
    paddingTop: '15px',
    paddingBottom: '15px',
}

export default class Body extends Component {

    constructor() {
        super()
        console.log(Cookie.get(Define.COOKIE_USER_ID_KEY()))
    }

    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last)
    }

    onClickOAB() {
        ReactDOM.render(<Article />, document.querySelector('.primary_body'))
    }

    onClickMAB() {
        const userId = Cookie.get(Define.COOKIE_USER_ID_KEY())
        if (!userId) {
            return alert('please Login')
        }
        ReactDOM.render(<MyArticle />, document.querySelector('.primary_body'))
    }

    onClickAB() {
        const userId = Cookie.get(Define.COOKIE_USER_ID_KEY())

        if (!userId) {
            ReactDOM.render(<NonAccount />, document.querySelector('.primary_body'))
        }
        else {
            ReactDOM.render(<Account />, document.querySelector('.primary_body'))
        }
    }


    onClickNAB() {
        const userId = Cookie.get(Define.COOKIE_USER_ID_KEY())
        if (!userId) {
            return alert('please Login')
        }
        ReactDOM.render(<NewArticle />, document.querySelector('.primary_body'))
    }

    render() {
        return (
          <React.Fragment>
              <div className='primary_head'>
                  <table style={tabTableStyle}>
                    <tbody>
                        <tr>
                            <td>
                                <button className='official_article_button' style={tabButtonStyle} onClick={this.onClickOAB}>Official Article</button>
                            </td>
                            <td>
                                <button className='my_article_button' style={tabButtonStyle} onClick={this.onClickMAB}>My Article</button>
                            </td>
                            <td>
                                <button className='account_button' style={tabButtonStyle} onClick={this.onClickAB}s>Account</button>
                            </td>
                            <td>
                                <button className='new_article_button' style={tabButtonStyle} onClick={this.onClickNAB}s>New Article</button>
                            </td>
                        </tr>
                      </tbody>
                  </table>
              </div>
              <div className='primary_body'>

              </div>
          </React.Fragment>
        )
      }
}

ReactDOM.render(<Body />, document.querySelector('.primary'))
ReactDOM.render(<Article />, document.querySelector('.primary_body'))
