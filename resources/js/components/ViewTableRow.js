import React, { Component } from 'react'

const viewTableItemStyle =  {
    borderBottom: '1px #f5f5f5 solid',
    paddingTop: '15px',
    paddingBottom: '15px'
}

const viewTableItemButtonStyle = {
    position: 'relative',
    display: 'inline-block',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
    textDecoration: 'none',
    fontSize: '5pt',
    color: '#0a0a0a',
    background: '#ffffff',
    border: 'solid 1px #0a0a0a',
    borderRadius: '4px',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
    textShadow: '0 1px 0 rgba(0,0,0,0.2)',
    outline: 'none'
}

export default class ViewTableRow extends Component {
    constructor() {
        super()
        this.state = {
            article: {}
        }
    }

    render() {
        return (
            <tr key={this.props.article.id.toString()}>
                <td className='view_table_item' style={viewTableItemStyle} >{this.props.article.id}</td>
                <td className='view_table_item' style={viewTableItemStyle} >{this.props.article.title}</td>
                <td className='view_table_item' style={viewTableItemStyle} >{this.props.article.description}</td>
                <th className='view_table_item' style={viewTableItemStyle} >
                    <button className='view_table_item_button' style={viewTableItemButtonStyle} onClick={this.props.onClick} >{this.props.button}</button>
                </th>
            </tr>
        )
    }
}
