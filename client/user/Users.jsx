import React, { useState, useEffect } from "react";
import {
Paper,
List,
ListItem,
ListItemAvatar,
ListItemText,
ListItemSecondaryAction,
IconButton,
Avatar,
Typography,
Link,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { list, update } from "./api-user.js";
import { Link as RouterLink } from "react-router-dom";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import auth from "../lib/auth-helper";
export default function Users() {
const [users, setUsers] = useState([]);
const jwt = auth.isAuthenticated();
const meIsAdmin = jwt && jwt.user && jwt.user.isAdmin;
useEffect(() => {
const abortController = new AbortController();
const signal = abortController.signal;
list(signal).then((data) => {
if (data?.error) {
console.log(data.error);
} else {
setUsers(data);
}
});
return () => abortController.abort();
}, []);
return (
<Paper
elevation={4}
sx={{
maxWidth: 600,
mx: "auto",
mt: 5,
p: 3,
}}
>
<Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
All Users
</Typography>
			<List dense>
				{users.map((item) => (
					<ListItem key={item._id}>
						<ListItemAvatar>
							<Avatar />
						</ListItemAvatar>
						<ListItemText primary={item.name} secondary={item.email} />
						<ListItemSecondaryAction>
							{meIsAdmin && (
								<FormControlLabel
									control={
										<Switch
											checked={!!item.isAdmin}
											onChange={async () => {
												try {
													const res = await update({ userId: item._id }, { t: jwt.token }, { isAdmin: !item.isAdmin });
													if (!res || res.error) {
														console.error(res?.error || 'Update failed');
														return;
													}
													setUsers((prev) => prev.map(u => u._id === item._id ? { ...u, isAdmin: !u.isAdmin } : u));
												} catch (err) {
													console.error(err);
												}
											}}
										/>
									}
									label={item.isAdmin ? 'Admin' : 'User'}
								/>
							)}
							<IconButton edge="end" component={RouterLink} to={`/user/${item._id}`}>
								<ArrowForward />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
</Paper>
);
}