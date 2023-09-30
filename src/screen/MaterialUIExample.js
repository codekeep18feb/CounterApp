import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const theme = createTheme();

function MaterialUIExample() {
  const [checked, setChecked] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState('option1');
  const [data, setData] = React.useState([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 35 },
  ]);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h1">Material-UI Example</Typography>

        <Button variant="contained" color="primary">
          Primary Button
        </Button>

        <TextField
          label="Text Field"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
              label="Check this box"
            />
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset">
          <Typography variant="h6">Radio Buttons</Typography>
          <Radio
            checked={selectedValue === 'option1'}
            onChange={handleRadioChange}
            value="option1"
            name="radio-button-demo"
          />
          <Radio
            checked={selectedValue === 'option2'}
            onChange={handleRadioChange}
            value="option2"
            name="radio-button-demo"
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth margin="normal">
          <Typography variant="h6">Select</Typography>
          <Select
            value={selectedValue}
            onChange={handleRadioChange}
            label="Select"
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </Select>
        </FormControl>

        <Paper elevation={3} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default MaterialUIExample;
