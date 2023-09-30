import React from 'react'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function StepperExample() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 3</StepLabel>
        </Step>
      </Stepper>
      <button onClick={() => setActiveStep(activeStep + 1)}>Next</button>
    </div>
  );
}
