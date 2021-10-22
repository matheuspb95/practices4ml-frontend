import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Footer,
  Layer,
  Heading,
} from "grommet";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import api from "../api";

const Profile = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [userData, setUserData] = useState();
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/users", {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(data);
      } catch (e) {
        history.push("login");
      }
    })();
  }, [history]);

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="small" fill background="light-3">
          <Text size="30px">Profile</Text>
          <Box direction="row">
            {userData && (
              <>
                <ProfileCard
                  userData={userData}
                  setUserData={(change) => {
                    setUserData({ ...userData, ...change });
                  }}
                />
                <ProfileForm
                  setSuccess={setSuccess}
                  setErrors={setErrors}
                  userData={userData}
                  setUserData={(change) => {
                    setUserData({ ...userData, ...change });
                  }}
                />
              </>
            )}
          </Box>
        </Box>
        <Footer pad="small">
          Copyright © 2014-2021 AdminLTE.io. All rights reserved.
        </Footer>
      </Box>
      {errors.length > 0 && (
        <Layer onEsc={() => setErrors([])} onClickOutside={() => setErrors([])}>
          <Box pad="medium">
            <Heading color="status-error">ERRORS</Heading>
            {errors.map((error) => {
              return <Text>{error}</Text>;
            })}
            <Button label="close" onClick={() => setErrors([])} />
          </Box>
        </Layer>
      )}
      {success && (
        <Layer>
          <Box pad="medium">
            <Heading color="status-ok">SUCCESS</Heading>
            <Text>Loading Page</Text>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default Profile;
