import React from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
      {value === 0 && <div>Tab 1 Content</div>}
      {value === 1 && <div>Tab 2 Content</div>}
      {value === 2 && <div>Tab 3 Content</div>}
    </div>
  );
}


export default TabPanel