import React, { Component, Fragment } from 'react';
import './App.css';
import CardSimple from './components/CardSimple';
import NovoPost from './components/Form';
import NoMatch from './components/NoMatch';
import VisualizarDetalhe from './components/VisualizarDetalhe';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchPosts } from './actions/posts';
import { fetchCategories } from './actions/categories';
import { visualizationForm } from './actions/shared';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts('1');
    this.props.fetchCategories();
    this.props.visualizationForm(false);
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
           
            <Switch>
              <Route exact path='/post/' component={NovoPost} />
              <Route exact path='/post/:id' component={NovoPost} />
              <Route exact path='/category/:id' component={VisualizarDetalhe} />
              <Route path='/category' component={CardSimple} />
              <Route  component={NoMatch} />
            </Switch>
          </div>}
          </div>
        </Fragment>
      </Router >
    );
  }
}

function mapStateToProps({posts, categories}, dispatch) {
  console.log(dispatch)
  return {

    loading: !posts.hasOwnProperty('data') || !categories.hasOwnProperty('data') ,
  }
}

const mapDispatchToProps = {
  fetchPosts,
  fetchCategories,
  visualizationForm
};

export default connect(mapStateToProps, mapDispatchToProps)(App)