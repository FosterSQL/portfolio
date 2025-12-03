import React from "react";
import { Box, Container, Typography, Button, Grid, Card, CardContent, useTheme, Fade } from "@mui/material";
import { Link } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: "Projects",
      description: "Explore my latest work and technical achievements",
      link: "/projects",
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
      title: "Education",
      description: "My academic journey and qualifications",
      link: "/education",
    },
    {
      icon: <WorkIcon sx={{ fontSize: 48, color: theme.palette.success.main }} />,
      title: "Skills",
      description: "Technologies and tools I work with",
      link: "/services",
    },
    {
      icon: <ContactMailIcon sx={{ fontSize: 48, color: theme.palette.info.main }} />,
      title: "Contact",
      description: "Get in touch with me",
      link: "/contact",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.custom?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Box textAlign="center">
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                Diego Emiliano González Martínez
              </Typography>
              
              <Box sx={{ minHeight: '60px', mb: 4 }}>
                <TypeAnimation
                  sequence={[
                    'Software Developer',
                    2000,
                    'Full Stack Engineer',
                    2000,
                    'Problem Solver',
                    2000,
                    'Tech Enthusiast',
                    2000,
                  ]}
                  wrapper="h2"
                  cursor={true}
                  repeat={Infinity}
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    display: 'inline-block',
                  }}
                />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  maxWidth: '800px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                }}
              >
                Passionate about building innovative solutions and creating impactful digital experiences. 
                Currently pursuing Software Engineering at Centennial College.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/projects"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                >
                  View My Work
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Get In Touch
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          Explore My Portfolio
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 6,
            color: theme.palette.text.secondary,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Discover my journey, skills, and achievements across different areas
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  component={Link}
                  to={feature.link}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0px 12px 28px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Ready to collaborate?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            size="large"
            sx={{ px: 5, py: 1.5 }}
          >
            Let's Talk
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;