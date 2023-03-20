import { Email } from "@mui/icons-material";
import { Box, Stack, Typography } from "@pankod/refine-mui";

import { ProfileProps } from "interfaces/common";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const Profile = ({ type, name, avatar, email }: ProfileProps) => (
  <Box>
    <Typography fontSize={25} fontWeight={700} color="#11142D">
      {type} Profile
    </Typography>
    <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
    <Box
        sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2.5,
        }}
    >
        <Box
            flex={1}
            sx={{
                marginTop: { md: "58px" },
                marginLeft: { xs: "20px", md: "0px" },
            }}
        >
            <Box
                flex={1}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap="20px"
            >
                <img
                    src={
                      checkImage(avatar)
                      ? avatar
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    }
                    width={78}
                    height={78}
                    alt="user_profile"
                    className="my_profile_user-img"
                />

                <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    gap="30px"
                >
                    <Stack direction="column">
                        <Typography
                            fontSize={22}
                            fontWeight={600}
                            color="#11142D"
                        >
                            {name}
                        </Typography>
                        <Typography fontSize={16} color="#808191">
                            Anonymus
                        </Typography>
                    </Stack>

                    <Stack direction="column" gap="30px">
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            gap="20px"
                            pb={4}
                        >
                            <Stack flex={1} gap="15px">
                                <Typography
                                    fontSize={14}
                                    fontWeight={500}
                                    color="#808191"
                                >
                                    Email
                                </Typography>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    gap="10px"
                                >
                                    <Email sx={{ color: "#11142D" }} />
                                    <Typography
                                        fontSize={14}
                                        color="#11142D"
                                        >
                                        {email}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Box>
    </Box>
  </Box>
</Box>
);

export default Profile;