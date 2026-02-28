import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton({ children, ...props }) {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
      }
      {...props}
    >
      {children ?? 'Log out'}
    </Button>
  );
}
