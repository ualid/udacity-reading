import React from 'react';
import { addRowPost } from '../actions/posts';
import { connect } from 'react-redux'
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

const LikeIcon = (props) => {
  return (
    <IconButton aria-label="LikeIcon" onClick={props.onClick}>
    <SvgIcon>
      <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z" />
    </SvgIcon>
  </IconButton>
  )
}
 
function mapStateToProps({}, props) {
  return {
    onClick: props.onClick
  }
}
const mapDispatchToProps = {
  addRowPost
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeIcon);
