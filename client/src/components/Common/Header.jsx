import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		padding: theme.spacing(0, 2),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '50ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

export default function Header(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>
				<Link to="/candidates/login">Login </Link>
			</MenuItem>

			<MenuItem onClick={handleMenuClose}>
				<Link to="/employers/login"> Emmployer </Link>
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						Steve's Jobs
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{/* <IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={17} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton> */}

						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
							edge="end"
						>
							<AccountCircle />
						</IconButton>

						<IconButton
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}

// class Header extends Component {
//   constructor() {
//     super();
//     this.state = { active: true };
//   }

//   handleLogout = () => {
//     localStorage.clear();
//     this.props.logoutFunction();
//   };

//   render() {
//     console.log(this.props, "from header");
//     return (
//       <>
//         <div class="container">
//           <div class="row">
//             <nav class={this.state.active ? "col-sm-12" : "col-sm-12 open"}>
//               <div
//                 onClick={() => this.setState({ active: !this.state.active })}
//                 class={this.state.active ? "navToggle" : "navToggle open"}
//               >
//                 <div class="icon-left"></div>
//                 <div class="icon-right"></div>
//               </div>
//               <img
//                 onClick={() => this.setState({ active: !this.state.active })}
//                 class="logo"
//                 src="https://lh3.googleusercontent.com/Ge8Zhgw7aCP64OBxt_CqhQXc52mRhRMzIG5kvEJ_scvXn9m0ieoPRV__wQwBNEPy5Lf7LX6ruAoYhztVbBIglgt3EphR1WUr7iskVQyDbjJ2XJx7HR70HjdnWTemqoB59DR-dTjvO7yVmdEsbe-u_eBnY9FuJjXRkyKrj75Da_hrVkPHuN9D_ZOvtM8lKu-JywRPND0kNA_rj3wickgxKKLz5Gg0c9JehgzNiOhiz0SWO8VbtA_EvgEG3bb6Mazy5ik_Uts5B6mCWWmQ4PiXkXu6lW4h6HvcTyPIG6DnV8nWNYcI_r-5V9W-oD3WP9fVdeVYjLHSevX3SFO56AiosF28FMaIM353e5tMMNyqqp8KsxaoYwQ7z0fyMohpRcmnLsMWhq2hNfxeT7q5ghVkEhEgELMjYME29-ohdYiubEXvYOsoj4V5QjhY-wPs0mWDWWQFTf0KHYrnTYLevvalXONkRf3NotRSD6b3n_qVwFaWui0NNGTY94TnWHVxPqBoWixYkIdJDA8Tos8WEPKiWqdol1LdlsDVW0RFWrQQijM1FVwUioacYAmR0plGkVwP4HN2LmA0Bve08Yt0Rj8OC2_LZj-beFc6OL_v6hmA_D_Avikd5gcC4Fw8yZyO69zX8c0UpxTZzLYnqMvd-FeLX_lwwTJ3KmjRV7a8-R2jQsM4ngx9vAJ0_QwjwY94jMaPqMeEPT4Dk4y6RSsxnKyDYzc3ADOykKQnKk-0f7bFJCy3fFbfZLKwmw=w452-h300-no"
//               />

//               <h2>
//                 <span style={{ fontSize: "1rem" }}>
//                   {this.props.candidateData
//                     ? this.props.candidateData.email
//                     : this.props.employerData
//                     ? this.props.employerData.email
//                     : ""}
//                 </span>
//                 {this.props.candidateData || this.props.employerData ? (
//                   <span
//                     style={{ fontSize: "1.4rem" }}
//                     onClick={this.handleLogout}
//                   >
//                     <button class="pure-material-button-contained top_btns">
//                       Logout
//                     </button>
//                   </span>
//                 ) : (
//                   <Link to="/candidates/login">
//                     <button class="pure-material-button-contained top_btns">
//                       Login
//                     </button>
//                   </Link>
//                 )}
//                 <Link to="/employers/login">
//                   <button class="pure-material-button-contained top_btns">
//                     For Employers
//                   </button>
//                 </Link>
//               </h2>
//               <ul>
//                 <li>
//                   <div class="form__group">
//                     <input
//                       type="text"
//                       id="email"
//                       class="form__field"
//                       placeholder="Job Title"
//                     />
//                     <label for="email" class="form__label">
//                       Job Title
//                     </label>
//                   </div>
//                   <div class="form__group">
//                     <input
//                       type="text"
//                       id="email"
//                       class="form__field"
//                       placeholder="Location"
//                     />
//                     <label for="email" class="form__label">
//                       Location or Remote
//                     </label>
//                   </div>
//                   <button class="pure-material-button-contained">
//                     Find Jobs
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default Header;
