import React from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionExample() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Accordion Title
      </AccordionSummary>
      <AccordionDetails>
        <p>Accordion content goes here.</p>
      </AccordionDetails>
    </Accordion>
  );
}
