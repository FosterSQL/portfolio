  import { BrowserRouter as Router } from 'react-router-dom';
 import { ThemeProvider } from '@mui/material/styles'; // Updated import for MUI v5
 import CssBaseline from '@mui/material/CssBaseline'; // Optional: resets browser styling
 import MainRouter from '../MainRouter';
 import theme from '../theme';
 const App = () => {
 // Use basename only in production for GitHub Pages
 const basename = import.meta.env.MODE === 'production' ? '/portfolio' : '/';
 
 return (
 <Router basename={basename}>
 <ThemeProvider theme={theme}>
 <CssBaseline /> {/* Optional but recommended for consistent baseline styles */}
 <MainRouter />
 </ThemeProvider>
 </Router>
 );
 };
 export default App;