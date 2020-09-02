import React, { Fragment } from 'react';
import { Button, Avatar, makeStyles, Hidden } from '@material-ui/core';
import { useUserStore } from '../zustand';

const useStyles = makeStyles((theme) => ({
	avatarStyle: {
		marginLeft: "1rem",
		
	}
}));

const UserId = () => {
	const classes = useStyles();
	const user = useUserStore((state) => state.user);
	if (user && user.handle) {
		return (
			<Fragment>
				<Button color="inherit" href="/profile">
					{user.firstName}{` `}
					<Hidden only="xs">
						{user.lastName}
					</Hidden>
				</Button>
				<Avatar src={user.avatar} className={classes.avatarStyle} />
			</Fragment>
		);
	}

	return null;
};

export default UserId;
