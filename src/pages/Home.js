import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import Header from '../components/Header'
import SideBar from '../components/SideBar'

class Home extends Component {
  state = {
    showSidebar: true,
  }
  render() {
    return (
        <Box fill direction='row'>
          {this.state.showSidebar && (
            <SideBar/>
            )}
          <Box fill>
            <Header changeSideBarState={
              () => this.setState({ showSidebar: !this.state.showSidebar })
            } />
            <Box pad="small" fill background='light-3'>
              <Text>SEPractices4ML</Text>
            </Box>
          </Box>
        </Box>
    );
  }
}

export default Home