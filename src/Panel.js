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
import { fetchComments } from './actions/comments'

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
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  showDetails(e, id){
    e.preventDefault()   
    this.props.history.push(`/visualizarDetalhe/${id}`)
  };

  render() {
    const { classes, post } = this.props;
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
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton  onClick={(e) => this.showDetails(e, post.id)} aria-label="Comment">
            <CommentIcon  label="123"/>{ post.commentCount}
          </IconButton>
          
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
export default withRouter(connect(mapStateToProps)(withStyles(styles)(RecipeReviewCard)));
