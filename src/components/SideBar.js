import React, { useState, useEffect } from "react";
import { Avatar, Box, Sidebar, Nav, Text, TextInput } from "grommet";
import {
  Search,
  UserManager,
  Apps,
  FormPrevious,
  FormDown,
  Radial,
} from "grommet-icons";
import { useHistory } from "react-router-dom";
import api from "../api";

const SideBarButton = (props) => {
  return (
    <Box
      onClick={props.onClick}
      pad={{ horizontal: "small" }}
      direction="row"
      align="center"
      gap="small"
    >
      <Box
        round
        pad="xsmall"
        style={{ minWidth: "32px" }}
        size="32px"
        background="light-2"
      >
        {props.children}
      </Box>
      <Text weight="lighter">{props.label}</Text>
    </Box>
  );
};

const DropDownMenu = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box
        pad="xsmall"
        round="xxsmall"
        align="center"
        gap="small"
        direction="row"
        onClick={() => setOpen(!open)}
        hoverIndicator="dark-3"
      >
        <Apps />
        <Box align="center" fill direction="row" justify="between">
          {props.label}
          {open ? <FormDown /> : <FormPrevious />}
        </Box>
      </Box>
      {open &&
        props.options &&
        props.options.map((opt) => {
          return (
            <Box pad="xsmall">
              <Box
                pad="xsmall"
                round="xxsmall"
                align="center"
                gap="small"
                direction="row"
                onClick={opt.onClick}
                hoverIndicator="dark-3"
              >
                <Radial size="16px" />
                <Box align="center" fill direction="row" justify="between">
                  {opt.label}
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

const SearchBar = (props) => {
  return <TextInput icon={<Search />} reverse placeholder="Search" />;
};

const SideBar = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

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
      } catch (e) {
        history.push("login");
      }
    })();
  }, [history]);

  return (
    <Sidebar
      style={{
        minHeight: "100vh",
        minWidth: "250px",
      }}
      background="brand"
      pad="small"
    >
      <Nav gap="small" width="250px">
        <SideBarButton label="SEPractices4ML">
          <Text size="20px" weight="bolder" color="dark-2">
            SE
          </Text>
        </SideBarButton>
        <Box border="bottom" />
        <SideBarButton
          onClick={() => history.push("/profile")}
          label={userData.name}
        >
          <Avatar
            background="accent-2"
            size="small"
            src={userData.photo}
          >
            <UserManager size="small" />
          </Avatar>
        </SideBarButton>
        <Box border="bottom" />
        <SearchBar />
        <DropDownMenu
          label="My Practices"
          options={[
            {
              label: "Add New",
              onClick: () => {
                history.push("/add-practice");
              },
            },
            { label: "Submitted" },
          ]}
        />
      </Nav>
    </Sidebar>
  );
};

export default SideBar;
