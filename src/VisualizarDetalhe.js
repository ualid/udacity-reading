import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moment from 'react-moment';
import {connect} from 'react-redux'
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom'
import { fetchComments } from './actions/comments'
import { bindActionCreators } from 'redux'

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

class VisualizarDetalhe extends React.Component {
  state = { expanded: false };
 
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentDidMount() {
    this.props.fetchComments(this.props.post.id)
  }
 
  render() {
    const { classes, post } = this.props;
   
    return (
      <div>
        <Grid>
      <Card key='1' className={classes.card}>
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
          subheader={ 
          <Moment format="D MMM YYYY HH:mm">
              {post.timestamp}
          </Moment>  }
        />
        
        <CardContent>
          <Typography component="p">
          zxczxczxczxczxczxc
          </Typography>
          <Typography component="p">
           <b>{'Author: '}</b>{post.author}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon /> 
          <Typography component="p">
            {post.voteScore}
          </Typography>
          </IconButton>
        </CardActions>
      </Card>
      </Grid>
      <br/>
      {this.props.comments.hasOwnProperty('data') && (
        <div>
        <Grid >
         <Divider variant="middle"/>
          <Typography gutterBottom variant="body1">
          <b>Comments</b>
        </Typography>
      </Grid>
      { this.props.comments.data.map((comment, index) => (
           <Grid key={index}>
       <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  {comment.author.substr(0,1).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={comment.title}
              subheader={ 
              <Moment format="D MMM YYYY HH:mm">
                  {comment.timestamp}
              </Moment>  }
            />
            
            <CardContent>
              <Typography component="p">
              {comment.body}
              </Typography>
              <Typography component="p">
               <b>{'Author: '}</b>{comment.author}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon /> 
              <Typography component="p">
                {comment.voteScore}
              </Typography>
              </IconButton>
            </CardActions>
          </Card>
      </Grid> ))}
      </div>)}
   </div>
    );
  }
}

VisualizarDetalhe.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps ({posts, comments},  props ) {
  let { id } = props.match.params
  let post = null
  console.log(props, ' props')
   posts.data.map((ele) => {
      if(ele.id === id){
        post = ele;
      }
    })
    
    
    //this.props.dispatch(fetchComments(id));
 
  return {
    //loading: !comments.hasOwnProperty('data'),
    post,
    comments
  }
}
/*
function mapDispatchToProps({dispatch}, props) {
  console.log('state ', dispatch, 'props ',props );
  return fetchComments(this.props.post.id)
}*/


const mapDispatchToProps = {
  fetchComments,
 };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VisualizarDetalhe)));
