import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert, Stack } from '@mui/material';
import api from '../api';

export default function EmailOtpFlow({ onVerified }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [serverMsg, setServerMsg] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleEmail = async (data) => {
    setError('');
    setServerMsg('');
    try {
      await api.post('/otp/request', { email: data.email });
      setEmail(data.email);
      setStep(2);
      setServerMsg('OTP sent to your email.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    }
  };

  const handleOtp = async (data) => {
    setError('');
    setServerMsg('');
    try {
      await api.post('/otp/verify', { email, otp: data.otp });
      setServerMsg('OTP verified!');
      onVerified(email);
    } catch (err) {
      setError(err.response?.data?.error || 'OTP verification failed');
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={2}>
      <Stack spacing={3}>
        <Typography variant="h5" mb={1} align="center">Email Verification</Typography>
        {step === 1 && (
          <form onSubmit={handleSubmit(handleEmail)} autoComplete="off">
            <Stack spacing={2}>
              <TextField
                label="Email Address"
                fullWidth
                margin="normal"
                aria-label="Email Address"
                {...register('email', { required: 'Email is required', pattern: { value: /.+@.+\..+/, message: 'Invalid email address' } })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                autoFocus
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>Send OTP</Button>
            </Stack>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit(handleOtp)} autoComplete="off">
            <Stack spacing={2}>
              <TextField
                label="Enter OTP"
                fullWidth
                margin="normal"
                aria-label="Enter OTP"
                {...register('otp', { required: 'OTP is required' })}
                error={!!errors.otp}
                helperText={errors.otp ? errors.otp.message : ''}
                autoFocus
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>Verify OTP</Button>
            </Stack>
          </form>
        )}
        {serverMsg && <Alert severity="success" icon={true}>{serverMsg}</Alert>}
        {error && <Alert severity="error" icon={true}>{error}</Alert>}
      </Stack>
    </Box>
  );
} 