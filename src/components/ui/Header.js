import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import makeStyles from '@material-ui/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import MenuIcon from '@material-ui/icons/Menu';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em'
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    }
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px'
  },
  button: {
    ...theme.typography.estimate,
    marginLeft: '50px',
    borderRadius: '50px',
    marginRight: '50px',
    height: '45px'
  },
  menu: {
    backgroundColor: theme.palette.common.arcBlue,
    color: '#fff',
    borderRadius: 0
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    }
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  drawerIcon: {
    height: '50px',
    width: '50px'
  },
  drawer: {
    backgroundColor: theme.palette.common.arcBlue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: '#fff',
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.arcOrange
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1
    }
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1
  }
}));

const Header = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClicked = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const menuOptions = useMemo(() => {
    return [
      { name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
      {
        name: 'Custom Software Development',
        link: '/custom-software',
        activeIndex: 1,
        selectedIndex: 1
      },
      {
        name: 'Mobile Apps Development',
        link: '/mobile-apps',
        activeIndex: 1,
        selectedIndex: 2
      },
      {
        name: 'Website Development',
        link: '/websites',
        activeIndex: 1,
        selectedIndex: 3
      }
    ];
  }, []);

  const routes = useMemo(() => {
    return [
      { name: 'Home', link: '/', activeIndex: 0 },
      {
        name: 'Services',
        link: '/services',
        activeIndex: 1,
        ariaOwns: anchorEl ? 'simple-menu' : undefined,
        ariaPopup: anchorEl ? true : false,
        mouseover: handleClick
      },
      { name: 'The Revolution', link: '/revolution', activeIndex: 2 },
      { name: 'About Us', link: '/about', activeIndex: 3 },
      { name: 'Contact Us', link: '/contact', activeIndex: 4 }
    ];
  }, [anchorEl]);

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [menuOptions, routes, selectedIndex, value]);

  const tabs = (
    <>
      <Tabs
        value={value}
        className={classes.tabContainer}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            label={route.name}
            component={Link}
            to={route.link}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseover}
          />
        ))}
      </Tabs>
      <Button className={classes.button} variant="contained" color="secondary">
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        elevation={0}
        anchorEl={anchorEl}
        keepMounted
        style={{ zIndex: 1302 }}
        open={open}
        classes={{ paper: classes.menu }}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        {menuOptions.map(({ link, name }, index) => (
          <MenuItem
            key={`${name}${index}`}
            classes={{ root: classes.menuItem }}
            component={Link}
            to={link}
            selected={index === selectedIndex && value === 1}
            onClick={(e) => {
              handleMenuItemClicked(e, index);
              setValue(1);
              handleClose(e);
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route, index) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              selected={value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              component={Link}
              to={route.link}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            component={Link}
            to="/estimate"
            button
            divider
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected
            }}
            selected={value === 5}
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img src={logo} alt="Company logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
