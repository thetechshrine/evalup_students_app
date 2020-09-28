import React from 'react';
import { Box, Flex, Menu, MenuButton, MenuGroup, MenuList, Button, Image, Text } from '@chakra-ui/core';
import { BiLogOut } from 'react-icons/bi';
import { MdAccountCircle } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import dimens from '../../config/dimens';
import dialogsActions from '../../store/actions/ui/dialogs';

import Logo from '../helpers/Logo';
import NavbarAction from './navbar_actions/NavbarAction';

function Navbar() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(
      dialogsActions.showConfirmationDialog({
        title: 'Déconnexion ?',
        message:
          'En vous déconnectant, toutes vos actions en cours seront annulées et aucune sauvegarde ne sera effectuée. Fermer bien toutes vos tâches.',
        onConfirm: function () {
          console.log('Logout');
        }
      })
    );
  }

  return (
    <Box
      position='sticky'
      backgroundColor='white'
      top='0'
      zIndex={2}
      height={dimens.navbarHeight}
      boxShadow='0 1px 5px 0 rgba(0, 0, 0, 0.1)'
    >
      <Flex height='100%' padding='0 2rem' justifyContent='space-between' alignItems='center'>
        <Logo />

        <Menu>
          <MenuButton as={Button} rightIcon='chevron-down'>
            <Image
              size='2rem'
              rounded='full'
              src='https://placekitten.com/100/100'
              alt='Fluffybuns the destroyer'
              mr='12px'
            />
            <Text>User</Text>
          </MenuButton>
          <MenuList placement='bottom-end'>
            <MenuGroup title='Profil'>
              <NavbarAction icon={MdAccountCircle} title='Mon compte' />
              <NavbarAction icon={BiLogOut} title='Déconnexion' onClick={handleLogout} />
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default Navbar;
