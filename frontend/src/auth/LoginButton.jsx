import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton({ children, ...props }) {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect()} {...props}>
      {children ?? 'Log in with Auth0'}
    </Button>
  );
}
