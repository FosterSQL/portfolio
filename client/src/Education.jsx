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

const Education = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // form state for new item
    const [form, setForm] = useState({
        title: '',
        firstname: '',
        lastname: '',
        completion: '',
        description: '',
    })

    // track which item is being edited (id) and edited values
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
            const res = await fetch('/api/qualifications')
            const data = await res.json()
            setItems(Array.isArray(data) ? data : [])
        } catch (err) {
            setError('Could not load education items')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (name) => (e) => setForm({ ...form, [name]: e.target.value })

    const handleCreate = async () => {
        try {
            const token = jwt && jwt.token ? jwt.token : null
            const res = await fetch('/api/qualifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.error) return setError(data.error)
            // refresh list
            setForm({ title: '', firstname: '', lastname: '', completion: '', description: '' })
            fetchList()
        } catch (err) {
            setError('Create failed')
        }
    }

    const startEdit = (item) => {
        setEditingId(item._id)
        setEditingValues({
            title: item.title || '',
            firstname: item.firstname || '',
            lastname: item.lastname || '',
            completion: item.completion || '',
            description: item.description || '',
        })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditingValues({})
    }

    const handleEditChange = (name) => (e) => setEditingValues({ ...editingValues, [name]: e.target.value })

    const handleUpdate = async (id) => {
        try {
            const token = jwt && jwt.token ? jwt.token : null
            const res = await fetch(`/api/qualifications/${id}`, {
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
        if (!window.confirm('Delete this item?')) return
        try {
            const token = jwt && jwt.token ? jwt.token : null
            const res = await fetch(`/api/qualifications/${id}`, {
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
                sequence={['My Education', 2000, 'My Education.', 2000, 'My Education... ', 2000]}
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
                        <Typography variant="h6">Admin: Add Education</Typography>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField label="Title" value={form.title} onChange={handleChange('title')} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField label="First name" value={form.firstname} onChange={handleChange('firstname')} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField label="Last name" value={form.lastname} onChange={handleChange('lastname')} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField label="Completion" value={form.completion} onChange={handleChange('completion')} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Description" value={form.description} onChange={handleChange('description')} fullWidth multiline rows={3} />
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
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField label="Title" value={editingValues.title} onChange={handleEditChange('title')} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField label="First" value={editingValues.firstname} onChange={handleEditChange('firstname')} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField label="Last" value={editingValues.lastname} onChange={handleEditChange('lastname')} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField label="Completion" value={editingValues.completion} onChange={handleEditChange('completion')} fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Description" value={editingValues.description} onChange={handleEditChange('description')} fullWidth multiline rows={3} />
                                        </Grid>
                                        <Grid item>
                                            <IconButton color="primary" onClick={() => handleUpdate(it._id)}><SaveIcon /></IconButton>
                                            <IconButton color="inherit" onClick={cancelEdit}><CancelIcon /></IconButton>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs>
                                            <Typography variant="h6">{it.title}</Typography>
                                            <Typography>{it.firstname} {it.lastname}</Typography>
                                            <Typography variant="body2" color="text.secondary">{it.completion}</Typography>
                                            <Typography sx={{ mt: 1 }}>{it.description}</Typography>
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

export default Education