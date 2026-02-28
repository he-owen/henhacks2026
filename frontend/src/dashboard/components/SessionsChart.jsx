import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function SessionsChart() {
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Daily Energy Usage
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              842 kWh
            </Typography>
            <Chip size="small" color="success" label="-12%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Energy consumption by category for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: 'hvac',
              label: 'HVAC',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                12, 14, 11, 15, 13, 10, 14, 12, 9, 13, 11, 8, 12, 10, 7, 11,
                9, 6, 10, 8, 5, 9, 7, 4, 8, 6, 5, 7, 6, 8,
              ],
            },
            {
              id: 'appliances',
              label: 'Appliances',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7,
                9, 8, 7, 9, 8, 7, 9, 8, 7, 9,
              ],
            },
            {
              id: 'lighting',
              label: 'Lighting & Other',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              area: true,
              data: [
                3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3,
                4, 3, 3, 4, 3, 3, 4, 3, 3, 4,
              ],
            },
          ]}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-hvac': {
              fill: "url('#home-hvac')",
            },
            '& .MuiAreaElement-series-appliances': {
              fill: "url('#home-appliances')",
            },
            '& .MuiAreaElement-series-lighting': {
              fill: "url('#home-lighting')",
            },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.primary.dark} id="home-hvac" />
          <AreaGradient color={theme.palette.primary.main} id="home-appliances" />
          <AreaGradient color={theme.palette.primary.light} id="home-lighting" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
