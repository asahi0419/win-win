import React from 'react'
import classNames from 'classnames'
// import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
// core components
// import AdminNavbarLinks from '../Navbar/AdminNavbarLinks'
import sidebarStyle from '../../assets/jss/material-dashboard-react/components/sidebarStyle'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectTabAction, selectTabValue, selectPrevTabValue } from '../../store/tab'

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName: any) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false
  }
  const { classes, color, image, routes } = props

  const tabValue = useAppSelector(selectTabValue)
  const prevTabValue = useAppSelector(selectPrevTabValue)
  const history = useHistory()
  const dispatch = useAppDispatch()

  React.useState(() => {
    history.push('/admin/dashboard')
  })

  React.useEffect(() => {
    if (prevTabValue !== tabValue) {
      let path = '#',
        initKey = 9999
      routes.map((prop: any, key: any) => {
        if (prop.layout === '/admin' && prop.tabIndex === tabValue && initKey > key) {
          path = prop.layout + prop.path
          initKey = key
        }
        return null
      })
      dispatch(selectTabAction(tabValue))
      history.push(path)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, tabValue])

  var links = (
    <List className={classes.list}>
      {routes.map((prop: any, key: any) => {
        var activePro = ' '
        var listItemClasses
        if (prop.tabIndex === tabValue) {
          if (prop.path === '/upgrade-to-pro') {
            activePro = classes.activePro + ' '
            listItemClasses = classNames({
              [' ' + classes[color]]: true,
            })
          } else {
            listItemClasses = classNames({
              [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
            })
          }
          const whiteFontClasses = classNames({
            [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
          })
          // if (firstPage === '')
          //   setFirstPage(prop.layout + prop.path);
          return (
            <NavLink
              to={prop.layout + prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button={true} className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === 'string' ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  />
                )}
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          )
        }
        return null
      })}
    </List>
  )

  var brand = (
    <div className={classes.logo}>
      <span
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
      >
        <div className={classes.logoImage}>
          <img src="/logo.svg" alt="logo" className={classes.img} />
        </div>
      </span>
    </div>
  )
  return (
    <div>
      {/* <Hidden mdUp={true} implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden> */}
      <Hidden smDown={true} implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open={true}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div className={classes.background} style={{ backgroundImage: 'url(' + image + ')' }} />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  )
}

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(sidebarStyle)(Sidebar)
