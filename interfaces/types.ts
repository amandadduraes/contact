export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClient {
  name: string;
  salary: number;
  companyValuation: number;
}

export type ParamList = {
  ClientsScreen: undefined;
  SelectedClients: {
    selectedClients: Client[];
    onRemoveClient: (clientId: number) => void;
    onClearClients: () => void;
  };
};