import React, { useState } from 'react';
import ClientsScreen from './app/clients';
import SelectedClientsScreen from './app/selectedClients';
import { Client } from './interfaces/types'; // Importe o Client do arquivo de tipos

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'clients' | 'selectedClients'>('clients');
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);

  const openSelectedClientsScreen = () => {
    setCurrentScreen('selectedClients');
  };

  const openClientsScreen = () => {
    setCurrentScreen('clients');
  };

  const navigateToClients = () => {
    setCurrentScreen('clients');
  };

  const handleRemoveClient = (clientId: number) => {
    setSelectedClients(prevClients => prevClients.filter(client => client.id !== clientId));
  };

  const handleClearClients = () => {
    setSelectedClients([]);
  };

  return (
    <>
      {currentScreen === 'clients' ? (
        <ClientsScreen 
          onOpenSelectedClients={openSelectedClientsScreen} 
          selectedClients={selectedClients} 
          setSelectedClients={setSelectedClients}
        />
      ) : (
        <SelectedClientsScreen
          selectedClients={selectedClients}
          onRemoveClient={handleRemoveClient}
          onClearClients={handleClearClients}
          onClose={openClientsScreen}
          navigateToClients={navigateToClients}
        />
      )}
    </>
  );
};

export default App;
