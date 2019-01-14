import React from 'react'
import { NavLink } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

export default function Nav () {
  return (
     <div>
     <AppBar position="static" color="default">
       <Toolbar>
         <Typography variant="h6" color="inherit">
         <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
         </Typography>
       </Toolbar>
     </AppBar>
   </div>
  )
}