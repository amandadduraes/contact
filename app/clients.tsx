import { Client, CreateClient } from '@/interfaces/types';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, Modal, View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuScreen from './menu';
import { fetchClients, deleteClient, createClientService } from '@/services/clientService';
import { updateClientService } from '@/services/clientService';
import { useNavigation } from '@react-navigation/native';
import SelectedClientsScreen from './selectedClients';

const options = [2, 4, 8, 10, 12, 16];
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ClientsScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newClient, setNewClient] = useState<CreateClient>({ name: '', salary: 0, companyValuation: 0 });
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [salaryInputValue, setSalaryInputValue] = useState(''); 
  const [valuationInputValue, setValuationInputValue] = useState(''); 
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [isSelectedClientsModalOpen, setIsSelectedClientsModalOpen] = useState(false);
  const [showSelectedClients, setShowSelectedClients] = useState(false);
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);
  const [addedClientName, setAddedClientName] = useState(''); 



  const closeAddConfirmation = () => {
    setShowAddConfirmation(false);
  };


  useEffect(() => {
    const loadUsername = async () => {
      try {
        const name = await AsyncStorage.getItem('username');
        if (name) setUsername(name);
      } catch (error) {
        console.error('Erro ao carregar o nome:', error);
      }
    };

    loadUsername();
  }, []);

  useEffect(() => {
    loadClients();
  }, [page, limit]);


  
  const clearSelectedClients = () => {
    setSelectedClients([]);
  };

  const loadClients = async () => {
    try {
      const data = await fetchClients(page, limit);
      setClients(data.clients);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };


  const handleShowSelectedClients = () => {
    setShowSelectedClients(true);
  };

  const handleRemoveClient = (clientId: number) => {
    setSelectedClients((prev) => prev.filter((client) => client.id !== clientId));
  };

  const handleClearClients = () => {
    setSelectedClients([]);
  };

if (showSelectedClients) {
  return (
    <SelectedClientsScreen
      selectedClients={selectedClients}
      onRemoveClient={handleRemoveClient}
      onClearClients={handleClearClients}
      onClose={() => setShowSelectedClients(false)} 
    />
  );
}
  const openEditModal = (client: Client) => {
    setSelectedClient(client);
    setNewClient({
      name: client.name,
      salary: client.salary,
      companyValuation: client.companyValuation,
    });
    setSalaryInputValue(client.salary.toString());
    setValuationInputValue(client.companyValuation.toString());
    setIsEditMode(true);
    setIsCreateModalOpen(true);
  };


  const handleCurrencyInputChange = (text: string, field: 'salary' | 'companyValuation') => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    const numericValue = parseFloat(cleanedText) / 100;

    if (field === 'salary') {
      setSalaryInputValue(cleanedText);
      setNewClient((prev) => ({ ...prev, salary: isNaN(numericValue) ? 0 : numericValue }));
    } else if (field === 'companyValuation') {
      setValuationInputValue(cleanedText);
      setNewClient((prev) => ({ ...prev, companyValuation: isNaN(numericValue) ? 0 : numericValue }));
    }
  };

  const handleSaveClient = async () => {
    try {
      if (isEditMode && selectedClient) {
        await updateClientService(selectedClient.id, newClient);
        Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
      } else {
        await createClientService(newClient);
        Alert.alert('Sucesso', 'Cliente criado com sucesso!');
      }
      setIsCreateModalOpen(false);
      setNewClient({ name: '', salary: 0, companyValuation: 0 });
      setSalaryInputValue('');
      setValuationInputValue('');
      loadClients();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      Alert.alert('Erro', 'Erro ao salvar cliente. Tente novamente.');
    }
  };


  const formatCurrencyInput = (value: string) => {
    if (!value) return 'R$ 0,00';
    const numericValue = parseFloat(value) / 100;
    return formatCurrency(numericValue);
  };

  const handleCreateClient = async () => {
    try {
      await createClientService(newClient);
      setIsCreateModalOpen(false);
      setNewClient({ name: '', salary: 0, companyValuation: 0 });
      setSalaryInputValue('');
      setValuationInputValue('');
      loadClients();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(slideAnim, { toValue: -300, duration: 300, useNativeDriver: true }).start(() =>
        setIsMenuOpen(false)
      );
    } else {
      setIsMenuOpen(true);
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  };

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteModalVisible(true);
  };

  const confirmDeleteClient = async () => {
    if (selectedClient) {
      try {
        const success = await deleteClient(selectedClient.id);
        if (success) {
          setClients(clients.filter(client => client.id !== selectedClient.id));
          Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao excluir cliente');
      } finally {
        setIsDeleteModalVisible(false);
        setSelectedClient(null);
      }
    }
  };

  const handleLimitSelect = (value: number) => {
    setLimit(value);
    setIsDropdownOpen(false);
    setPage(1);
  };

  const renderPagination = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <TouchableOpacity key={i} onPress={() => setPage(i)}>
          <PageNumber isActive={i === page}>{i}</PageNumber>
        </TouchableOpacity>
      );
    }
    return paginationItems;
  };

  const handleAddClient = (client: Client) => {
    setSelectedClients((prev) => {
      if (prev.some((selected) => selected.id === client.id)) {
        return prev;
      }
      return [...prev, client];
    });
    setAddedClientName(client.name);
    setShowAddConfirmation(true);

    // Fecha a modal automaticamente após 2 segundos
    setTimeout(() => {
      setShowAddConfirmation(false);
    }, 2000);
  };
  return (
    <Container>
      <Header>
        <Logo source={require('../assets/images/teddy.png')} />
        <Username>{username}</Username>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
      </Header>

      <View>
     
      <ButtonContainer>
        <StyledButton onPress={handleShowSelectedClients}>
          <StyledButtonText>Ver clientes selecionados</StyledButtonText>
        </StyledButton>
      </ButtonContainer>
    </View>
      <InfoContainer>
        <CenteredInfoText>
          <BoldText>{clients.length}</BoldText> clientes encontrados:
        </CenteredInfoText>
        <CenteredPaginationRow>
          <PaginationText>Clientes por página:</PaginationText>
          <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)} style={styles.dropdownButton}>
            <Text>{limit}</Text>
            <Icon name="arrow-drop-down" size={20} color="#000" />
          </TouchableOpacity>
        </CenteredPaginationRow>
      </InfoContainer>

      {isDropdownOpen && (
        <DropdownContainer>
          {options.map((option) => (
            <DropdownItem key={option} onPress={() => handleLimitSelect(option)}>
              <DropdownText>{option}</DropdownText>
            </DropdownItem>
          ))}
        </DropdownContainer>
      )}

      

      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClientCard>
            <CenteredClientName>{item.name}</CenteredClientName>
            <CenteredClientInfo>Salário: R$ {item.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CenteredClientInfo>
            <CenteredClientInfo>Empresa: R$ {item.companyValuation.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CenteredClientInfo>
            <ActionRow>
              <TouchableOpacity  onPress={() => handleAddClient(item)}>
                <Icon name="add" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Icon name="edit" size={24} color="#ff7a00" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteClient(item)}>
                <Icon name="delete" size={24} color="#ff0000" />
              </TouchableOpacity>
            </ActionRow>
          </ClientCard>
        )}
        ListEmptyComponent={() => <CenteredInfoText>Nenhum cliente encontrado.</CenteredInfoText>}
      />

      <CreateButton onPress={() => setIsCreateModalOpen(true)}>
        <CreateButtonText>Criar cliente</CreateButtonText>
      </CreateButton>
      <Modal visible={showAddConfirmation} transparent animationType="fade">
        <ModalOverlay>
          <ModalContent>
            <ModalText>{addedClientName} foi adicionado aos clientes selecionados!</ModalText>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      <Modal visible={isCreateModalOpen} transparent animationType="slide">
        <ModalOverlay>
          <ModalContent>
            <CloseButton onPress={() => setIsCreateModalOpen(false)}>
              <Icon name="close" size={24} color="#fff" />
            </CloseButton>
            <ModalTitle>{isEditMode ? 'Editar cliente' : 'Criar cliente'}</ModalTitle>
            <Label>Nome</Label>
            <ModalInput
              placeholder="Nome"
              value={newClient.name}
              onChangeText={(text) => setNewClient({ ...newClient, name: text })}
            />
            <Label>Salário</Label>
            <ModalInput
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={formatCurrencyInput(salaryInputValue)}
              onChangeText={(text) => handleCurrencyInputChange(text, 'salary')}
            />
            <Label>Valor da Empresa</Label>
            <ModalInput
              placeholder="R$ 0,00"
              keyboardType="numeric"
              value={formatCurrencyInput(valuationInputValue)}
              onChangeText={(text) => handleCurrencyInputChange(text, 'companyValuation')}
            />
            <ModalButton onPress={handleSaveClient}>
              <ModalButtonText>{isEditMode ? 'Salvar alterações' : 'Criar cliente'}</ModalButtonText>
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Modal visible={isDeleteModalVisible} transparent animationType="fade">
        <ModalOverlay>
          <DeleteModalContainer>
            <DeleteModalText>Excluir cliente:</DeleteModalText>
            {selectedClient && (
              <DeleteModalSubText>
                Tem certeza que deseja excluir o cliente {selectedClient.name}?
              </DeleteModalSubText>
            )}
            <DeleteButton onPress={confirmDeleteClient}>
              <DeleteButtonText>Excluir cliente</DeleteButtonText>
            </DeleteButton>
            <CancelButton onPress={() => setIsDeleteModalVisible(false)}>
              <CancelButtonText>Cancelar</CancelButtonText>
            </CancelButton>
          </DeleteModalContainer>
        </ModalOverlay>
      </Modal>


      <PaginationContainer>{renderPagination()}</PaginationContainer>

      {isMenuOpen && <Overlay onPress={toggleMenu} />}
      <AnimatedDrawer style={{ transform: [{ translateX: slideAnim }] }}>
        <MenuScreen />
      </AnimatedDrawer>
    </Container>
  );
};

