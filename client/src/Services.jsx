import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  Fade,
  Chip 
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import GitHubIcon from '@mui/icons-material/GitHub';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import WebIcon from '@mui/icons-material/Web';
import CloudIcon from '@mui/icons-material/Cloud';

export default function Services() {
  const theme = useTheme();

  const skillCategories = [
    {
      icon: <WebIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: 'Web Development',
      skills: ['React', 'HTML', 'CSS', 'Node.js', 'JavaScript'],
      color: theme.palette.primary.main,
    },
    {
      icon: <StorageIcon sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
      title: 'Database',
      skills: ['MySQL', 'MongoDB', 'Firebase', 'Oracle'],
      color: theme.palette.secondary.main,
    },
    {
      icon: <GitHubIcon sx={{ fontSize: 48, color: theme.palette.success.main }} />,
      title: 'Version Control',
      skills: ['Git', 'GitHub'],
      color: theme.palette.success.main,
    },
    {
      icon: <DesignServicesIcon sx={{ fontSize: 48, color: theme.palette.info.main }} />,
      title: 'Design & Methodology',
      skills: ['Figma', 'Agile Methodologies'],
      color: theme.palette.info.main,
    },
  ];

  const allSkills = [
    'React', 'HTML', 'CSS', 'Node.js', 'MySQL', 'Oracle', 
    'MongoDB', 'Firebase', 'Git', 'GitHub', 'Agile Methodologies', 'Figma'
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: theme.palette.primary.main,
              }}
            >
              Skills & Technologies
            </Typography>
            
            <Box sx={{ minHeight: '80px', mb: 3 }}>
              <TypeAnimation
                sequence={[
                  'Web Development', 4000,
                  'Database Management', 4000,
                  'Version Control', 3000,
                  'Design & Agile', 3000,
                ]}
                wrapper="h2"
                cursor={true}
                speed={40}
                repeat={Infinity}
                style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary, maxWidth: '700px', mx: 'auto' }}
            >
              A comprehensive overview of the technologies, tools, and methodologies I work with
            </Typography>
          </Box>
        </Fade>

        {/* Animated Skills Showcase */}
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              mb: 8,
              p: 4,
              borderRadius: 4,
              background: theme.custom?.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
              Currently Working With
            </Typography>
            <Box sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TypeAnimation
                sequence={allSkills.flatMap(skill => [skill, 2000])}
                wrapper="h2"
                cursor={true}
                speed={30}
                repeat={Infinity}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                }}
              />
            </Box>
          </Box>
        </Fade>

        {/* Skills Categories Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 150}ms` }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0px 12px 28px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{ mr: 2 }}>{category.icon}</Box>
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          color: category.color,
                        }}
                      >
                        {category.title}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      {category.skills.map((skill, idx) => (
                        <Chip
                          key={idx}
                          label={skill}
                          sx={{
                            fontSize: '1rem',
                            py: 2.5,
                            px: 1,
                            fontWeight: 500,
                            bgcolor: `${category.color}15`,
                            color: category.color,
                            border: `2px solid ${category.color}30`,
                            '&:hover': {
                              bgcolor: `${category.color}25`,
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Additional Info Section */}
        <Fade in={true} timeout={1200}>
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              px: 4,
              borderRadius: 4,
              bgcolor: theme.palette.background.paper,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <CodeIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              Always Learning
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, maxWidth: '600px', mx: 'auto' }}>
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies 
              and best practices in software development.
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}