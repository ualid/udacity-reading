import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { fetchPostsByCategories, addPost, updatePost } from "../actions/posts";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class TextFields extends React.Component {
  state = {
    title: "",
    body: "",
    author: "",
    categoriesSelected: "",
    id: ""
  };
  componentDidMount() {
    if (this.props.post.length > 0) {
      const post = this.props.post[0];
      this.setState({
        title: post.title,
        author: post.author,
        body: post.body,
        categoriesSelected: post.category,
        id: post.id
      });
    }
  }
  createTimestamp = () => {
    var date = new Date();
    return ([
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ]);
    
  }
  submitHandler = event => {
    const components = this.createTimestamp();
    if (this.state.id === "") {
      const timestampKey = components.join("");
      const objSave = {
        id: timestampKey,
        timestamp: Date.now(),
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        category: this.state.categoriesSelected
      };

      const result = this.props.addPost(objSave);
    } else {
      const objSave = {
        id: this.state.id,
        timestamp: Date.now(),
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        category: this.state.categoriesSelected
      };

      this.props.updatePost(objSave);
    }
    event.preventDefault();
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <ValidatorForm
        ref="form"
        className={classes.container}
        onSubmit={this.submitHandler}
        noValidate
        autoComplete="off"
        onError={errors => console.log(errors)}
      >
        <Grid container>
          <TextValidator
            label="Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange("title")}
            name="title"
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>
        <Grid container>
          <TextValidator
            id="standard-body"
            label="Body"
            name="body"
            className={classes.textField}
            value={this.state.body}
            onChange={this.handleChange("body")}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>
        <Grid container>
          <TextValidator
            id="standard-author"
            label="Author"
            name="author"
            className={classes.textField}
            value={this.state.author}
            onChange={this.handleChange("author")}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>

        <FormControl className={classes.formControl}>
          <SelectValidator
            value={this.state.categoriesSelected}
            onChange={this.handleChange("categoriesSelected")}
            name="categories"
            label="Categories"
            inputProps={{
              name: "Categories",
              id: "categories-simple"
            }}
            validators={["required"]}
            errorMessages={["this field is required"]}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.categories.map((category, index) => (
              <MenuItem key={index} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </SelectValidator>
        </FormControl>

        <Grid container direction="row">
          <Button
            variant="contained"
            type="submit"
            style={{   marginTop: "20px" }}
            color="primary"
          >
            Save
          </Button>
        </Grid>
      </ValidatorForm>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ categories, posts }, props) {
  let post = null;
  let id = null;
  if (props.match.hasOwnProperty("params")) {
    id = props.match.params.id;
    post = posts.data.filter(post => post.id === id);
  }

  return {
    categories: categories.data.categories,
    id,
    post
  };
}
const mapDispatchToProps = {
  fetchPostsByCategories,
  addPost,
  updatePost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TextFields));
