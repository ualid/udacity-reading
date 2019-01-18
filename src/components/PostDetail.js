import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Moment from "react-moment";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import { fetchComments, deleteCommenter } from "../actions/comments";
import { visualizationForm } from "../actions/shared";
import { deletePost, updatePost } from "../actions/posts";
import FormCommenter from "./FormCommenter";
import Commenter from "./Commenter";

import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import LikeIcon from "./LikeIcon";
import DislikeIcon from "./DislikeIcon";

const styles = theme => ({
  card: {
    maxWidth: 400,
    display: "inline-grid",
    marginTop: "1%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex-center"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class PostDetail extends React.Component {
  state = { commenter: null };
  constructor(props, event) {
    super(props);
     
  if(props.post === undefined){
    alert('Post Not Found!');
    props.history.push('/');
}
  }

  handleClick = () => {
    this.setState({
      commenter: null
    });
    this.props.visualizationForm(true);
  };
  handlerClickEditPost = (post) => {
    this.props.history.push({
      pathname: `/post/${post.id}`,
      id: post.id,
      post
    });
  };

  handlerClickDeletePost = (post) => {
    this.props.deletePost(post);
    this.props.history.push({
      pathname: `/${post.category}`,
      post
    });
  };


  handlerClickEdit = commenter => {
    this.props.visualizationForm(false);
    this.props.visualizationForm(true);
    this.setState({
      commenter: commenter
    });
  };

  handlerClickDelete = commenter => {
    this.props.deleteCommenter(commenter);
  };
  like = (post) => {
    const objSave = {
      id: post.id,
      timestamp: Date.now(),
      voteScore: (post.voteScore + 1) 
    };

    this.props.updatePost(objSave);
  }
  dislike = (post) => {
    const objSave = {
      id: post.id,
      timestamp: Date.now(),
      voteScore: (post.voteScore - 1) 
    };
    this.props.updatePost(objSave);
  }
  componentDidMount() {
    if(this.props.post !== undefined)
    this.props.fetchComments(this.props.post.id);
  }
  
  render() {
    const { classes, post } = this.props;
    return ( 
      <div>
        <Grid>
        {post !== undefined && (
          <Card key="1" className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  {post.author.substr(0, 1).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.title}
              subheader={
                <Moment format="D MMM YYYY HH:mm">{post.timestamp}</Moment>
              }
            />

            <CardContent>
              <Typography component="p">{post.body}</Typography>
              <Typography component="p">
                <b>{"Author: "}</b>
                {post.author}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
                <Typography component="p">{post.voteScore}</Typography>
              </IconButton>
              <EditIcon onClick={() => this.handlerClickEditPost(post)}/>
              <DeleteIcon onClick={() => this.handlerClickDeletePost(post)}/>
              <LikeIcon onClick={() => this.like(post)}/>
              <DislikeIcon onClick={() => this.dislike(post)} />
              
              <Button size="small" onClick={this.handleClick} color="primary">
                New Commenter
              </Button>
            </CardActions>
          </Card>
        )}
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Card key="2" className={classes.card}>
            {this.props.visualization && (
              <FormCommenter
                parentId={this.props.parentId}
                commenter={this.state.commenter}
              />
            )}
          </Card>
        </Grid>
        <br />
        {this.props.comments.hasOwnProperty("data") && (
          <div>
            <Grid>
              <Divider variant="middle" />
              <Typography gutterBottom variant="body1">
                <b>Comments - {this.props.comments.data.length}</b>
              </Typography>
            </Grid>
            {this.props.comments.data.map((comment, index) => (
              <Grid key={index}>
                <Commenter comment={comment} handlerClickDelete={this.handlerClickDelete} handlerClickEdit={this.handlerClickEdit} />
              </Grid>
            ))}
          </div>
        )}
      </div>
    );
  }
}

PostDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired
};
 

function mapStateToProps({ posts, comments, shared }, props) {
  let { id } = props.match.params;
  const post = posts.data.find(ele => {
    return (ele.id === id);
  });
  return {
    post,
    comments,
    parentId: id,
    visualization: shared.visualization,
    visualizationEdit: shared.visualizationEdit
  };
}
 
const mapDispatchToProps = {
  fetchComments,
  deleteCommenter,
  visualizationForm,
  deletePost,
  updatePost
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PostDetail))
);
