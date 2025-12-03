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
    Paper,
    Divider,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import SendIcon from '@mui/icons-material/Send'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import auth from '../lib/auth-helper.js'

const Contact = () => {
    const theme = useTheme()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

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
            setError('')
            setSuccess('')
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
            setSuccess('Contact information submitted successfully!')
            fetchList()
        } catch (err) {
            setError('Failed to submit contact information')
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
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Fade in={true} timeout={800}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <TypeAnimation
                            sequence={['Get In Touch', 2000, 'Get In Touch.', 2000, 'Get In Touch...', 2000]}
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
                            Let's connect! Share your information and I'll get back to you soon
                        </Typography>
                    </Box>
                </Fade>

                <Grid container spacing={4}>
                    {/* Contact Form */}
                    <Grid item xs={12} md={6}>
                        <Fade in={true} timeout={1000}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
                                    height: '100%',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <ContactMailIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        Contact Form
                                    </Typography>
                                </Box>

                                {error && (
                                    <Typography
                                        color="error"
                                        sx={{
                                            mb: 2,
                                            p: 2,
                                            bgcolor: 'error.lighter',
                                            borderRadius: 2,
                                        }}
                                    >
                                        {error}
                                    </Typography>
                                )}

                                {success && (
                                    <Typography
                                        sx={{
                                            mb: 2,
                                            p: 2,
                                            bgcolor: 'success.lighter',
                                            color: 'success.dark',
                                            borderRadius: 2,
                                        }}
                                    >
                                        {success}
                                    </Typography>
                                )}

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="First Name"
                                            value={form.firstname}
                                            onChange={handleChange('firstname')}
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Last Name"
                                            value={form.lastname}
                                            onChange={handleChange('lastname')}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Email Address"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange('email')}
                                            fullWidth
                                            required
                                            InputProps={{
                                                startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            onClick={handleCreate}
                                            startIcon={<SendIcon />}
                                            sx={{
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            Submit Contact Info
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Fade>
                    </Grid>

                    {/* Contact Info Display */}
                    <Grid item xs={12} md={6}>
                        <Fade in={true} timeout={1200}>
                            <Box>
                                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                                    {isAdmin ? 'Contact Submissions' : 'Why Contact Me?'}
                                </Typography>

                                {!isAdmin ? (
                                    <Card
                                        sx={{
                                            p: 4,
                                            background: theme.custom?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                            Let's Collaborate!
                                        </Typography>
                                        <Typography sx={{ mb: 2, lineHeight: 1.8 }}>
                                            I'm always interested in hearing about new projects, creative ideas, 
                                            or opportunities to be part of your vision.
                                        </Typography>
                                        <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />
                                        <Typography sx={{ lineHeight: 1.8 }}>
                                            Whether you have a question, want to discuss a project, or just want to say hi, 
                                            feel free to reach out. I'll get back to you as soon as possible!
                                        </Typography>
                                    </Card>
                                ) : (
                                    <Box>
                                        {loading ? (
                                            <Typography>Loading contacts...</Typography>
                                        ) : items.length === 0 ? (
                                            <Typography color="text.secondary">No contact submissions yet</Typography>
                                        ) : (
                                            <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                                                {items.map((contact) => (
                                                    <Card key={contact._id} sx={{ mb: 2 }}>
                                                        {editingId === contact._id ? (
                                                            <CardContent>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <TextField
                                                                            label="First Name"
                                                                            value={editingValues.firstname}
                                                                            onChange={handleEditChange('firstname')}
                                                                            fullWidth
                                                                            size="small"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <TextField
                                                                            label="Last Name"
                                                                            value={editingValues.lastname}
                                                                            onChange={handleEditChange('lastname')}
                                                                            fullWidth
                                                                            size="small"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            label="Email"
                                                                            value={editingValues.email}
                                                                            onChange={handleEditChange('email')}
                                                                            fullWidth
                                                                            size="small"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                                            <Button
                                                                                variant="contained"
                                                                                size="small"
                                                                                startIcon={<SaveIcon />}
                                                                                onClick={() => handleUpdate(contact._id)}
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                            <Button
                                                                                variant="outlined"
                                                                                size="small"
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
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                                    <Box sx={{ flexGrow: 1 }}>
                                                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                                                            {contact.firstname} {contact.lastname}
                                                                        </Typography>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                            <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                                                            <Typography variant="body2" color="text.secondary">
                                                                                {contact.email}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                    <Box>
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => startEdit(contact)}
                                                                            sx={{ color: theme.palette.primary.main }}
                                                                        >
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => handleDelete(contact._id)}
                                                                            sx={{ color: theme.palette.error.main }}
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </Box>
                                                                </Box>
                                                            </CardContent>
                                                        )}
                                                    </Card>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Contact