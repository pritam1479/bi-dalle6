import { useList } from '@pankod/refine-core';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { ToolCard } from 'components';

const VideoPage = () => {
  const { data, isLoading, isError } = useList({
    resource: "tools",
  })

  const checkData = data?.data || [];
  
  const rawData = checkData.filter((item) => (item.toolType).toLowerCase() === 'video_ai');
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <Stack>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3}}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!rawData.length ? "There are no tools to use": "Video AI Tools"}
          </Typography>
        </Stack>
      </Box>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {rawData.map((tool) => (
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
    </Stack>
  )
}

export default VideoPage