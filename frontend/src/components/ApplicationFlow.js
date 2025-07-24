import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, MenuItem, Select, Button, TextField, Alert, Stack } from '@mui/material';
import api from '../api';

const vacancyForms = {
  'Management Assistant': [
    { name: 'fullName', label: 'Full Name', required: true },
    { name: 'contact', label: 'Contact Number', required: true, pattern: /^\d{10}$/, patternMsg: 'Contact number must be 10 digits' },
    { name: 'qualification', label: 'Highest Qualification', required: true },
    { name: 'experience', label: 'Relevant Experience (years)', required: true, type: 'number', min: 0, pattern: /^\d+$/, patternMsg: 'Enter a valid number' },
  ],
  'Works Aide': [
    { name: 'fullName', label: 'Full Name', required: true },
    { name: 'contact', label: 'Contact Number', required: true, pattern: /^\d{10}$/, patternMsg: 'Contact number must be 10 digits' },
    { name: 'physicalFitness', label: 'Are you physically fit?', required: true },
  ],
  'Store Keeper': [
    { name: 'fullName', label: 'Full Name', required: true },
    { name: 'contact', label: 'Contact Number', required: true, pattern: /^\d{10}$/, patternMsg: 'Contact number must be 10 digits' },
    { name: 'qualification', label: 'Relevant Qualification', required: true },
    { name: 'inventoryExp', label: 'Inventory Management Experience (years)', required: true, type: 'number', min: 0, pattern: /^\d+$/, patternMsg: 'Enter a valid number' },
  ],
  'Driver': [
    { name: 'fullName', label: 'Full Name', required: true },
    { name: 'contact', label: 'Contact Number', required: true, pattern: /^\d{10}$/, patternMsg: 'Contact number must be 10 digits' },
    { name: 'licenseNo', label: 'Driving License Number', required: true },
    { name: 'licenseType', label: 'License Type', required: true },
    { name: 'drivingExp', label: 'Driving Experience (years)', required: true, type: 'number', min: 0, pattern: /^\d+$/, patternMsg: 'Enter a valid number' },
  ],
};

export default function ApplicationFlow({ email }) {
  const [ad, setAd] = useState(null);
  const [applicationType, setApplicationType] = useState('Internal');
  const [vacancyType, setVacancyType] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await api.get('/advertisements');
        setAd(res.data[0]);
      } catch (err) {
        setError('Failed to load advertisements');
      }
    };
    fetchAd();
  }, []);

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    try {
      await api.post('/applications', {
        email,
        advertisementId: ad._id,
        vacancyType,
        applicationType,
        formData: data,
      });
      setSuccess('Application submitted successfully!');
      reset();
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
    }
  };

  if (!ad) return <Typography>Loading...</Typography>;

  return (
    <Box maxWidth={500} mx="auto" mt={2}>
      <Stack spacing={3}>
        <Typography variant="h5" align="center" mb={1}>Apply for: 20th July 2025</Typography>
        <Stack spacing={2}>
          <Box>
            <Typography fontWeight={600} mb={0.5}>Select Application Type:</Typography>
            <Select value={applicationType} onChange={e => setApplicationType(e.target.value)} fullWidth aria-label="Application Type">
              <MenuItem value="Internal">Internal</MenuItem>
              <MenuItem value="External">External</MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography fontWeight={600} mb={0.5}>Select Vacancy:</Typography>
            <Select value={vacancyType} onChange={e => setVacancyType(e.target.value)} fullWidth aria-label="Vacancy Type">
              {ad.vacancyTypes.map(v => (
                <MenuItem key={v} value={v}>{v}</MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
        {vacancyType && (
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack spacing={2}>
              {vacancyForms[vacancyType].map(field => (
                <TextField
                  key={field.name}
                  label={field.label}
                  fullWidth
                  margin="normal"
                  aria-label={field.label}
                  type={field.type || 'text'}
                  {...register(field.name, {
                    required: field.required ? `${field.label} is required` : false,
                    pattern: field.pattern ? { value: field.pattern, message: field.patternMsg } : undefined,
                    min: field.min !== undefined ? { value: field.min, message: 'Must be a positive number' } : undefined,
                  })}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              ))}
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </Stack>
          </form>
        )}
        {success && <Alert severity="success" icon={true}>{success}</Alert>}
        {error && <Alert severity="error" icon={true}>{error}</Alert>}
      </Stack>
    </Box>
  );
} 