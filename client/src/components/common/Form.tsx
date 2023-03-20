import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, Select, MenuItem, Button } from '@pankod/refine-mui';
import { FormProps } from 'interfaces/common';
import { CustomButton } from 'components';

const Form = ({ type, register, formLoading, handleSubmit, toolImage, handleImageChange, onFinishHandler }: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Tool Card
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px'}}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{ fontWeight: 500, margin: '10px 2px', fontSize: 16, color: '#11142d'}}
            >
              Enter Tool name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined_basic"
              color="info"
              variant="outlined"
              {...register('title', {
                required: true
              })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText sx={{
              fontWeight: 500, margin: "10px 20px", fontSize: 16, color: "#11142d"
            }}>
              Tool Details
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder='Enter Details'
              color="info"
              style={{ width: "100%", background: 'transparent', fontSize: "16px", borderColor: 'rgba(0,0,0,0.23', borderRadius: 6, padding: 10, color: "#919191"}}
              {...register('description', {
                required: true
              })}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
              <FormControl sx={{ flex: 1}}>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: '10px 20px',
                    fontSize: 16,
                    color: '#11142d'
                  }}
                >
                  Select Tool Type
                </FormHelperText>
                <Select
                  variant='outlined'
                  color="info"
                  displayEmpty
                  required
                  inputProps={{ 'aria-label': 'Without label'}}
                  defaultValue="social_media"
                  {...register('toolType', {
                    required: true
                  })}
                >
                  <MenuItem value="social_media">Social Media</MenuItem>
                  <MenuItem value="text_ai">Text AI</MenuItem>
                  <MenuItem value="image_ai">Image AI</MenuItem>
                  <MenuItem value="video_ai">Video AI</MenuItem>
                  <MenuItem value="digital_ads_ai">Digital Ads AI</MenuItem>
                  <MenuItem value="voice_ai">Voice AI</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <FormHelperText
                  sx={{ fontWeight: 500, margin: "10px 20px", fontSize: 16, color: "#11142d"
                }}
                >Enter purchase type or price</FormHelperText>
                <TextField
                  fullWidth
                  required
                  placeholder='recomended/free/price'
                  defaultValue="free"
                  id="outlined_basic"
                  color="info"
                  variant="outlined"
                  {...register('price', {
                    required: true
                  })}
                />
              </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{ fontWeight: 500, margin: "10px 20px", fontSize: 16, color: "#11142d"}}
            >
              Special Offers (optional)
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined_basic"
              color="info"
              variant="outlined"
              {...register('offers', {required: false })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{ fontWeight: 500, margin: "10px 20px", fontSize: 16, color: "#11142d"}}
            >
              Link
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined_basic"
              color="info"
              variant="outlined"
              {...register('link', {required: false })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{ fontWeight: 500, margin: "10px 20px", fontSize: 16, color: "#11142d"}}
            >
              Trending
            </FormHelperText>
            <TextField
              fullWidth
              placeholder='Yes or No'
              id="outlined_basic"
              color="info"
              variant="outlined"
              {...register('trending', {required: false })}
            />
          </FormControl>
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
             <Stack direction="row" gap={2}>
              <Typography color="#11142d" fontSize={16} fontWeight={500} my="10px"
              >Tool Photo</Typography>
              <Button component="label" sx={{ width: 'fit-content', color: "#2ed480", textTransform: 'capitalize', fontSize: 16}}>
                Upload *
                <input 
                  hidden
                  accept='image/'
                  type="file"
                  // @ts-ignore
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
              </Button>
             </Stack>
             
             <Typography fontSize={14} color="#808191" sx={{wordBreak: 'break-all'}}>{toolImage?.name}</Typography>
          </Stack>
          <CustomButton 
            type="submit"
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  )
}

export default Form