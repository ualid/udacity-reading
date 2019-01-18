import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import PanelPost from './PanelPost';
import { connect } from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { fetchPostsByCategories, fetchPosts } from '../actions/posts'
import { filterSelectedFunc } from '../actions/shared'
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  alignItemsCard: {
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Post extends Component {
  state = { categoriesSelected: '', filterSelected: '1', posts: {} };

  handleChange = e => {
    this.props.filterSelectedFunc({categoriesSelected: e.target.value});

    if (e.target.value === "") {  
      this.props.fetchPosts(this.props.filterSelected)
      this.props.history.push('/');
    } else {
      this.props.fetchPostsByCategories(e.target.value)
      this.props.history.push('/'+e.target.value);
    }
    this.orderPosts(this.props.filterSelected, this.state.posts)
 
  }
  
  orderPosts(order, posts){
    let postsOrder = null;

    //this.props.filterSelectedFunc({filterSelected: order});

    if(order === '1'){
      postsOrder = posts.sort(function(a,b) { return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore < a.voteScore) ? -1 : 0);} );  
    }else{
      postsOrder = posts.sort(function(a,b) { return (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0);} );  
    }   
    this.setState((state) => {
      return {
        ...state,
        posts: postsOrder
      }
  });
  }
  componentWillMount() {
    console.log('WillMount');
    const urlSplit = this.props.location.pathname.split('/');
    if(urlSplit[1] === '') {
        this.props.filterSelectedFunc({categoriesSelected: '', filterSelected: '1'});
        this.props.fetchPosts('');
      }else{
        this.props.fetchPostsByCategories(urlSplit[1]);
        this.props.filterSelectedFunc({categoriesSelected: urlSplit[1], filterSelected: '1'});
    }
   
    this.orderPosts(this.props.filterSelected, this.props.posts)
  }
 
  componentWillReceiveProps(nextProps) {
     //console.log('nextProps ', nextProps)
    // this.props.fetchPosts('');
     this.props.filterSelectedFunc({categoriesSelected: nextProps.categoriesSelected, filterSelected: nextProps.filterSelected});
     this.orderPosts(nextProps.filterSelected, nextProps.posts)
  }

  handleFilter = e => {
    this.props.filterSelectedFunc({'filterSelected': e.target.value})
    this.orderPosts(e.target.value, this.state.posts);
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
      <Grid>
       <FormControl className={classes.formControl}>
          <InputLabel htmlFor="categories-simple">Categories</InputLabel>
          <Select
            value={this.props.categoriesSelected}
            onChange={this.handleChange}
            inputProps={{
              name: 'Categories',
              id: 'categories-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.categories.map((category, index) => (
              <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid>
        <FormControl className={classes.formControl}>
           <InputLabel htmlFor="categories-simple">Filtrar por: </InputLabel>
          <Select
            value={this.props.filterSelected}
            onChange={this.handleFilter}
            inputProps={{
              name: 'Categories',
              id: 'categories-simple',
            }}
          >
            
              <MenuItem value='1'>
                {'VoteScore'}
              </MenuItem>
             <MenuItem value='2'>
                {'Data de Criação'}
              </MenuItem>
          </Select>
          </FormControl>
          </Grid>
        <CardActions>
          <Button component={Link} to="/post/" variant="contained" color="primary" className={classes.button}>
            New
          </Button>
        </CardActions>
        <CardContent>
          {this.state.posts.map((post, index) => (
            <div className="row" key={index}>
              <PanelPost post={post} />
            </div>
          ))
          }

        </CardContent>

      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ posts, categories, shared }, { id }) {
  return {
    posts: posts.data,
    categories: categories.data.categories,
    ...shared
  }
}
const mapDispatchToProps = {
  fetchPostsByCategories,
  fetchPosts,
  filterSelectedFunc
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
