import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#F50057',
    },
    error: {
      main: '#FF0000',
    },
  },
  shadows: [
    'none',                           // 0: No shadow
    '0px 2px 4px rgba(0, 0, 0, 0.2)', // 1: Custom shadow for cards
    '0px 4px 8px rgba(0, 0, 0, 0.4)', // Example custom shadow
  ],

  transitions: {
    easing: {
      hover: 'ease-in-out',
      customEasing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Example custom easing
    },
    duration: {
      short: 300,
      customDuration: 500, // Example custom duration
    },
  },

  typography: {
    smallParagraph: {
      fontSize: '0.8rem',
      lineHeight: 1.4,
    },
    mediumParagraph: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    largeParagraph: {
      fontSize: '1.2rem',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.7rem',
      lineHeight: 1.2,
    },
    label: {
      fontSize: '0.9rem',
      lineHeight: 1.3,
    },
    blockquote: (theme) => ({
      fontSize: '1.2rem',
      lineHeight: 1.6,
      fontStyle: 'italic',
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      borderStyle: 'solid',
      padding: '10px',
    }),
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    primaryText: {
      color: '#333',
    },
    secondaryText: {
      color: '#666',
    },
    errorText: {
      color: '#FF0000',
    },
    button: {
      textTransform: 'none',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 16,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

function MaterialScreen() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Responsive Typography */}
        <Typography variant="h1">h1Hey HEADER</Typography>
        <Typography variant="h2">h2Hey HEADER</Typography>
        <h1 style={{ fontFamily: theme.typography.fontFamily }}>Responsive Typography</h1>

        {/* Responsive Buttons */}
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>

        {/* Responsive Card */}
        <Card elevation={1} sx={{ boxShadow: theme.shadows[1] }}>
          <Typography variant="body1">Responsive Card</Typography>
        </Card>

        <Typography variant="smallParagraph">This is a small paragraph.</Typography>
        <Typography variant="mediumParagraph">This is a medium paragraph.</Typography>
        <Typography variant="largeParagraph">This is a large paragraph.</Typography>

        {/* Primary Text */}
        <Typography sx={{ color: theme.typography.primaryText.color }}>
          This is primary text without body1
        </Typography>

        {/* Primary Text with body1 variant */}
        <Typography variant="body1" sx={{ color: theme.typography.primaryText.color }}>
          This is primary text with body1 variant.
        </Typography>

        {/* Secondary Text */}
        <Typography variant="body1" sx={{ color: theme.typography.secondaryText.color }}>
          This is secondary text.
        </Typography>

        {/* Error Text */}
        <Typography variant="body1" sx={{ color: theme.typography.errorText.color }}>
          This is error text.
        </Typography>

        {/* Blockquote */}
        <Typography variant={(theme) => theme.typography.blockquote}>
          This is a blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>

        <Grid container spacing={2} direction={"row"}>
          {/* This item occupies 12 columns on extra small screens, 6 columns on small screens, and 4 columns on medium screens */}
          <Grid item xs={12} sm={6} md={4} style={{ borderRadius: theme.shape.borderRadius }}>
            {/* Content */}
            <div>50%</div>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ borderRadius: theme.shape.borderRadius }}>
            {/* Content */}
            <div>50%</div>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ borderRadius: theme.shape.borderRadius }}>
            {/* Content */}
            <div>50%</div>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ borderRadius: theme.shape.borderRadius }}>
            {/* Content */}
            <div>50%</div>
          </Grid>

          {/* Another item */}
          <Grid item xs={12} sm={6} md={4}>
            {/* Content */}
          </Grid>
        </Grid>

        // Shadows: Applying custom shadow to a Paper component
{/* `<`Paper` elevation={1} sx={{ boxShadow: theme.shadows[1], padding: '16px' }}>
  <Typography variant="body1">Custom Shadow</Typography>
</>` */}

// Transitions: Using a custom easing function and duration
<Button
  variant="contained"
  color="primary"
  sx={{
    transition: `background-color ${theme.transitions.duration.customDuration}ms ${theme.transitions.easing.customEasing}`,
    '&:hover': {
      backgroundColor: '#FFC107', // Change to your desired hover color
    },
  }}
>
  Custom Transition
</Button>

// Typography Variants: Applying 'caption' and 'label' variants
<Typography variant="caption" sx={{ marginBottom: '8px' }}>
  Caption Text
</Typography>
<Typography variant="label" sx={{ marginBottom: '8px' }}>
  Label Text
</Typography>

// Z-Index: Using zIndex for positioning components
<div
  style={{
    position: 'absolute',
    backgroundColor: '#2196F3', // Change to your desired background color
    color: 'white',
    zIndex: theme.zIndex.drawer + 1,
    padding: '16px',
  }}
>
  Z-Index Example
</div>

// Additional Theme Properties: Using spacing, shape, and breakpoints
<div>
  <Typography variant="body1">
    Spacing: {theme.spacing}
  </Typography>
  <div
    style={{
      borderRadius: theme.shape.borderRadius,
      width: '100px',
      height: '100px',
      backgroundColor: theme.palette.primary.main,
      marginTop: '16px',
    }}
  >
    Shape: {theme.shape.borderRadius}
  </div>
  <Typography variant="body1">
    Breakpoints:
  </Typography>
  <div>
    {Object.keys(theme.breakpoints.values).map((breakpoint) => (
      <div key={breakpoint}>
        {breakpoint}: {theme.breakpoints.values[breakpoint]}px
      </div>
    ))}
  </div>
</div>

      </Container>
    </ThemeProvider>
  );

}

export default MaterialScreen;