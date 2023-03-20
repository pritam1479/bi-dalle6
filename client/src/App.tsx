import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from 'interfaces/google';
import { parseJwt } from "utils/parse-jwt";
import { 
  StarOutlined, ChatBubble, InsertPhoto, VideoLibrary, Construction, PeopleAlt
} from "@mui/icons-material";
import { 
  Login,
  Home,
  AllToolsPage,
  ToolDetails,
  CreateTool,
  EditTool,
  TrendingPage,
  ChatBotPage,
  ImagePage,
  VideoPage,
  MyProfilePage
 } from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      // Save user to MongoDB
      if (profileObj) {
        const response = await fetch('http://localhost:8080/api/v1/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          })
        })
        const data = await response.json();

        if (profileObj) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userId: data._id
            })
          );
        } else {
          return Promise.reject();
        }
      }
      
      
      
      localStorage.setItem("token", `${credential}`);
      
      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("http://localhost:8080/api/v1")}
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
              {
                name: "tools",
                options: { label: 'All Tools'},
                list: AllToolsPage,
                show: ToolDetails,
                create: CreateTool,
                edit: EditTool,
                icon: <Construction />
              },
              {
                name: "trending",
                options: { label: 'Trending' },
                list: TrendingPage,
                show: ToolDetails,
                icon: <StarOutlined />
              },
              {
                name: "chatbot",
                options: { label: 'ChatBot' },
                list: ChatBotPage,
                show: ToolDetails,
                icon: <ChatBubble />
              },
              {
                name: "image",
                options: { label: 'Image' },
                list: ImagePage,
                show: ToolDetails,
                icon: <InsertPhoto />
              },
              {
                name: "video",
                options: { label: "Video" },
                list: VideoPage,
                show: ToolDetails,
                icon: <VideoLibrary />
              },
              {
                name: "my-profile",
                options: { label: 'My Profile' },
                list: MyProfilePage,
                icon: <PeopleAlt />
              },
            ]}
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            routerProvider={routerProvider}
            authProvider={authProvider}
            LoginPage={Login}
            DashboardPage={Home}
          />
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </>
  );
}

export default App;
