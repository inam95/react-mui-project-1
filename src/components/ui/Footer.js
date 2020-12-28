import React from 'react';

// MUI stuff
import { makeStyles } from '@material-ui/styles';

import footerAdornment from '../../assets/Footer Adornment.svg';

const useStyle = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.arcBlue,
    width: '100%',
    zIndex: 1302,
    position: 'relative'
  },
  adornment: {
    width: '25em',
    verticalAlign: 'bottom',
    [theme.breakpoints.down('md')]: {
      width: '21em'
    },
    [theme.breakpoints.down('xs')]: {
      width: '15em'
    }
  }
}));

const Footer = () => {
  const classes = useStyle();
  return (
    <footer className={classes.footer}>
      <img
        src={footerAdornment}
        alt="black decorative slash"
        className={classes.adornment}
      />
    </footer>
  );
};

export default Footer;
