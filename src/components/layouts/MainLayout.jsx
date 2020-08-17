import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import ProblemList from "../ProblemList";
import HomeLayout from './HomeLayout';
import { Avatar,  Button } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  menuItemButton: {
    textDecoration: "none",
    color: "#000",
    display: "block",
    width: "100%"
  },

  avatarStyle: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [basicos, setBasicos]= useState([]);
  const [intermedios, setIntermedios]= useState([]);
  const [avanzados, setAvanzados]= useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3004/basicos`)
            .then(res => res.json())
            .then(basicos => setBasicos(basicos));
        fetch(`http://localhost:3004/intermedios`)
            .then(res => res.json())
            .then(intermedios => setIntermedios(intermedios));
        fetch(`http://localhost:3004/avanzados`)
            .then(res => res.json())
            .then(avanzados => setAvanzados(avanzados));
    }, []);

    const fetchSubmissions = (problems, setProblems) => {
      setIsLoading(true);
        const cleared = problems.map(pr => {
            pr.status = 0;
            return pr;
        })
        setProblems(cleared)
        if(!user.handle || user.handle.length < 3) {
            alert("Ingresa tu handle en Home")
            setIsLoading(false);
            return;
        }
        console.log("submissions!");
        fetch(`https://codeforces.com/api/user.status?handle=${user.handle}`)
        .then(res => res.json())
        .then(data => data.result.filter(s => s.verdict === "OK"))
        .then(subs => {
            let arr = [...problems];
            arr.forEach(pro => {
                const sol = subs.find(sub => pro.contest === sub.problem.contestId && pro.letter === sub.problem.index)
                if(sol && sol.verdict === "OK") {
                    pro.status = sol.id;
                }
            })
            setProblems(arr);
            setIsLoading(false);
        })
    }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
        <Router>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{flexGrow: 1}}>
            Huron Ladders
          </Typography>
            {user && user.handle && (
            <>
                <Button color="inherit">{user.handle}</Button>
                <Avatar src={user.avatar} className={classes.avatarStyle} />
            </>
            )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        
        <List>
            <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <Link to="/" className={classes.menuItemButton}>Home</Link>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <Link to="/basicos" className={classes.menuItemButton}>Hurones Básicos</Link>
            </ListItem>
            <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <Link to="/intermedios" className={classes.menuItemButton}>Hurones Intermedios</Link>
            </ListItem>
            <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <Link to="/avanzados" className={classes.menuItemButton}>Hurones Avanzados</Link>
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        
            <Route path="/" exact>
                <HomeLayout setUser={setUser} />
            </Route>
            <Route path="/basicos">
                <h2>Hurones Basicos</h2>
                {user.handle && user.handle.length > 3 && (
                    <Button color="primary" onClick={() => fetchSubmissions(basicos, setBasicos)} variant="contained">Fetch</Button>
                )}
                <ProblemList problems={basicos} isLoading={isLoading} />
            </Route>
            <Route path="/intermedios">
                <h2>Hurones Intermedios</h2>
                {user.handle && user.handle.length > 3 && (
                    <Button color="primary" onClick={() => fetchSubmissions(intermedios, setIntermedios)} variant="contained">Fetch</Button>
                )}
                <ProblemList problems={intermedios} isLoading={isLoading} />
            </Route>
            <Route path="/avanzados">
                <h2>Hurones Avanzados</h2>
                {user.handle && user.handle.length > 3 && (
                    <Button color="primary" onClick={() => fetchSubmissions(avanzados, setAvanzados)} variant="contained">Fetch</Button>
                )}
                <ProblemList problems={avanzados} isLoading={isLoading} />
            </Route>
      </main>
      </Router>
    </div>
  );
}
