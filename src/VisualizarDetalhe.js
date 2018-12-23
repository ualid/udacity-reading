import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'; 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moment from 'react-moment';
import {connect} from 'react-redux'
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import { fetchComments, deleteCommenter } from './actions/comments';
import { visualizationForm, visualizationEdit } from './actions/shared';
import FormCommenter from './FormCommenter';
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

class VisualizarDetalhe extends React.Component {
  state = { commenter: null };
 
  handleClick = () => { 
    this.setState({
      commenter: null
    });
    this.props.visualizationForm(true)
   
  };

  handlerClickEdit = (commenter) => {
    this.props.visualizationForm(false)
    this.props.visualizationForm(true)
    this.setState({
        commenter: commenter
    });
  }

  handlerClickDelete = (commenter) => {
      this.props.deleteCommenter(commenter)
  }
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
          <Button size="small" onClick={this.handleClick} color="primary">
          New Commenter
        </Button>
        </CardActions>
      </Card>
        
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
         <Card key='2' className={classes.card}> 
         {
            this.props.visualization && (
              <FormCommenter parentId = {this.props.parentId} commenter = {this.state.commenter}/>
            )
          }
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
                  <EditIcon onClick={() => this.handlerClickEdit(comment)}/>
                  <DeleteIcon onClick={() => this.handlerClickDelete(comment)}/>
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

function mapStateToProps ({posts, comments, shared},  props ) {
  let { id } = props.match.params
  let post = null
   posts.data.map((ele) => {
      if(ele.id === id){
        post = ele;
      }
    })
    
  return {
    //loading: !comments.hasOwnProperty('data'),
    post,
    comments,
    parentId: id,
    visualization: shared.visualization,
    visualizationEdit: shared.visualizationEdit
  }
}
/*
function mapDispatchToProps({dispatch}, props) {
  console.log('state ', dispatch, 'props ',props );
  return fetchComments(this.props.post.id)
}*/


const mapDispatchToProps = {
  fetchComments,
  deleteCommenter,
  visualizationForm
 };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VisualizarDetalhe)));
