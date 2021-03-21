import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';

import { logout } from './../services/index';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: 'darkblue',
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: '25px 10px',
  },
  userAppbar: {
    display: 'flex',
    width: '100vw',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconbuttons: {
    color: 'white',
    fontSize: '36px',
    borderRadius: '10px',
    marginLeft: '15px',
    height: '60px',
    width: '70px',
    '&:hover': {
      backgroundColor: 'black',
      border: '3px solid white',
      transition: '600ms',
    },
  },
  textbutton: {
    color: 'white',
    width: '180px',
    fontSize: '20px',
    fontWeight: '600',
    marginRight: '25px',
    height: '60px',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: 'black',
      border: '3px solid white',
      borderRadius: '10px',
      transition: '600ms',
    },
  },
}));

function Header({ history, ...props }) {
  const classes = useStyles();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [history.location]);

  return (
    <AppBar className={classes.appbar} position="static">
      <ToolBar className={classes.toolbar}>
        {user ? (
          <div className={classes.userAppbar}>
            <div>
              <Tooltip title="Über­sicht" arrow>
                <Button href="/" className={classes.iconbuttons}>
                  <HomeIcon fontSize="inherit" color="inherit" />
                </Button>
              </Tooltip>

              <Tooltip title="Aufgaben managen" arrow>
                <Button href="/admin" className={classes.iconbuttons}>
                  <BuildIcon color="inherit" fontSize="inherit" />
                </Button>
              </Tooltip>
            </div>
            <div>
              <Button
                onClick={() => logout(history)}
                className={classes.textbutton}
              >
                Log Out
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button href="/login" className={classes.textbutton}>
              Log In
            </Button>

            <Button href="/register" className={classes.textbutton}>
              Anmelden
            </Button>
          </div>
        )}
      </ToolBar>
    </AppBar>
  );
}

export default withRouter(Header);
