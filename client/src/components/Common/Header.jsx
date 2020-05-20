import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography,
  Button,
  Icon,
  Link
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./Header.scss";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  margin: {
    color: "white"
    // backgroundColor: "white"
  },
  drawer: {
    color: "white"
  },
  button: {
    color: "white"
  },
  search: {
    position: "relative",
    marginLeft: "8px",
    width: "auto",
    float: "left",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  searchIcon: {
    width: 119,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  appBar: {
    padding: "1rem 0",
    // marginBottom: "2rem"
    // zIndex: "5555555555",
    zIndex: theme.zIndex.drawer + 1
  }
});
class Header extends React.Component {
  constructor() {
    super();
    this.state = { anchorEl: null };
  }
  // const [anchorEl, setAnchorEl] = React.useState(null);

  handleClick = event => {
    // setAnchorEl(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    // setAnchorEl(null);
    this.setState({ anchorEl: null });
  };

  handleCloseAndLogout = () => {
    // setAnchorEl(null);
    this.setState({ anchorEl: null });
    this.props.handleLogout();
    this.props.history.push("/");
  };

  render() {
    console.log(this.props, "from header");
    const { classes } = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
          <Link href="/"><img
              className="logo_job"
              src="https://lh3.googleusercontent.com/pw/ACtC-3ewkA_FaRzGusIEIH6ra-9KVBIjNOvaH_qVaxcOAuppSEWKvhw6WwOQXii595yi06hnBrCN6fbzKHUox-j5AgvaH9M577VK5PggX0C8h-zT6iaeq7bdt1S7Vq2jMjniaH8GgUhGrtMBVuMN0SFA44-b=w659-h609-no?authuser=0"
            /></Link>
          </Typography>
          <div className={classes.grow} />
          {/* <div className={classes.search}>
<div className={classes.searchIcon}>
<SearchIcon />
</div>
<InputBase
placeholder="Search…"
classes={{
root: classes.inputRoot,
input: classes.inputInput
}}
/>
</div> */}
          {/* <div></div> */}
          {this.props.currentCandidate ? (
            <Typography variant="h6" color="inherit" noWrap>
              {this.props.currentCandidate.email}
            </Typography>
          ) : this.props.currentEmployer ? (
            <Typography variant="h6" color="inherit" noWrap>
              {this.props.currentEmployer.email}
            </Typography>
          ) : (
            ""
          )}
          <div>
            {this.props.currentCandidate || this.props.currentEmployer ? (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-haspopup="true"
                  className={classes.margin}
                >
                  <AccountCircleIcon fontSize="inherit" />
                </IconButton>
              </>
            ) : (
              ""
            )}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                className={classes.drawer}
              >
                <MenuIcon />
              </IconButton>
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {this.props.currentEmployer ? (<>
                <MenuItem onClick={this.handleCloseAndLogout}>Logout</MenuItem>
                <MenuItem onClick={this.handleClose}>
                    <Link href="/employers/dashboard/Profile">Dashboard</Link>
                  </MenuItem>

              </>) :this.props.currentCandidate ? (<>
                <MenuItem onClick={this.handleCloseAndLogout}>Logout</MenuItem>
                <MenuItem onClick={this.handleClose}>
                    <Link href="/candidates/dashboard/Profile">Dashboard</Link>
                  </MenuItem>

              </>):(
                <>
                  <MenuItem onClick={this.handleClose}>
                    <Link href="/candidates/login">Candidates</Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link href="/employers/login">Employer</Link>
                  </MenuItem>
                </>)}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Header));
// return (
//   <>
//     <div class="container">
//       <div class="row">
//         <nav class={this.state.active ? "col-sm-12" : "col-sm-12 open"}>
//           <div
//             onClick={() => this.setState({ active: !this.state.active })}
//             class={this.state.active ? "navToggle" : "navToggle open"}
//           >
//             <div class="icon-left"></div>
//             <div class="icon-right"></div>
//           </div>
//           <img
//             onClick={() => this.setState({ active: !this.state.active })}
//             class="logo"
//             src="https://lh3.googleusercontent.com/Ge8Zhgw7aCP64OBxt_CqhQXc52mRhRMzIG5kvEJ_scvXn9m0ieoPRV__wQwBNEPy5Lf7LX6ruAoYhztVbBIglgt3EphR1WUr7iskVQyDbjJ2XJx7HR70HjdnWTemqoB59DR-dTjvO7yVmdEsbe-u_eBnY9FuJjXRkyKrj75Da_hrVkPHuN9D_ZOvtM8lKu-JywRPND0kNA_rj3wickgxKKLz5Gg0c9JehgzNiOhiz0SWO8VbtA_EvgEG3bb6Mazy5ik_Uts5B6mCWWmQ4PiXkXu6lW4h6HvcTyPIG6DnV8nWNYcI_r-5V9W-oD3WP9fVdeVYjLHSevX3SFO56AiosF28FMaIM353e5tMMNyqqp8KsxaoYwQ7z0fyMohpRcmnLsMWhq2hNfxeT7q5ghVkEhEgELMjYME29-ohdYiubEXvYOsoj4V5QjhY-wPs0mWDWWQFTf0KHYrnTYLevvalXONkRf3NotRSD6b3n_qVwFaWui0NNGTY94TnWHVxPqBoWixYkIdJDA8Tos8WEPKiWqdol1LdlsDVW0RFWrQQijM1FVwUioacYAmR0plGkVwP4HN2LmA0Bve08Yt0Rj8OC2_LZj-beFc6OL_v6hmA_D_Avikd5gcC4Fw8yZyO69zX8c0UpxTZzLYnqMvd-FeLX_lwwTJ3KmjRV7a8-R2jQsM4ngx9vAJ0_QwjwY94jMaPqMeEPT4Dk4y6RSsxnKyDYzc3ADOykKQnKk-0f7bFJCy3fFbfZLKwmw=w452-h300-no"
//           />

//           <h2>
//             <span style={{ fontSize: "1rem" }}>
//               {this.props.currentCandidate
//                 ? this.props.currentCandidate.email
//                 : this.props.currentEmployer
//                 ? this.props.currentEmployer.email
//                 : ""}
//             </span>
//             {this.props.currentCandidate || this.props.currentEmployer ? (
//               <span
//                 style={{ fontSize: "1.4rem" }}
//                 onClick={this.handleLogout}
//               >
//                 <button class="pure-material-button-contained top_btns">
//                   Logout
//                 </button>
//               </span>
//             ) : (
//               <Link to="/candidates/login">
//                 <button class="pure-material-button-contained top_btns">
//                   Login
//                 </button>
//               </Link>
//             )}
//             <Link to="/employers/login">
//               <button class="pure-material-button-contained top_btns">
//                 For Employers
//               </button>
//             </Link>
//           </h2>
//           <ul>
//             <li>
//               <div class="form__group">
//                 <input
//                   type="text"
//                   id="email"
//                   class="form__field"
//                   placeholder="Job Title"
//                 />
//                 <label for="email" class="form__label">
//                   Job Title
//                 </label>
//               </div>
//               <div class="form__group">
//                 <input
//                   type="text"
//                   id="email"
//                   class="form__field"
//                   placeholder="Location"
//                 />
//                 <label for="email" class="form__label">
//                   Location or Remote
//                 </label>
//               </div>
//               <button class="pure-material-button-contained">
//                 Find Jobs
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   </>
// );
