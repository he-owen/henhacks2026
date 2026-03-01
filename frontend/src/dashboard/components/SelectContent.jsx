import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { useLocation } from '../context/LocationContext';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

const ALL_PROPERTIES = '__all__';

export default function SelectContent() {
  const { locations, selectedLocationId, setSelectedLocationId } = useLocation();

  const value = selectedLocationId || ALL_PROPERTIES;

  const handleChange = (event) => {
    const v = event.target.value;
    setSelectedLocationId(v === ALL_PROPERTIES ? null : v);
  };

  return (
    <Select
      labelId="home-select"
      id="home-simple-select"
      value={value}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select property' }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        '&.MuiList-root': { p: '8px' },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <MenuItem value={ALL_PROPERTIES}>
        <ListItemAvatar>
          <Avatar alt="All Properties">
            <BoltRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="All Properties" secondary="Combined view" />
      </MenuItem>
      {locations.map((loc) => (
        <MenuItem key={loc.id} value={loc.id}>
          <ListItemAvatar>
            <Avatar alt={loc.name}>
              {loc.name.toLowerCase() === 'home' ? (
                <HomeRoundedIcon sx={{ fontSize: '1rem' }} />
              ) : (
                <PlaceRoundedIcon sx={{ fontSize: '1rem' }} />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={loc.name} secondary={loc.zip} />
        </MenuItem>
      ))}
    </Select>
  );
}
