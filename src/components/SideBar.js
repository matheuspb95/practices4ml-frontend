import { Avatar, Box, Sidebar, Nav, Text, TextInput } from 'grommet';
import { Search, User } from 'grommet-icons';

const SideBarButton = (props) => {
  return <Box pad={{ horizontal: "small" }} direction="row" align="center" gap="small">
            <Avatar pad="small" style={{minWidth:"32px"}} size="32px" background="light-2">
              {props.children}
            </Avatar>
            <Text weight="lighter">{props.label}</Text>
          </Box>
}

const SearchBar = (props) => {
  return <TextInput icon={<Search />} reverse placeholder="Search" />
}

const SideBar = () => {
  return <Sidebar background="brand" pad="small">
            <Nav gap="small" width="250px">
              <SideBarButton label="SEPractices4ML">
                <Text size="20px" weight="bolder" color="dark-2">SE</Text>
              </SideBarButton>
              <Box border="bottom" />
              <SideBarButton label="User Name">
                <User color="dark-1" />                  
              </SideBarButton>
              <Box border="bottom" />
              <SearchBar />
            </Nav>
          </Sidebar>
}

export default SideBar;