const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #ff7a00;
  padding: 15px 25px;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
`;

const StyledButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const ModalText = styled.Text`
  font-size: 16px;
  color: #333;
`; 

const ClearButton = styled.TouchableOpacity`
  border: 1px solid #ff7a00;
  padding: 15px;
  align-items: center;
  border-radius: 8px;
  margin: 20px 0;
`;

const ClearButtonText = styled.Text`
  color: #ff7a00;
  font-weight: bold;
  font-size: 16px;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;


const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: #4b4b4b;
  padding: 20px;
  border-radius: 10px;
  width: 85%;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 15px;
`;

const Label = styled.Text`
  align-self: flex-start;
  color: #fff;
  font-size: 14px;
  margin-bottom: 5px;
`;

const ModalInput = styled.TextInput`
  background-color: #333;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
  color: #fff;
`;
const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;
const ModalButton = styled.TouchableOpacity`
  background-color: #ff7a00;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  width: 100%;
`;

const ModalButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const DeleteModalContainer = styled.View`
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const DeleteModalText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
`;



const DeleteModalSubText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
`;

const DeleteButton = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const DeleteButtonText = styled.Text`
  color: #007aff;
  font-size: 18px;
`;

const CancelButton = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const CancelButtonText = styled.Text`
  color: #007aff;
  font-size: 18px;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const Logo = styled.Image`
  width: 120px;
  height: 40px;
  resize-mode: contain;
