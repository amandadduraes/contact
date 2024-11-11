// app/menu.tsx

import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MenuScreenProps {
  navigateToClients: () => void;
}


const MenuScreen = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [username, setUsername] = useState('');
  
  const loadUsername = async () => {
    try {
      const name = await AsyncStorage.getItem('username'); 
      if (name) setUsername(name);
    } catch (error) {
      console.error('Erro ao carregar o nome:', error);
    }
  };
  return (
    <Container>
      <Header>
        <Logo source={require('../assets/images/teddy.png')} />
      </Header>
      <MenuItems>
        <Link href="/(tabs)" onPress={() => setActiveItem('Home')} asChild>
          <MenuItem>
            <Icon
              name="home"
              size={24}
              color={activeItem === 'Home' ? '#ff7a00' : '#000'}
            />
            <MenuText active={activeItem === 'Home'}>Home</MenuText>
          </MenuItem>
        </Link>
        <Link href="/clients" onPress={() => setActiveItem('Clientes')} asChild>
          <MenuItem>
            <Icon
              name="people"
              size={24}
              color={activeItem === 'Clientes' ? '#ff7a00' : '#000'}
            />
            <MenuText active={activeItem === 'Clientes'}>Clientes</MenuText>
          </MenuItem>
        </Link>
        <Link href="/products" onPress={() => setActiveItem('Produtos')} asChild>
          <MenuItem>
            <Icon
              name="shopping-cart"
              size={24}
              color={activeItem === 'Produtos' ? '#ff7a00' : '#000'}
            />
            <MenuText active={activeItem === 'Produtos'}>Produtos</MenuText>
          </MenuItem>
        </Link>
      </MenuItems>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  background-color: #d3d3d3;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  resize-mode: contain;
`;

const MenuItems = styled.View`
  flex: 1;
  padding: 20px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const MenuText = styled.Text<{ active?: boolean }>`
  font-size: 18px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#ff7a00' : '#000')};
  margin-left: 10px;
`;

export default MenuScreen;
