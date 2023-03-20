import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box, Typography } from "@pankod/refine-mui";
import { AI } from "assets";

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID ||  '913424385085-rvsoq33gl1iaiefu8j34ssfipunj5rb7.apps.googleusercontent.com',
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{
        background: 'rgba(0,0,0,0)',
        opacity: "0px",
        backgroundSize: "cover",
      }}
    >
      <img src={AI} alt="AI" style={{ width: "70%", justifyContent: 'center', marginLeft: "200px"}} 
      />
      <Typography fontSize={20} fontWeight={700} color="#11142d" sx={{ marginLeft: "400px" }}>Join now to create Social Media Following by Tested AIs</Typography>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "20vh",
        }}
      >
        <Box
          mx={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src="./favicon.ico" alt="BI Logo" style={{ width: "90px" }} />
          </div>
          <Box mt={4}>
            <GoogleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
