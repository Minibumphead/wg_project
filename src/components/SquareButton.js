import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50px',
    height: '50px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    backgroundColor: '#f6f6f6',
    '&:hover': {
      cursor: 'pointer',
      background: 'rgb(230,230,230)',
    },
  },
}));

export default function SquareButton({ handleClick, icon, ...props }) {
  const classes = useStyles();

  return (
    <button onClick={handleClick} className={classes.root}>
      {props.children}
    </button>
  );
}
