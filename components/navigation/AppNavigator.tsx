import { createStackNavigator } from '@react-navigation/stack';
import ClientsScreen from '@/app/clients'; 
import SelectedClients from '@/app/selectedClients'; 

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ClientsScreen">
      <Stack.Screen
        name="ClientsScreen"
        component={ClientsScreen}
        options={{ title: 'Clientes' }}
      />
      <Stack.Screen
        name="SelectedClients"
        component={SelectedClients}
        options={{ title: 'Clientes Selecionados' }}
      />
    </Stack.Navigator>
  );
}
