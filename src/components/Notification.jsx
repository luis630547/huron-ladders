import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';

import { useUserStore } from '../zustand';

const Notification = () => {
	const [ open, setOpen ] = useState(true);
	const user = useUserStore((state) => state.user);

	return (
		<Snackbar
			style={{ marginTop: '4rem' }}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={user.handle && open}
			autoHideDuration={3000}
			onClose={() => setOpen(false)}
		>
			<Alert severity="success" variant="filled">
				Success! Welcome {user.firstName} {user.lastName}!
			</Alert>
		</Snackbar>
	);
};

export default Notification;
