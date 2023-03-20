import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
    Brightness1,
    Delete,
    Edit,
    Star,
} from "@mui/icons-material";

import { CustomButton } from "components";

const ToolDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const toolDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === toolDetails.creator.email;

    const handleDeleteTool = () => {
        const response = window.confirm(
          "Are you sure you want to delete this tool?"
        );
        if (response) {
            mutate(
                {
                    resource: "tools",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/tools");
                    },
                },
            );
        }
    };

    return (
        <Box
          borderRadius="15px"
          padding="20px"
          bgcolor="#fcfcfc"
          width="fit-content"
        >
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            Details
          </Typography>

          <Typography
            sx={{ py: '8px' }}
            fontSize={20} fontWeight={600} color="#11142d" 
          >
            <a href={toolDetails.link} style={{ textDecoration: 'none', color: "#11142d"}}>Your Personalize Page {`---->`}</a>
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexDirection={{ xs: "column", lg: "row" }}
            gap={4}
          >
            <Box flex={1} maxWidth={900}>
                <img 
                    src={toolDetails.photo}
                    alt="tool_details-img"
                    height={500}
                    width={700}
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                    className="tool_details-img"
                />
                <Box mt="15px">
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        alignItems="center"
                    >
                        <Typography
                            fontSize={20}
                            fontWeight={700}
                            color="#11142d"
                        >
                            Type
                        </Typography>
                        <Typography
                            fontSize={18}
                            fontWeight={500}
                            color="#11142d"
                            textTransform="capitalize"
                        >
                            {toolDetails.toolType}
                        </Typography>
                        <Box>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Star 
                                    key={`star-${item}`}
                                    sx={{ color: "#F2C94C" }}
                                />
                            ))}
                        </Box>
                    </Stack>

                    <Stack direction="column" mt="10px">
                        <Typography
                            fontSize={20}
                            fontWeight={700}
                            color="#11142d"
                        >
                            Name
                        </Typography>
                        <Typography
                            fontSize={18}
                            fontWeight={500}
                            color="#11142d"
                            textTransform="capitalize"
                            mt={1}
                        >
                            {toolDetails.title}
                        </Typography>
                        {(toolDetails.offers).toLowerCase() !== 'no' ? (
                            <Stack mt={1}>
                                <Typography
                                    fontSize={20}
                                    fontWeight={700}
                                    color="#11142d"
                                >
                                    Special Offers
                                </Typography>
                                <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142d"
                                textTransform="capitalize"
                                mt={1}
                                >   
                                    {toolDetails.offers}
                                </Typography>
                            </Stack>
                        ) : ""}
                        {(toolDetails.trending).toLowerCase() === 'yes' ? (
                            <Stack direction="row" display="flex" justifyContent="flex-end">
                                <Brightness1 sx={{ color: "#c332e3" }} />
                                <Typography
                                    mx={1}
                                >Trending</Typography>
                            </Stack>
                        ) : ""}
                        <Typography
                            mt={1}
                            fontSize={20}
                            fontWeight={700}
                            color="#11142d"
                        >
                            Description
                        </Typography>
                        <Typography
                            mt={1}
                            fontSize={18}
                            fontWeight={500}
                            color="#11142d"
                            textTransform="capitalize"
                            maxWidth={500}
                        >
                            {toolDetails.description}
                        </Typography>
                    </Stack>
                    <Stack direction="row" mt={3} gap={10} justifyContent="space-between">
                        <CustomButton
                            title={!isCurrentUser ? "" : "Edit"}
                            backgroundColor="#475BE8"
                            color="#fcfcfc"
                            fullWidth
                            icon={
                                !isCurrentUser ? "" :
                                <Edit />
                            }
                            handleClick={() => {
                                if (isCurrentUser) {
                                    navigate(
                                        `/tools/edit/${toolDetails._id}`,
                                    );
                                }
                            }}
                        />
                        <CustomButton
                            title={!isCurrentUser ? "" : "Delete"}
                            backgroundColor={
                                !isCurrentUser ? "#2ED480" : "#d42e2e"
                            }
                            color="#FCFCFC"
                            fullWidth
                            icon={!isCurrentUser ? "": <Delete />}
                            handleClick={() => {
                                if (isCurrentUser) handleDeleteTool();
                            }}
                        />
                    </Stack>
                </Box>
            </Box>
          </Box>
        </Box>
    );
};

export default ToolDetails;