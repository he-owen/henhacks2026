import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function HighlightedCard({ variant }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (variant === 'savings') {
    return (
      <Card
        variant="outlined"
        sx={{ height: '100%' }}
      >
        <CardContent>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'flex-start' }}>
            <SavingsRoundedIcon color="success" sx={{ fontSize: '2rem' }} />
            <Box>
              <Typography
                component="h2"
                variant="subtitle2"
                gutterBottom
                sx={{ fontWeight: '600' }}
              >
                Potential Monthly Savings
              </Typography>
              <Typography variant="h4" sx={{ color: 'success.main', mb: 1 }}>
                $23.50
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                Based on your usage patterns, shifting high-energy devices to off-peak
                hours and optimizing HVAC schedules could save you up to 18% on your
                monthly energy bill.
              </Typography>
              <Button
                variant="contained"
                size="small"
                color="primary"
                endIcon={<ChevronRightRoundedIcon />}
                fullWidth={isSmallScreen}
              >
                View optimization plan
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <BoltRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          Optimize your energy
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Get personalized recommendations to reduce your energy bill and
          carbon footprint.
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
        >
          Get recommendations
        </Button>
      </CardContent>
    </Card>
  );
}

HighlightedCard.propTypes = {
  variant: PropTypes.string,
};
