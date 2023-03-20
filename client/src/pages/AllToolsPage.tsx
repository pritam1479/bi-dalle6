import { useMemo } from 'react';
import { Box, Stack, TextField, Typography, Select, MenuItem } from "@pankod/refine-mui";
import { useNavigate } from '@pankod/refine-react-router-v6';
import { useTable } from '@pankod/refine-core';
import { CustomButton, ToolCard } from 'components';
import { Add } from '@mui/icons-material';

const AllToolsPage = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter, setSorter,
    filters, setFilters
  } = useTable();

  const allTools = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === 'price')?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }])
  }

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      description: logicalFilters.find((item) => item.field === 'description')?.value || '',
      toolType: logicalFilters.find((item) => item.field === 'toolType')?.value || '',
    }
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Error...</Typography>

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3}}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allTools.length ? "There are no tools to use": "All Tools"}
          </Typography>
          <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
            <Box display="flex" flexWrap="wrap" gap={2} mb={{ xs: '20px', sm: 0 }}>
              <CustomButton
                title={`Sort Price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor="#c332e3"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])
                }}
                />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label'}}
                defaultValue=""
                value={currentFilterValues.toolType}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'toolType',
                      operator: 'eq',
                      value: e.target.value
                    }
                  ], 'replace')
                  console.log(filters);
                }}
              >
                <MenuItem value="">All</MenuItem>
                {['Social_Media','Text_AI','Image_AI','Video_AI','Digital_Ads_AI',
                'Voice_AI', 'Others'].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="end"
      alignItems="center">
        <CustomButton 
          title="Add Tool"
          handleClick={() => navigate('/tools/create')}
          backgroundColor="#c332e3"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allTools.map((tool) => (
          <ToolCard 
            key={tool._id}
            id={tool._id}
            title={tool.title}
            description={tool.description}
            offers={tool.offers}
            trending={tool.trending}
            price={tool.price}
            photo={tool.photo}
          />
        ))}
      </Box>

      {allTools.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={3}>
          <CustomButton 
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems="center" gap="5px" >
            Page{' '}<strong>{current} of {pageCount} </strong>
          </Box>
          <CustomButton 
            title="Previous"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant='outlined'
            color="info"
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10 )}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>
                Show {size}
              </MenuItem>
            ))}
            <MenuItem value="">All</MenuItem>
          </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllToolsPage