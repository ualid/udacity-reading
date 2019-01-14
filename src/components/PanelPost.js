import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deletePost, updatePost } from "../actions/posts";
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

class PanelPost extends Component {
  state = { expanded: false, post: [] };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  showDetails(e, id) {
    e.preventDefault();
    this.props.history.push(`/category/${id}`);
  }

  handlerClickEdit = post => {
    this.props.history.push({
      pathname: `/post/${post.id}`,
      id: post.id,
      post
    });
  };

  handlerClickDelete = post => {
    this.props.deletePost(post);
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      post: nextProps.post
    });
  }

  saveFavorite() {
    console.log("Favorite");
  }
  componentWillMount() {
    this.setState({
      post: this.props.post
    });
  }

  like = (post) => {
    const objSave = {
      id: post.id,
      voteScore: (post.voteScore + 1) 
    };

    this.props.updatePost(objSave);
  }
  dislike = (post) => {
    const objSave = {
      id: post.id,
      voteScore: (post.voteScore - 1) 
    };
    this.props.updatePost(objSave);
  }

  render() {
    const { classes } = this.props;
    const { post } = this.state;

    return (
      <Card className={classes.card}>
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
        <Typography component="p">Author: {post.author}</Typography>
          <Typography component="p">{post.body}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton onClick={this.saveFavorite} aria-label="Add to favorites">
            <FavoriteIcon />
            {post.voteScore}
          </IconButton>
          <IconButton
            onClick={e => this.showDetails(e, post.id)}
            aria-label="Post"
          >
            <CommentIcon label="123" />
            {post.commentCount}
          </IconButton>
          <LikeIcon onClick={() => this.like(post)}/>
          <DislikeIcon onClick={() => this.dislike(post)} />
        </CardActions>
       
      </Card>
    );
  }
}

PanelPost.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

function mapStateToProps({ posts }) {
  return {
    posts
  };
}
const mapDispatchToProps = {
  deletePost,
  updatePost
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PanelPost))
);
