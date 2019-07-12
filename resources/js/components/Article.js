import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ViewTableRow from './ViewTableRow'
import ShowArticle from './ShowArticle'

const viewTableStyle = {
    width: '100%',
    textAlign: 'left'
}

const viewTableHeaderStyle = {
    borderBottom: '2px #f0f0f0 solid'
}

const viewTableItemStyle =  {
    borderBottom: '1px #f5f5f5 solid',
    paddingTop: '15px',
    paddingBottom: '15px'
}

const tableInnerStyle = {
    width: '100%',
    marginLeft: '20px',
    marginRight: '20px'
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

const tableInnerHeadStyle = {
    marginTop: '30px'
}

const searchTextboxStyle = {
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

const showArticleInnerStyle = {
    width: '100%',
    marginLeft: '20px',
    marginRight: '20px',
    display: 'none'
}

export default class Article extends Component {

	constructor() {
		super()
		this.state = {
            initArticles: [],
            articles: [],
            value: ''
        }
        this.searchArticle = this.searchArticle.bind(this)
    }

    onClick(e, id) {
        console.log(`click${id}`)
        ReactDOM.render(<ShowArticle id={id} />, document.querySelector('.primary_body'))
    }

    componentWillMount() {
        axios.get('/api/v1/articles')
            .then(res => {
                this.setState({
                    initArticles: res.data,
                    articles: res.data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    searchArticle(e) {
        const value = e.target.value.toString()
        const updateList = this.state.initArticles.filter( article => {
            return article.title.toString().toLowerCase().search(value.toLowerCase()) !== -1
        })
        this.setState({
            articles: updateList
        })
    }

	render() {
		return(
			<React.Fragment>
				<div className='table_inner' style={tableInnerStyle}>
                    <div className='table_inner_head' style={tableInnerHeadStyle} >
                        <form action=''>
                            <input className='search_textbox' type='text' placeholder='search' style={searchTextboxStyle} onChange={this.searchArticle} />
                        </form>
                    </div>
                    <div className='article_body'>

                    </div>
					<table className='view_table' style={viewTableStyle}>
						<thead>
							<tr>
								<th className='view_table_header' style={viewTableHeaderStyle} >id</th>
								<th className='view_table_header' style={viewTableHeaderStyle} >title</th>
								<th className='view_table_header' style={viewTableHeaderStyle} >description</th>
								<th className='view_table_header' style={viewTableHeaderStyle} ></th>
							</tr>
						</thead>
						<tbody>
                            {
                                this.state.articles.map(article => {
                                    return <ViewTableRow article={article} button={'Show'} onClick={e => this.onClick(e, article.id)}/>
                                })
                            }
						</tbody>
					</table>
				</div>
			</React.Fragment>
		)
	}
}
