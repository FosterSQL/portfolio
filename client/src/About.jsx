import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Chip,
  useTheme,
  Fade 
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import picture from './assets/profile-picture.png';
import resumePDF from './assets/Resume.pdf';

const About = () => {
  const theme = useTheme();

  const highlights = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Education',
      description: 'Graduate from CETI Colomos, Mexico',
      detail: 'Currently pursuing Software Engineering at Centennial College, Canada',
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Expertise',
      description: 'Full-Stack Development',
      detail: 'Specialized in modern web technologies and database management',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      title: 'Location',
      description: 'Based in Canada',
      detail: 'Open to remote and on-site opportunities',
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', py: 6 }}>
      {/* Header Section */}
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <TypeAnimation
              sequence={[
                'About Me',
                2000,
                'About Me.',
                2000,
                'About Me..',
                2000,
                'About Me...',
                2000,
              ]}
              wrapper="h1"
              cursor={true}
              speed={40}
              repeat={Infinity}
              style={{
                fontSize: '3rem',
                fontWeight: 700,
                color: theme.palette.primary.main,
                marginBottom: '1rem',
              }}
            />
          </Box>
        </Fade>

        {/* Profile Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={5}>
            <Fade in={true} timeout={1000}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={picture}
                  alt="Diego Emiliano Gonzalez Martinez"
                  sx={{
                    width: { xs: 250, md: 350 },
                    height: { xs: 250, md: 350 },
                    boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
                    border: `6px solid ${theme.palette.background.paper}`,
                  }}
                />
              </Box>
            </Fade>
          </Grid>

          <Grid item xs={12} md={7}>
            <Fade in={true} timeout={1200}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                  }}
                >
                  Hey! I'm Diego Emiliano González Martínez
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  I'm a passionate <strong>Software Developer</strong> graduated from CETI Colomos, Mexico. 
                  I am currently seeking new opportunities to apply my skills, grow professionally, 
                  and contribute to impactful projects.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                  }}
                >
                  To this day, I'm currently enrolled in <strong>Software Engineering</strong> at 
                  Centennial College, Canada, where I continue to expand my technical expertise 
                  and work on innovative projects that solve real-world problems.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                  <Chip
                    icon={<LocationOnIcon />}
                    label="Canada"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<SchoolIcon />}
                    label="Centennial College"
                    color="secondary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<CodeIcon />}
                    label="Full-Stack Developer"
                    color="success"
                    variant="outlined"
                  />
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<DownloadIcon />}
                  href={resumePDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  Download My Resume
                </Button>
              </Box>
            </Fade>
          </Grid>
        </Grid>

        {/* Highlights Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 5,
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            My Journey
          </Typography>

          <Grid container spacing={4}>
            {highlights.map((highlight, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0px 12px 28px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ py: 4 }}>
                      <Box sx={{ mb: 2 }}>{highlight.icon}</Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {highlight.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 1,
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {highlight.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {highlight.detail}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            px: 4,
            borderRadius: 4,
            background: theme.custom?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
            Let's Build Something Amazing Together
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
            I'm always interested in hearing about new projects and opportunities.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/contact"
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Get In Touch
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;