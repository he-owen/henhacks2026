import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Monthly Energy Cost
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
              $127.40
            </Typography>
            <Chip size="small" color="error" label="+8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Cost breakdown by rate period for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: 'off-peak',
              label: 'Off-Peak',
              data: [38, 42, 45, 52, 48, 40],
              stack: 'A',
            },
            {
              id: 'mid-peak',
              label: 'Mid-Peak',
              data: [32, 35, 38, 42, 39, 34],
              stack: 'A',
            },
            {
              id: 'on-peak',
              label: 'On-Peak',
              data: [48, 55, 62, 72, 65, 53],
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}
