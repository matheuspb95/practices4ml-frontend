import React, { useState, useEffect, useRef } from "react";
import { Header as GrHeader, Button, Box, Stack, Text, Drop } from "grommet";
import {
  Menu,
  Notification,
  Like,
  Chat,
  Document,
} from "grommet-icons";
import { useHistory } from "react-router-dom";
import api from "../api";
import AlertModal from "./AlertModal";

const HeaderButton = (props) => {
  let Icon;
  if (props.icon) {
    Icon = (
      <Stack anchor="top-right">
        <Box pad="xsmall">
          <props.icon size="20" />
        </Box>
        {props.counter && (
          <Box background="accent-4" pad="xxsmall" round>
            <Text size="10px">{props.counter}</Text>
          </Box>
        )}
      </Stack>
    );
  }
  return (
    <Button
      margin="small"
      icon={Icon || undefined}
      label={props.label}
      plain
      color="dark-3"
      onClick={props.onClick}
    />
  );
};

const Header = (props) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [errors, setErrors] = useState([]);
  const notifRef = useRef();
  const [showNotif, setShowNotif] = useState(false);

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

  const clickNotif = (item) => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        api.get("/users/view-notification", {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { notif_id: item["_id"] },
        });
        history.push("/view-practice", item.practice_id);
      } catch (e) {
        setErrors(["Error on token validation, do login"]);
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      }
    })();
  };

  return (
    <GrHeader pad="xsmall" color="white">
      <Box gap="medium" justify="start" direction="row">
        <HeaderButton
          icon={Menu}
          onClick={() => {
            props.changeSideBarState();
          }}
        />
        <HeaderButton label="Home" onClick={() => history.push("/home")} />
        <HeaderButton
          label="Practices"
          onClick={() => history.push("/practices")}
        />
        <HeaderButton
          label="Members"
          onClick={() => history.push("/members")}
        />
        <HeaderButton label="About" onClick={() => history.push("/about")} />
      </Box>
      <Box direction="row" ref={notifRef}>
        {/* <HeaderButton icon={Search} /> */}
        <HeaderButton
          icon={Notification}
          counter={notifications.filter((not) => !not.read).length}
          onClick={() => setShowNotif(true)}
        />
        {showNotif && (
          <Drop
            align={{ right: "right", top: "bottom" }}
            target={notifRef.current}
            onClickOutside={() => setShowNotif(false)}
          >
            <Box>
              <Box
                pad="xsmall"
                border={{ side: "bottom", size: "1px", color: "light-6" }}
              >
                <Text textAlign="center" size="14px">
                  {notifications.filter((not) => !not.read).length}{" "}
                  Notifications
                </Text>
              </Box>
              {notifications
                .filter((not) => !not.read)
                .map((notif) => {
                  return (
                    <Box
                      onClick={() => clickNotif(notif)}
                      width="medium"
                      gap="xxsmall"
                      pad="xsmall"
                      direction="row"
                      border={{ side: "bottom", size: "1px", color: "light-6" }}
                    >
                      {notif.type === "practice_like" && <Like size="16px" />}
                      {notif.type === "comment_like" && <Like size="16px" />}
                      {notif.type === "comment" && <Chat size="16px" />}
                      {notif.type === "added_author" && (
                        <Document size="16px" />
                      )}
                      <Text size="16px">{notif.text}</Text>
                    </Box>
                  );
                })}
              <Box
                onClick={() => {
                  history.push("/notifications");
                }}
                pad="xsmall"
                border={{ side: "bottom", size: "1px", color: "light-6" }}
              >
                <Text textAlign="center" size="14px">
                  see all notifications
                </Text>
              </Box>
            </Box>
          </Drop>
        )}
        {/* <HeaderButton icon={Expand} /> */}
        <AlertModal errors={errors} setErrors={setErrors} />
      </Box>
    </GrHeader>
  );
};

export default Header;
