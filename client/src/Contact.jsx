import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Grid,
    IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import auth from '../lib/auth-helper.js'

const Contact = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [form, setForm] = useState({ firstname: '', lastname: '', email: '' })
    const [editingId, setEditingId] = useState(null)
    const [editingValues, setEditingValues] = useState({})

    const jwt = auth.isAuthenticated()
    const isAdmin = jwt && jwt.user && jwt.user.isAdmin

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/contacts')
            const data = await res.json()
            setItems(Array.isArray(data) ? data : [])
        } catch (err) {
            setError('Could not load contacts')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (name) => (e) => setForm({ ...form, [name]: e.target.value })

    const handleCreate = async () => {
        try {
            const token = jwt && jwt.token ? jwt.token : null
            const res = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.error) return setError(data.error)
            setForm({ firstname: '', lastname: '', email: '' })
            fetchList()
        } catch (err) {
            setError('Create failed')
        }
    }

    const startEdit = (item) => {
        setEditingId(item._id)
        setEditingValues({ firstname: item.firstname || '', lastname: item.lastname || '', email: item.email || '' })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditingValues({})
    }

    const handleEditChange = (name) => (e) => setEditingValues({ ...editingValues, [name]: e.target.value })

    const handleUpdate = async (id) => {
        try {
            const token = jwt && jwt.token ? jwt.token : null
            const res = await fetch(`/api/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(editingValues),
            })
            const data = await res.json()
            if (data.error) return setError(data.error)
            cancelEdit()
            fetchList()
        } catch (err) {
            setError('Update failed')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this contact?')) return
        try {
            const token = jwt && jwt.token ? jwt.token : null
            const res = await fetch(`/api/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            })
            const data = await res.json()
            if (data.error) return setError(data.error)
            fetchList()
        } catch (err) {
            setError('Delete failed')
        }
    }

    return (
        <Box sx={{ p: 3 }}>
            <TypeAnimation
                sequence={['Contact Info', 2000, 'Contact Info.', 2000, 'Contact Info...', 2000]}
                wrapper="h2"
                cursor={true}
                speed={40}
                repeat={Infinity}
                style={{ fontSize: '2.5em', textAlign: 'center', marginTop: '10px' }}
            />

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            {isAdmin && (
                <Card sx={{ maxWidth: 900, mt: 3, mx: 'auto', p: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Admin: Add Contact</Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField label="First name" value={form.firstname} onChange={handleChange('firstname')} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField label="Last name" value={form.lastname} onChange={handleChange('lastname')} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <TextField label="Email" value={form.email} onChange={handleChange('email')} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={handleCreate}>Create</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}

            <Box sx={{ maxWidth: 900, mx: 'auto', mt: 3 }}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    items.map((it) => (
                        <Card key={it._id} sx={{ mb: 2 }}>
                            <CardContent>
                                {editingId === it._id ? (
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} sm={4}>
                                            <TextField label="First name" value={editingValues.firstname} onChange={handleEditChange('firstname')} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField label="Last name" value={editingValues.lastname} onChange={handleEditChange('lastname')} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField label="Email" value={editingValues.email} onChange={handleEditChange('email')} fullWidth />
                                        </Grid>
                                        <Grid item>
                                            <IconButton color="primary" onClick={() => handleUpdate(it._id)}><SaveIcon /></IconButton>
                                            <IconButton color="inherit" onClick={cancelEdit}><CancelIcon /></IconButton>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs>
                                            <Typography variant="h6">{it.firstname} {it.lastname}</Typography>
                                            <Typography variant="body2" color="text.secondary">{it.email}</Typography>
                                        </Grid>
                                        {isAdmin && (
                                            <Grid item>
                                                <IconButton onClick={() => startEdit(it)}><EditIcon /></IconButton>
                                                <IconButton onClick={() => handleDelete(it._id)}><DeleteIcon /></IconButton>
                                            </Grid>
                                        )}
                                    </Grid>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </Box>
    )
}

export default Contact