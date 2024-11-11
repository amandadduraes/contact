import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handlePress = async () => {
    if (name.trim()) {
      try {
        await AsyncStorage.setItem('username', name);
        Alert.alert(`Bem-vindo, ${name}!`);
        router.push('/menu');
      } catch (error) {
        console.error("Erro ao salvar o nome", error);
        Alert.alert('Erro ao salvar o nome. Tente novamente.');
      }
    } else {
      Alert.alert('Por favor, digite seu nome.');
    }
  };

  return (
    <Container>
      <Logo source={require('../../assets/images/teddy.png')} />
      <WelcomeText>Olá, seja bem-vindo!</WelcomeText>
      <Input
        placeholder="Digite o seu nome:"
        value={name}
        onChangeText={setName}
      />
      <Button onPress={handlePress}>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  resize-mode: contain;
`;

const WelcomeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  background-color: #ff7a00;
  padding: 15px 20px;
  border-radius: 8px;
  align-items: center;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

export default WelcomeScreen;
