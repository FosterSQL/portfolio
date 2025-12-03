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
    CardMedia,
    Chip,
    Fade,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import auth from '../lib/auth-helper.js'

const Projects = () => {
    const theme = useTheme()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [openDialog, setOpenDialog] = useState(false)

    const [form, setForm] = useState({ title: '', completion: '', description: '', image: '' })
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
            const res = await fetch('/api/projects')
            const data = await res.json()
            setItems(Array.isArray(data) ? data : [])
        } catch (err) {
            setError('Could not load projects')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (name) => (e) => setForm({ ...form, [name]: e.target.value })

    const handleCreate = async () => {
        try {
            const token = jwt && jwt.token ? jwt.token : null
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.error) return setError(data.error)
            setForm({ title: '', completion: '', description: '', image: '' })
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
            completion: item.completion || '',
            description: item.description || '',
            image: item.image || '',
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
            const res = await fetch(`/api/projects/${id}`, {
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
        if (!window.confirm('Delete this project?')) return
        try {
            const token = jwt && jwt.token ? jwt.token : null
            const res = await fetch(`/api/projects/${id}`, {
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
                            sequence={['My Projects', 2000, 'My Projects.', 2000, 'My Projects...', 2000]}
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
                            Explore my portfolio of projects showcasing my technical skills and problem-solving abilities
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
                            Add New Project
                        </Button>
                    </Box>
                )}

                {/* Projects Grid */}
                <Grid container spacing={4}>
                    {loading ? (
                        <Grid item xs={12}>
                            <Typography align="center">Loading projects...</Typography>
                        </Grid>
                    ) : items.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography align="center" color="text.secondary">
                                No projects available yet
                            </Typography>
                        </Grid>
                    ) : (
                        items.map((project, index) => (
                            <Grid item xs={12} md={6} key={project._id}>
                                <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0px 12px 28px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        {editingId === project._id ? (
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Title"
                                                            value={editingValues.title}
                                                            onChange={handleEditChange('title')}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Completion Date"
                                                            type="date"
                                                            InputLabelProps={{ shrink: true }}
                                                            value={editingValues.completion}
                                                            onChange={handleEditChange('completion')}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            label="Image URL"
                                                            value={editingValues.image}
                                                            onChange={handleEditChange('image')}
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
                                                            rows={4}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            <Button
                                                                variant="contained"
                                                                startIcon={<SaveIcon />}
                                                                onClick={() => handleUpdate(project._id)}
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
                                            <>
                                                {project.image && (
                                                    <CardMedia
                                                        component="img"
                                                        height="240"
                                                        image={project.image}
                                                        alt={project.title}
                                                        sx={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                )}
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                                        <Typography variant="h5" component="h3" sx={{ fontWeight: 600, flexGrow: 1 }}>
                                                            {project.title}
                                                        </Typography>
                                                        {isAdmin && (
                                                            <Box>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => startEdit(project)}
                                                                    sx={{ color: theme.palette.primary.main }}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleDelete(project._id)}
                                                                    sx={{ color: theme.palette.error.main }}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Box>
                                                        )}
                                                    </Box>

                                                    {project.completion && (
                                                        <Chip
                                                            icon={<CalendarTodayIcon />}
                                                            label={new Date(project.completion).toLocaleDateString()}
                                                            size="small"
                                                            sx={{ mb: 2 }}
                                                            color="primary"
                                                            variant="outlined"
                                                        />
                                                    )}

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{ lineHeight: 1.7 }}
                                                    >
                                                        {project.description}
                                                    </Typography>
                                                </CardContent>
                                            </>
                                        )}
                                    </Card>
                                </Fade>
                            </Grid>
                        ))
                    )}
                </Grid>

                {/* Add Project Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Project Title"
                                    value={form.title}
                                    onChange={handleChange('title')}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Completion Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={form.completion}
                                    onChange={handleChange('completion')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Image URL"
                                    value={form.image}
                                    onChange={handleChange('image')}
                                    fullWidth
                                    placeholder="https://example.com/image.jpg"
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
                            Create Project
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    )
}

export default Projects