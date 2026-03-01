import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { Link, useLocation } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'Devices', icon: <DevicesRoundedIcon />, path: '/devices' },
  { text: 'Billing', icon: <ReceiptLongRoundedIcon />, path: '/billing' },
  { text: 'Optimization', icon: <TrendingDownRoundedIcon />, path: '/optimization' },
  { text: 'Tools', icon: <BuildRoundedIcon />, path: '/tools' },
  { text: 'Preferences', icon: <TuneRoundedIcon />, path: '/preferences' },
];

const secondaryListItems = [
  { text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
];

export default function MenuContent() {
  const location = useLocation();

  const isSelected = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={isSelected(item.path)}
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
              component={Link}
              to={item.path}
              selected={isSelected(item.path)}
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
