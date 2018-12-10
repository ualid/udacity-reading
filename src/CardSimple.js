import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Panel from './Panel';
import {connect} from 'react-redux'

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  alignItemsCard: {
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SimpleCard extends Component {
  render() {
  const { classes } = this.props;
  return (
    <Card className={classes.card}>
        <CardActions>
          <Button component={Link}  to="/novoPost/" variant="contained" color="primary" className={classes.button}>
          
            Novo
          </Button>
      </CardActions>
      <CardContent>
      { this.props.posts.map((post, index) => (
                <div className="row" key={index}>
                <Panel post={post}/>
              </div>
                  )) 
                  }
      
      </CardContent>
    
    </Card>
  );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps ({posts}, { id }) {
  return {
    posts:posts.data
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleCard));
