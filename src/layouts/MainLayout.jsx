import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Menu as MenuIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	Home as HomeIcon,
	AccountCircle as UserIcon,
	List as ListIcon
} from '@material-ui/icons';
import { Link, Route } from 'react-router-dom';
import {
	IconButton,
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	ListItem,
	ListItemIcon
} from '@material-ui/core';

import HomeLayout from './HomeLayout';
import ProfileLayout from "./ProfileLayout";
import ProblemListLayout from './ProblemListLayout';
import UserId from '../components/UserId';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		backgroundColor: "#20507A",
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},

	menuLink: {
		textDecoration: 'none',
		color: "#000",
	}
}));

const MainLayout = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [ open, setOpen ] = useState(false);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpen(true)}
						edge="start"
						className={clsx(
							classes.menuButton,
							open && classes.hide
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
						Huron Ladders
					</Typography>
					<UserId />
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => setOpen(false)}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />

				<List>
						<Link to="/" className={classes.menuLink}>
					<ListItem button>
						<ListItemIcon>
							<HomeIcon style={{color: "#20507A"}} />
						</ListItemIcon>
							Inicio
					</ListItem>
						</Link>
						<Link to="/profile" className={classes.menuLink}>
					<ListItem button>
						<ListItemIcon>
							<UserIcon style={{color: "#20507A"}} />
						</ListItemIcon>
							Perfil
					</ListItem>
						</Link>
				</List>
				<Divider />
				<List>
						<Link to="/basicos" className={classes.menuLink}>
					<ListItem button>
						<ListItemIcon>
							<ListIcon style={{color: "#20507A"}} />
						</ListItemIcon>
							Hurones Básicos
					</ListItem>
						</Link>
						<Link to="/intermedios" className={classes.menuLink}>
					<ListItem button>
						<ListItemIcon>
						<ListIcon style={{color: "#20507A"}} />
						</ListItemIcon>
							Hurones Intermedios
					</ListItem>
						</Link>
						<Link to="/avanzados" className={classes.menuLink}>
					<ListItem button>
						<ListItemIcon>
						<ListIcon style={{color: "#20507A"}} />
						</ListItemIcon>
							Hurones Avanzados
					</ListItem>
						</Link>
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />

				<Route path="/" exact>
					<HomeLayout />
				</Route>
				<Route path="/profile">
					<ProfileLayout />
				</Route>
				<Route path="/basicos">
					<ProblemListLayout huron={1} />
				</Route>
				<Route path="/intermedios">
					<ProblemListLayout huron={2} />
				</Route>
				<Route path="/avanzados">
					<ProblemListLayout huron={3} />
				</Route>
			</main>
		</div>
	);
};

export default MainLayout;
