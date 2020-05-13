import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Profile from "./Profile";
import Jobs from "./Jobs";
import { Switch, withRouter, Route } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import WorkIcon from "@material-ui/icons/Work";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Notifications from "./Notifications";
import Messages from "./Messages";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(15)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
    // zIndex: "-2"
  },
  drawerPaper: {
    width: drawerWidth,
    color: "white",
    background: "#1E1E1E"
  },
  drawerContainer: {
    overflow: "auto",
    padding: theme.spacing(4)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  white: {
    color: "white"
  }
}));

function EmployersDashoard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {["Profile", "Notifications", "Jobs", "Messages"].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() =>
                    props.history.push(`/employers/dashboard/${text}`)
                  }
                >
                  <ListItemIcon>
                    {text === "Profile" ? (
                      // <InboxIcon className={classes.white} />
                      <AccountBoxIcon className={classes.white} />
                    ) : text === "Messages" ? (
                      <MailIcon className={classes.white} />
                    ) : text == "Notifications" ? (
                      <NotificationsActiveIcon className={classes.white} />
                    ) : (
                      <WorkIcon className={classes.white} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
          <Divider />
          {/* <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <InboxIcon className={classes.white} />
                  ) : (
                    <MailIcon className={classes.white} />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </div>
      </Drawer>
      <main className={classes.content}>
        {/* <Toolbar /> */}
        <h1>Welcome to dashboard</h1>
        <Switch>
          <Route path="/employers/dashboard/profile" component={Profile} />
          <Route path="/employers/dashboard/jobs" component={Jobs} />
          <Route
            path="/employers/dashboard/notifications"
            component={Notifications}
          />
          <Route path="/employers/dashboard/messages" component={Messages} />
        </Switch>
      </main>
    </div>
  );
}

function mapToProps({ candidate, employer }) {
  return { candidate, employer };
}

export default connect(mapToProps)(withRouter(EmployersDashoard));
