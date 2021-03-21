import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: ' 1em',
    paddingLeft: '5px',
    background: '#f6f6f6',
    borderRadius: '5px',
    border: 'none',
    minHeight: '50px',
    flex: 1,
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: 'rgb(230,230,230)',
      cursor: 'pointer',
    },
  },
}));

export default function Select({
  options,
  value,
  handleChange,
  label,
  ...props
}) {
  const classes = useStyles();
  return (
    <select
      className={classes.root}
      onChange={handleChange}
      value={value}
      {...props}
    >
      <option value="" key="" disabled>
        {label}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
