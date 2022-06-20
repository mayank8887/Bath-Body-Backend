import { Flex } from "@chakra-ui/react";
import React from "react";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Avatar
  } from '@chakra-ui/react'

const Profile = ()=>{
 

    return (
        <Flex>
           <Menu>
              <MenuButton as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}>
              <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
              </MenuButton>
            <MenuList>
             <MenuItem>Cart</MenuItem>
             <MenuItem>Login</MenuItem>
             <MenuItem>Logout</MenuItem>
            </MenuList>
           </Menu>
        </Flex>
    )
}

export default Profile;