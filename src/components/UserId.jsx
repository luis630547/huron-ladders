import React, { Fragment } from 'react';
import { Button, Avatar, makeStyles } from '@material-ui/core';
import { useUserStore } from '../zustand';

const useStyles = makeStyles((theme) => ({
	avatarStyle: {
		width: theme.spacing(3),
		height: theme.spacing(3)
	}
}));

const UserId = () => {
	const classes = useStyles();
	const user = useUserStore((state) => state.user);
	if (user && user.handle) {
		return (
			<Fragment>
				<Button color="inherit">{user.firstName}</Button>
				<Avatar src={user.avatar} className={classes.avatarStyle} />
			</Fragment>
		);
	}

	return null;
};

export default UserId;
