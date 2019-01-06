import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'; 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import EditIcon from './EditIcon';
import DeleteIcon from './DeleteIcon';
import {connect} from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moment from 'react-moment';
import red from '@material-ui/core/colors/red';

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

class Commenter extends React.Component {
  render() {
    const { classes, comment, handlerClickEdit, handlerClickDelete} = this.props;
    return (
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
                  <EditIcon onClick={() => handlerClickEdit(comment)}/>
                  <DeleteIcon onClick={() => handlerClickDelete(comment)}/>
            </CardActions>
          </Card>)
          }
}

function mapStateToProps ({comments},  props ) {
  return {
    comments
  }
}

 
export default connect(mapStateToProps)(withStyles(styles)(Commenter));
