import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ItemList() {
  return (
    <List>
      <ListItem button>
        <ListItemText primary="Item 1" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Item 2" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Item 3" />
      </ListItem>
    </List>
  );
}
