import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    textDecoration: 'none',
    color: 'black',
  },
  navBar: {
    backgroundColor: 'transparent',
  },
  btnGroup: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
