import Badge, { badgeClasses } from '@mui/material/Badge';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

function MenuButton({ showBadge = false, badgeCount, ...props }) {
  // badgeCount=null → dot (not yet loaded); badgeCount=number → numeric badge
  const isNumeric = badgeCount != null;
  return (
    <Badge
      color="error"
      variant={isNumeric ? 'standard' : 'dot'}
      badgeContent={isNumeric ? badgeCount : undefined}
      invisible={isNumeric ? badgeCount === 0 : !showBadge}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <IconButton size="small" {...props} />
    </Badge>
  );
}

MenuButton.propTypes = {
  showBadge: PropTypes.bool,
  badgeCount: PropTypes.number,
};

export default MenuButton;
