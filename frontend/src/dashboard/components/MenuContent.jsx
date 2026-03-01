import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { usePage } from '../context/PageContext';

import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon /> },
  { text: 'Devices', icon: <DevicesRoundedIcon /> },
  { text: 'Billing', icon: <ReceiptLongRoundedIcon /> },
  { text: 'Optimization', icon: <TrendingDownRoundedIcon /> },
  { text: 'Tools', icon: <BuildRoundedIcon /> },
  { text: 'Preferences', icon: <TuneRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
];

export default function MenuContent() {
  const { currentPage, setCurrentPage } = usePage();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={currentPage === item.text}
              onClick={() => setCurrentPage(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={currentPage === item.text}
              onClick={() => setCurrentPage(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
