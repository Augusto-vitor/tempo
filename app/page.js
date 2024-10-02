"use client"; // Adicione essa linha no topo

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const backgroundImage = 'url("https://i.pinimg.com/originals/94/24/c4/9424c4c89a3a37536d05df7cf7d48e25.gif")';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Função para lidar com o login (pode implementar chamada à API aqui)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Box
      sx={{
        backgroundImage: backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xs" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', p: 4, borderRadius: 2 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