`;

const Username = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #333;
`;

const InfoContainer = styled.View`
  padding: 20px;
  background-color: #f5f5f5;
  align-items: center;
`;

const CenteredInfoText = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
`;

const BoldText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const CenteredPaginationRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PaginationText = styled.Text`
  font-size: 16px;
  margin-right: 5px;
`;

const ClientCard = styled.View`
  background-color: #fff;
  padding: 20px;
  margin: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const CenteredClientName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-bottom: 5px;
`;

const CenteredClientInfo = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 5px;
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 10px;
`;

const CreateButton = styled.TouchableOpacity`
  border: 1px solid #ff7a00;
  padding: 15px;
  align-items: center;
  border-radius: 8px;
  margin: 10px 20px;
`;

const CreateButtonText = styled.Text`
  color: #ff7a00;
  font-weight: bold;
  font-size: 16px;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PageNumber = styled.Text<{ isActive?: boolean }>`
  font-size: 16px;
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  background-color: ${({ isActive }) => (isActive ? '#ff7a00' : 'transparent')};
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 5px;
`;

const Overlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const AnimatedDrawer = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background-color: #ffffff;
  elevation: 5;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;


const DropdownContainer = styled.View`
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  width: 100px;
`;

const DropdownItem = styled.TouchableOpacity`
  padding: 10px;
`;

const DropdownText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default ClientsScreen;
