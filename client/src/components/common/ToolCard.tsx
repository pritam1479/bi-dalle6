import { TrendingUp } from '@mui/icons-material'
import { Link } from '@pankod/refine-react-router-v6'
import { Box, Typography, Card, CardMedia, CardContent, Stack } from '@pankod/refine-mui';
import { ToolCardProps } from 'interfaces/tool';

const ToolCard = ({ id, title, description, offers, trending, price, photo }: ToolCardProps) => {
  return (
    <Card
      component={Link}
      to={`/tools/show/${id}`}
      sx={{
        maxWidth: '330px',
        padding: '10px',
        '&:hover': {
          boxShadow: '0 22px 45px 2px rgba(176,176,176,0.1)'
        },
        cursor: 'pointer',
        textDecoration: 'none'
      }}
      elevation={0}
    >
      <CardMedia 
        component="img"
        width="100%"
        height="210px"
        image={photo}
        alt="card image"
        sx={{ borderRadius: '10px' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', padding: '5px'}}>
        <Stack direction="column" gap={1}>
          <Typography fontSize="18px" fontWeight={500} color="11142d" >{title}</Typography>
          {(offers).toLowerCase() !== 'no' ? (
            <Box sx={{ color: "#fcfcfc", bgcolor: "#e833ca", borderRadius: "5px", px: "5px", fontSize: "18px", fontWeight: 500, width: "fit-content" }}>Special Offers</Box>
          ) : ""}
          
          {(trending).toLowerCase() === "yes" ? (
            <Stack direction="row">
              <TrendingUp />
              <Typography>Trending</Typography>
            </Stack>
          ) : ""}
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Typography fontSize={16} color="#808191" >{description.slice(0, 50)}....</Typography>
          </Stack>
        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} bgcolor="#dadefa" height="fit-content">
          <Typography fontSize="12px" fontWeight={700} color="#475be8" sx={{ textDecoration: 'none' }}>{Number(price) ? `$${price}` : `${price}`}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ToolCard