import React, { useState, useEffect } from "react";
import { Box, Text, List } from "grommet";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import api from "../api";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const history = useHistory();
  const [showSidebar, setShowSidebar] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/users/notifications", {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(data);
      } catch (e) {
        setErrors(["Error on token validation, do login"]);
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      }
    })();
  }, [history]);

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="medium" fill background="light-3">
          <Text size="28px" color="black">
            Notifications
          </Text>
          <Box background="light-1" round="xsmall" elevation="small">
            <List
              margin={{ vertical: "medium" }}
              data={notifications}
              primaryKey="text"
              secondaryKey={(notif) => new Date(notif.date).toUTCString()}
              onClickItem={({ item }) => {
                history.push("/view-practice", item.practice_id);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
