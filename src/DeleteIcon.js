import React from 'react';
import PropTypes from 'prop-types';
import { fetchPostsByCategories, addRowPost } from './actions/posts';
import { connect } from 'react-redux'
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

const DeleteIcon = (props) => {
  return (
    <IconButton aria-label="DeleteIcon" onClick={props.onClick}>
    <SvgIcon>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
    </SvgIcon>
  </IconButton>
  )
}
 
/*
EditIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};*/

function mapStateToProps({}, props) {
  return {
    onClick: props.onClick
  }
}
const mapDispatchToProps = {
  addRowPost
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteIcon);