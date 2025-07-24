import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import theme from './theme';
import EmailOtpFlow from './components/EmailOtpFlow';
import ApplicationFlow from './components/ApplicationFlow';

function App() {
  const [verifiedEmail, setVerifiedEmail] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary" elevation={2} sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            Online Application Processing System
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ width: '100%', p: { xs: 2, sm: 4 }, mt: 4, mb: 4 }}>
          {!verifiedEmail ? (
            <EmailOtpFlow onVerified={setVerifiedEmail} />
          ) : (
            <ApplicationFlow email={verifiedEmail} />
          )}
        </Paper>
      </Container>
      <div className="footer" style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>© 2025 Online Application Processing System. All rights reserved.</div>
    </ThemeProvider>
  );
}

export default App;
