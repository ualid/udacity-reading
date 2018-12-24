import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { deletePost } from './actions/posts'

import EditIcon from './EditIcon';
import DeleteIcon from './DeleteIcon';

const styles = theme => ({
  card: {
    maxWidth: 400,
    display: 'inline-grid',
    marginTop: '1%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex-center',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends Component {
  state = { expanded: false, post: []};

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  showDetails(e, id){
    e.preventDefault()   
    this.props.history.push(`/visualizarDetalhe/${id}`)
  };

  handlerClickEdit = (post) => {
    this.props.history.push({
      pathname:`/editPost/${post.id}`,
      id: post.id,
      post
    })
  }

  componentWillReceiveProps(nextProps) {
<<<<<<< HEAD
    this.setState({
      post: nextProps.post
    })
  }
  
  saveFavorite() {
    console.log('Favorite')
=======
    //this.props.post = nextProps.post;
    this.setState({
      post: nextProps.post
    })
    //console.log('nextProps ', nextProps);
    
>>>>>>> c81a1b7443331a5ebc563084d14d426b819d9261
  }
  componentWillMount(){
    this.setState({
      post: this.props.post
    })
  }
  handlerClickDelete = (post) => {
      this.props.deletePost(post)
  }
 
  render() {
    const { classes } = this.props;
    const { post } = this.state;
     
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {post.author.substr(0,1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={ <Moment format="D MMM YYYY HH:mm">
          {post.timestamp}
      </Moment>}
        />
        
        <CardContent>
          <Typography component="p">
          {post.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
<<<<<<< HEAD
          <IconButton onClick={this.saveFavorite} aria-label="Add to favorites">
=======
          <IconButton aria-label="Add to favorites">
>>>>>>> c81a1b7443331a5ebc563084d14d426b819d9261
            <FavoriteIcon />{ post.voteScore}
          </IconButton>
          <IconButton  onClick={(e) => this.showDetails(e, post.id)} aria-label="Post">
            <CommentIcon label="123"/>{ post.commentCount}
          </IconButton>
          <EditIcon onClick={() => this.handlerClickEdit(post)}/>
            <DeleteIcon onClick={() => this.handlerClickDelete(post)}/>
          
        </CardActions>
     
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

function mapStateToProps ({posts, comments},  props ) {
  return {
    posts
  }
}
const mapDispatchToProps = {
  deletePost
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecipeReviewCard)));
