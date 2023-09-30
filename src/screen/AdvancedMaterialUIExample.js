import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';

const theme = createTheme();

function AdvancedMaterialUIExample() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    agree: false,
  });
  const [errors, setErrors] = useState({});

  const steps = ['Step 1', 'Step 2', 'Step 3'];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Submit the form data
      console.log('Form data submitted:', formData);
      return;
    }

    // Validate the form data for the current step
    const currentStepErrors = validateStep(activeStep);
    if (Object.keys(currentStepErrors).length === 0) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      setErrors(currentStepErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = (step) => {
    const currentStepErrors = {};
    if (step === 0) {
      if (!formData.name) {
        currentStepErrors.name = 'Name is required';
      }
      if (!formData.email) {
        currentStepErrors.email = 'Email is required';
      } else if (!isValidEmail(formData.email)) {
        currentStepErrors.email = 'Invalid email format';
      }
    }
    if (step === 1) {
      if (!formData.agree) {
        currentStepErrors.agree = 'You must agree to the terms';
      }
    }
    return currentStepErrors;
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
          </>
        );
      case 1:
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agree}
                onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
              />
            }
            label="I agree to the terms and conditions"
            error={!!errors.agree}
            helperText={errors.agree}
          />
        );
      case 2:
        return (
          <Typography variant="h6">
            Thank you for submitting the form!
          </Typography>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <div style={{ marginTop: '16px' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default AdvancedMaterialUIExample;
