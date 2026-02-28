import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import KitchenRoundedIcon from '@mui/icons-material/KitchenRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';

const data = [
  { label: 'HVAC', value: 420 },
  { label: 'Appliances', value: 230 },
  { label: 'Lighting', value: 110 },
  { label: 'Other', value: 82 },
];

const categories = [
  {
    name: 'HVAC',
    value: 50,
    icon: <AcUnitRoundedIcon sx={{ fontSize: '1rem' }} />,
    color: 'hsl(220, 25%, 65%)',
  },
  {
    name: 'Appliances',
    value: 27,
    icon: <KitchenRoundedIcon sx={{ fontSize: '1rem' }} />,
    color: 'hsl(220, 25%, 45%)',
  },
  {
    name: 'Lighting',
    value: 13,
    icon: <LightbulbRoundedIcon sx={{ fontSize: '1rem' }} />,
    color: 'hsl(220, 25%, 30%)',
  },
  {
    name: 'Other',
    value: 10,
    icon: <DevicesOtherRoundedIcon sx={{ fontSize: '1rem' }} />,
    color: 'hsl(220, 25%, 20%)',
  },
];

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        fontSize: theme.typography.h5.fontSize,
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = [
  'hsl(220, 20%, 65%)',
  'hsl(220, 20%, 42%)',
  'hsl(220, 20%, 35%)',
  'hsl(220, 20%, 25%)',
];

export default function ChartUserByCountry() {
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Usage by Device Type
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            height={260}
            width={260}
            hideLegend
          >
            <PieCenterLabel primaryText="842" secondaryText="kWh" />
          </PieChart>
        </Box>
        {categories.map((category, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            {category.icon}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {category.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Energy usage by device type"
                value={category.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: category.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
