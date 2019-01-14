import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { addCommenter, updateCommenter } from '../actions/comments';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class TextFields extends React.Component {
  state = {
    body: '',
    author: '',
    id: null,
    show: false
  };
  submitHandler = event => {
    var date = new Date();
    var components = [
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ];

    if (this.state.id === null) {
      const timestampKey = components.join("");
      const objSave = {
        id: timestampKey,
        timestamp: Date.now(),
        parentId: this.props.parentId,
        author: this.state.author,
        body: this.state.body
      }

      this.props.addCommenter(objSave);
    } else {
      const objSave = {
        id: this.state.id,
        timestamp: Date.now(),
        parentId: this.props.parentId,
        author: this.state.author,
        body: this.state.body
      }

      this.props.updateCommenter(objSave);

    }
    event.preventDefault()
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    if(nextProps.commenter !== null){
      this.setState({
        id: nextProps.commenter.id,
        body: nextProps.commenter.body,
        author: nextProps.commenter.author
      })
    }else{
      this.setState({
        body: null,
        author: null,
        id: null
      })
    }


  }
  componentDidMount() {
    if (this.props.commenter !== null) {
      this.setState({
        id: this.props.commenter.id,
        body: this.props.commenter.body,
        author: this.props.commenter.author
      });
    } else {
      this.setState({
        body: null,
        author: null,
        id: null
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <ValidatorForm className={classes.container} onSubmit={this.submitHandler} noValidate autoComplete="off">
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <TextValidator
            id="standard-body"
            label="Body"
            name="body"
            className={classes.textField}
            value={this.state.body || ''}
            onChange={this.handleChange('body')}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <TextValidator
            id="standard-author"
            label="Author"
            className={classes.textField}
            value={this.state.author || ''}
            onChange={this.handleChange('author')}
            margin="normal"
            name="author"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>

        <br />
        <Grid container direction="row" >
          <Button variant="contained" type="submit" style={{ 'marginLeft': '10px' }} color="primary"  >Salvar </Button>
        </Grid>
        <br />
      </ValidatorForm>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ categories }, props) {
  return {
    categories: categories.data.categories,
    parentId: props.parentId,
    commenter: props.commenter
  }
}
const mapDispatchToProps = {
  addCommenter,
  updateCommenter
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TextFields));
