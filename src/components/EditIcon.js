import React from 'react';
import { addRowPost } from '../actions/posts';
import { connect } from 'react-redux'
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

const EditIcon = (props) => {
  return (
    <IconButton aria-label="EditIcon" onClick={props.onClick}>
    <SvgIcon>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditIcon);
