import FlatButton from '@component/Button';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  normalTab: {
    backgroundColor: 'white',
  },
}));

const FlatTab = ({ label, value, index, onClick, ...props }) => {
  const classes = useStyles();

  return (
    <FlatButton
      color={value === index ? 'primary' : 'default'}
      className={clsx(value !== index && classes.normalTab)}
      onClick={() => {
        if (onClick && typeof onClick === 'function') {
          onClick(index);
        }
      }}
      {...props}>
      {label}
    </FlatButton>
  );
};

export default FlatTab;
