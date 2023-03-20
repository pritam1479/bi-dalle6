import React from 'react';
import { useList } from '@pankod/refine-core';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import {
  PieChart,
  ToolRefferals,
  TotalRevenue,
  ToolCard,
  TopEditor
} from '../components';

const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        DashBoard Panel
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart 
          title="Active AI users"
          value={100000}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
        <PieChart 
          title="Total AI users"
          value={61600}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
        <PieChart 
          title="Total countries AI is available in"
          value={90}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
        <PieChart 
          title="Total cities AI is available in"
          value={500}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
      </Box>

      <Stack mt="25px" width="100%" direction={{ xs: 'column', lg: 'row'}} gap={4}>
        <TotalRevenue />
        <ToolRefferals />
      </Stack>
    </Box>
  )
}

export default Home