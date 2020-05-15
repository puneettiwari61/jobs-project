import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from "./table"
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: '#44b700',
		color: '#44b700',
		width: '1.5rem',
		height: '1.5rem',
		borderRadius: '50%',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '1.5rem',
			height: '1.5rem',
			borderRadius: '50%',
			animation: '$ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
	root: {
		width: 25,
		height: 25,
		border: `2px solid ${theme.palette.background.paper}`,
	},
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  fab: {
    position:"absolute",
    right:'0',
    top:"6.7rem"
  },
  h1: {
		// ...theme.typography.button,
    fontSize: '2rem',
    paddingTop:'6rem',
    font:"200",
    color:'white'

  },
  h1_input: {
		// ...theme.typography.button,
    paddingTop:'6rem',
    color:"white",
    background:'transparent',
    border:0,
    outline:"0",
    fontSize:'2rem'
  },
  h2_input: {
		// ...theme.typography.button,
    border:0,
    outline:"0",
    borderBottom:"1px solid white",
    fontSize:'1.3rem',
    width:"100%",
    textDecoration:'underline',
    wordBreak:"break-all"
  },
  h2: {
		// ...theme.typography.button,
    fontSize: '1.3rem',
    font:"100",
    color: "#231e39",
    background:'white'
    
  },
  box: {
    padding:'.1rem',
    // width:'35rem',
    background: "#231e39"
  },
	root: {
    display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
    },
  },
  root1: {
    display: 'flex',
    color:'white',
    '& > *': {
      border:0,
    },
	},
}));

function Profile(props) {
  const classes = useStyles();
const [open, setOpen] = React.useState(true);
  

	return (<div>
		<div className={classes.box}>
			<div className={classes.root}>
				<StyledBadge
					overlap="circle"
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					variant="dot"
				>
					<Avatar
						alt="Remy Sharp"
						src={props.candidate.currentCandidate.image}
						style={{ height: '10rem', width: '10rem' }}
					/>
				</StyledBadge>
				{/* <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />}
      >
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </Badge> */}
      {open ? <div className={classes.h1}>{props.candidate.currentCandidate.firstName+' '+props.candidate.currentCandidate.lastName}</div> :<div>
      <form className={classes.root1} noValidate autoComplete="off">
      <input className={classes.h1_input} placeholder={props.candidate.currentCandidate.firstName+' '+props.candidate.currentCandidate.lastName }/>
    </form></div>
    }
			
      {open?<Tooltip title="Edit" aria-label="add" className={classes.fab}  onClick={() => setOpen(!open)}>
        <Fab color="primary" >
          <EditIcon/>
        </Fab>
        </Tooltip>:<Tooltip title="Save" aria-label="add" className={classes.fab}  onClick={() => setOpen(!open)}>
        <Fab color="primary" >
          <DoneIcon/>
        </Fab>
        </Tooltip>}
			</div>
			{open?<div className={classes.h2}>Recent Computer Science graduate seeking to use my backend development experience in an entry-level position at Any Software Industry</div>:<textarea autofocus className={classes.h2_input} value={"Recent Computer Science graduate seeking to use my backend development experience in an entry-level position at Any Software Industry"} />}

		</div><br/>
    <div className={classes.box}>
      <Table/>
    </div>
      
    </div>
	);
}

function mapToProps({ candidate, employer }) {
	return { candidate, employer };
}

export default connect(mapToProps)(withRouter(Profile));
