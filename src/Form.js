import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { fetchPostsByCategories, addRowPost } from './actions/posts';
import { connect } from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
    title: '',
    body: '',
    author: '',
    categoriesSelected: ''
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
  
    const timestampKey = components.join("");
    const objSave = {id: timestampKey, timestamp: Date.now(), title: this.state.title, author: this.state.author, category: this.state.categoriesSelected}
    this.props.addRowPost(objSave);
    event.preventDefault()
 };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
 
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} onSubmit={this.submitHandler} noValidate autoComplete="off">
        <Grid container>
            <TextField
            id="standard-name"
            label="Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            />
        </Grid>
        <Grid container>
            <TextField
            id="standard-body"
            label="Body"
            className={classes.textField}
            value={this.state.body}
            onChange={this.handleChange('body')}
            margin="normal"
            />
        </Grid>
        <Grid container>
            <TextField
            id="standard-author"
            label="Author"
            className={classes.textField}
            value={this.state.author}
            onChange={this.handleChange('author')}
            margin="normal"
            />
        </Grid>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="categories-simple">Categories</InputLabel>
          <Select
            value={this.state.categoriesSelected}
            onChange={this.handleChange('categoriesSelected')}
            inputProps={{
              name: 'Categories',
              id: 'categories-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.categories.map((category, index) => (
              <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
 
        <Grid container direction="row" >
            <Button variant="contained" type="submit" style={{'marginLeft': '10px'}} color="primary"  >Salvar </Button>
        </Grid>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ categories }) {
  return {
    categories: categories.data.categories
  }
}
const mapDispatchToProps = {
  fetchPostsByCategories,
  addRowPost
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TextFields));
