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
    Container,
    Fade,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Divider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
import SchoolIcon from '@mui/icons-material/School'
import PersonIcon from '@mui/icons-material/Person'
import auth from '../lib/auth-helper.js'

const Education = () => {
    const theme = useTheme()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [openDialog, setOpenDialog] = useState(false)

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
            const res = await fetch(`${config.apiUrl}/api/qualifications`)
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
            const res = await fetch(`${config.apiUrl}/api/qualifications`, {
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
            setOpenDialog(false)
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
            const res = await fetch(`${config.apiUrl}/api/qualifications/${id}`, {
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
            const res = await fetch(`${config.apiUrl}/api/qualifications/${id}`, {
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
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Fade in={true} timeout={800}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <TypeAnimation
                            sequence={['My Education', 2000, 'My Education.', 2000, 'My Education...', 2000]}
                            wrapper="h1"
                            cursor={true}
                            speed={40}
                            repeat={Infinity}
                            style={{
                                fontSize: '3rem',
                                fontWeight: 700,
                                color: theme.palette.primary.main,
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{ mt: 2, color: theme.palette.text.secondary, maxWidth: '600px', mx: 'auto' }}
                        >
                            My academic journey and professional qualifications
                        </Typography>
                    </Box>
                </Fade>

                {error && (
                    <Typography color="error" align="center" sx={{ mb: 3 }}>
                        {error}
                    </Typography>
                )}

                {/* Admin Add Button */}
                {isAdmin && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenDialog(true)}
                            sx={{ px: 3 }}
                        >
                            Add Education
                        </Button>
                    </Box>
                )}

                {/* Education Timeline */}
                <Box sx={{ position: 'relative', maxWidth: '900px', mx: 'auto' }}>
                    {/* Timeline Line */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: { xs: '20px', md: '50%' },
                            transform: { md: 'translateX(-50%)' },
                            width: '4px',
                            height: '100%',
                            bgcolor: theme.palette.primary.light,
                            opacity: 0.3,
                        }}
                    />

                    {loading ? (
                        <Typography align="center">Loading education...</Typography>
                    ) : items.length === 0 ? (
                        <Typography align="center" color="text.secondary">
                            No education records available yet
                        </Typography>
                    ) : (
                        items.map((edu, index) => (
                            <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 150}ms` }} key={edu._id}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        mb: 4,
                                        pl: { xs: '60px', md: 0 },
                                    }}
                                >
                                    {/* Timeline Dot */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: { xs: '12px', md: '50%' },
                                            transform: { md: 'translateX(-50%)' },
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            bgcolor: theme.palette.primary.main,
                                            border: `4px solid ${theme.palette.background.default}`,
                                            zIndex: 1,
                                        }}
                                    >
                                        <SchoolIcon
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                fontSize: 32,
                                                color: theme.palette.primary.main,
                                            }}
                                        />
                                    </Box>

                                    {/* Card */}
                                    <Card
                                        sx={{
                                            ml: { md: index % 2 === 0 ? 0 : 'auto' },
                                            mr: { md: index % 2 === 0 ? 'auto' : 0 },
                                            width: { md: 'calc(50% - 40px)' },
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0px 12px 28px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        {editingId === edu._id ? (
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Title"
                                                            value={editingValues.title}
                                                            onChange={handleEditChange('title')}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="First Name"
                                                            value={editingValues.firstname}
                                                            onChange={handleEditChange('firstname')}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Last Name"
                                                            value={editingValues.lastname}
                                                            onChange={handleEditChange('lastname')}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Completion"
                                                            value={editingValues.completion}
                                                            onChange={handleEditChange('completion')}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Description"
                                                            value={editingValues.description}
                                                            onChange={handleEditChange('description')}
                                                            fullWidth
                                                            multiline
                                                            rows={3}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <Button
                                                                variant="contained"
                                                                startIcon={<SaveIcon />}
                                                                onClick={() => handleUpdate(edu._id)}
                                                            >
                                                                Save
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                startIcon={<CancelIcon />}
                                                                onClick={cancelEdit}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        ) : (
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600, flexGrow: 1 }}>
                                                        {edu.title}
                                                    </Typography>
                                                    {isAdmin && (
                                                        <Box>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => startEdit(edu)}
                                                                sx={{ color: theme.palette.primary.main }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleDelete(edu._id)}
                                                                sx={{ color: theme.palette.error.main }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Box>
                                                    )}
                                                </Box>

                                                {(edu.firstname || edu.lastname) && (
                                                    <Chip
                                                        icon={<PersonIcon />}
                                                        label={`${edu.firstname} ${edu.lastname}`.trim()}
                                                        size="small"
                                                        sx={{ mb: 2 }}
                                                        color="secondary"
                                                        variant="outlined"
                                                    />
                                                )}

                                                {edu.completion && (
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                                                        {edu.completion}
                                                    </Typography>
                                                )}

                                                <Divider sx={{ my: 2 }} />

                                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                                    {edu.description}
                                                </Typography>
                                            </CardContent>
                                        )}
                                    </Card>
                                </Box>
                            </Fade>
                        ))
                    )}
                </Box>

                {/* Add Education Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Add New Education</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Degree/Title"
                                    value={form.title}
                                    onChange={handleChange('title')}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    value={form.firstname}
                                    onChange={handleChange('firstname')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last Name"
                                    value={form.lastname}
                                    onChange={handleChange('lastname')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Completion Year"
                                    value={form.completion}
                                    onChange={handleChange('completion')}
                                    fullWidth
                                    placeholder="e.g., 2020 - 2024"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    value={form.description}
                                    onChange={handleChange('description')}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleCreate}>
                            Add Education
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    )
}

export default Education