import React, { Component, Fragment } from 'react';
import './App.css';
import Post from './components/Post';
import NovoPost from './components/Form';
import NoMatch from './components/NoMatch';
import PostDetail from './components/PostDetail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchPosts } from './actions/posts';
import { fetchCategories } from './actions/categories';
import { visualizationForm, filterSelectedFunc } from './actions/shared';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import Nav from './components/Nav'

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts('1');
    this.props.fetchCategories();
    this.props.visualizationForm(false);
    this.props.filterSelectedFunc({categoriesSelected: '', filterSelected: '1'});
  }

  render() {

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
          <Nav />
            {this.props.loading === true
              ? null
              :
              < div className="App" >

            <Switch>
              <Route exact path='/post/' component={NovoPost} />
              <Route exact path='/post/:id' component={NovoPost} />
              <Route exact path='/:category/:id' component={PostDetail} />
              <Route path='/category' component={Post} />
              <Route path='/' component={Post} />
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
  return {
    loading: !posts.hasOwnProperty('data') || !categories.hasOwnProperty('data') ,
  }
}

const mapDispatchToProps = {
  fetchPosts,
  fetchCategories,
  visualizationForm,
  filterSelectedFunc
};

export default connect(mapStateToProps, mapDispatchToProps)(App)