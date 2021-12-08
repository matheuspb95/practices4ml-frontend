import React, { useState, useEffect } from "react";
import { Box, Text, Button, Layer, Heading } from "grommet";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import api from "../api";

const Profile = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [userData, setUserData] = useState();
  const [photoData, setPhotoData] = useState();
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/users/me", {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(data);
        setPhotoData({ photo: data.photo });
      } catch (e) {
        history.push("login");
      }
    })();
  }, [history]);

  const submitData = async ({ value }) => {
    if (value.areas) value.areas = value.areas.map((v) => v.value);
    if (value.degree) value.degree = value.degree.value;

    const form = { ...userData, ...value, ...photoData };
    const token = localStorage.getItem("token");

    try {
      await api.put("/users", form, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        history.push("/");
      }, 500);
    } catch (e) {
      console.log(e);
      setErrors(["Error on update user"]);
    }
  };

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="small" fill background="light-3">
          <Text size="30px">Profile</Text>
          <Box direction="row">
            {userData && photoData && (
              <>
                <ProfileCard
                  userData={userData}
                  photoData={photoData}
                  setPhotoData={setPhotoData}
                />
                <ProfileForm
                  setSuccess={setSuccess}
                  setErrors={setErrors}
                  userData={userData}
                  setUserData={(change) => {
                    setUserData({ ...userData, ...change });
                  }}
                  submitData={submitData}
                />
              </>
            )}
          </Box>
        </Box>
        {/* <Footer pad="small">
          Copyright © 2014-2021 AdminLTE.io. All rights reserved.
        </Footer> */}
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
