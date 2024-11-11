import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import React from 'react';

interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
}

interface SelectedClientsScreenProps {
  selectedClients: Client[];
  onRemoveClient: (clientId: number) => void;
  onClearClients: () => void;
  onClose: () => void;
}

const SelectedClientsScreen: React.FC<SelectedClientsScreenProps> = ({
  selectedClients,
  onRemoveClient,
  onClearClients,
  onClose,
}) => {
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Container>
      <Header>
        <Title>Clientes selecionados:</Title>
        <TouchableOpacity onPress={onClose}>
          <BackText>Voltar</BackText>
        </TouchableOpacity>
      </Header>

      <FlatList
        data={selectedClients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClientCard>
            <ClientInfoContainer>
              <ClientName>{item.name}</ClientName>
              <ClientInfo>Salário: {formatCurrency(item.salary)}</ClientInfo>
              <ClientInfo>Empresa: {formatCurrency(item.companyValuation)}</ClientInfo>
            </ClientInfoContainer>
            <RemoveButton onPress={() => onRemoveClient(item.id)}>
              <RemoveIconText>-</RemoveIconText>
            </RemoveButton>
          </ClientCard>
        )}
        ListEmptyComponent={() => <EmptyText>Nenhum cliente selecionado.</EmptyText>}
      />
      <ClearButton onPress={onClearClients}>
        <ClearButtonText>Limpar clientes selecionados</ClearButtonText>
      </ClearButton>
    </Container>
  );
};

export default SelectedClientsScreen;

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 10px;
`;

const Header = styled.View`
  padding: 20px 10px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-color: #ddd;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const BackText = styled.Text`
  font-size: 16px;
  color: #ff7a00;
`;

const ClientCard = styled.View`
  background-color: #f9f9f9;
  padding: 20px;
  margin-vertical: 8px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 2;
`;

const ClientInfoContainer = styled.View`
  flex: 1;
`;

const ClientName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ClientInfo = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 2px;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const RemoveIconText = styled.Text`
  color: #ff0000;
  font-size: 24px;
  font-weight: bold;
`;

const ClearButton = styled.TouchableOpacity`
  background-color: #ffffff;
  border: 1px solid #ff7a00;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;

const ClearButtonText = styled.Text`
  color: #ff7a00;
  font-weight: bold;
  font-size: 16px;
`;

const EmptyText = styled.Text`
  color: #999;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;
