import React, { Component } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import Define from './Define'

const articleTable = {
    width: '80%',
    marginTop: '40px',
    marginLeft: '40px',
    borderSpacing: '10px'
}

const articleTableItem = {
    textAlign: 'left'
}

const articleTableItemBody = {
    wordWrap: 'break-all'
}

export default class ShowArticle extends Component {
    constructor() {
        super()
        this.state = {
            article: {}
        }
    }

    componentWillMount() {
        const userId = Cookie.get(Define.COOKIE_USER_ID_KEY())
        axios.get(`/api/v1/user/${userId}/article/${this.props.id}`)
            .then(res => {
                this.setState({
                    article: res.data,
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        const body = this.state.article.body
        return (
            <React.Fragment>
                <div className='article_body'>
                    <table className='article_table' style={articleTable}>
                        <tbody>
                            <tr>
                                <td className='article_table_item' style={articleTableItem}>id</td>
                                <td className='article_table_item' style={articleTableItem}>:</td>
                                <td className='article_table_item' style={articleTableItem}>{this.state.article.id}</td>
                            </tr>
                            <tr>
                                <td className='article_table_item' style={articleTableItem}>title</td>
                                <td className='article_table_item' style={articleTableItem}>:</td>
                                <td className='article_table_item' style={articleTableItem}>{this.state.article.title}</td>
                            </tr>
                            <tr>
                                <td className='article_table_item' style={articleTableItem}>body</td>
                                <td className='article_table_item' style={articleTableItem}>:</td>
                                <td className='article_table_item' style={articleTableItem}>
                                    <div　className='article_table_item' style={articleTableItemBody}　>
                                    {body}
                                    hello world
                                    hello world
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
