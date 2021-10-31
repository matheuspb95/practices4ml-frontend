import { Header as GrHeader, Button, Box } from "grommet";
import { Menu, Search, Notification, Expand } from "grommet-icons";
import { useHistory } from "react-router-dom";

const HeaderButton = (props) => {
  let Icon;
  if (props.icon) {
    Icon = <props.icon size="20" />;
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
  return (
    <GrHeader pad="xsmall" color="white">
      <Box gap="medium" justify="start" direction="row">
        <HeaderButton
          icon={Menu}
          onClick={() => {
            props.changeSideBarState();
          }}
        />
        <HeaderButton label="Home" onClick={() => history.push("/")} />
        <HeaderButton
          label="Practices"
          onClick={() => history.push("/practices")}
        />
        <HeaderButton label="Members" />
        <HeaderButton label="About" />
      </Box>
      <Box direction="row">
        <HeaderButton icon={Search} />
        <HeaderButton icon={Notification} />
        <HeaderButton icon={Expand} />
      </Box>
    </GrHeader>
  );
};

export default Header;
