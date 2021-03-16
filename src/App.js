import './App.css';
import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import NewBlog from './components/NewBlog';

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <div style={{ flexGrow: 1 }}>
          <AppBar position="static" className={classes.navBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" className={classes.navLink}>
                  Firebase Blog site
                </Link>
              </Typography>
              <Button style={{ marginRight: '10px' }}>
                <Link to="/NewBlog" className={classes.navLink}>
                  New Blog
                </Link>
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/NewBlog">
            <NewBlog />
          </Route>
          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
