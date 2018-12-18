import React, { Component, Fragment } from 'react';
import './App.css';
import CardSimple from './CardSimple';
import NovoPost from './Form';
import VisualizarDetalhe from './VisualizarDetalhe';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchPosts } from './actions/posts'
import { fetchCategories } from './actions/categories'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchCategories());
  }

  render() {

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loading === true
              ? null
              :
              < div className="App" >
             <Route exact path='/novoPost/' component={NovoPost} />
            <Route exact path='/visualizarDetalhe/:id' component={VisualizarDetalhe} />
            <Route exact path='/' component={CardSimple} />
          </div>}
          </div>
        </Fragment>
      </Router >
    );
  }
}

function mapStateToProps({posts, categories}) {
  return {
    loading: !posts.hasOwnProperty('data') || !categories.hasOwnProperty('data') ,
  }
}

export default connect(mapStateToProps)(App)