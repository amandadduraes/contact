// services/clientService.ts

import axios from 'axios';
import { CreateClient } from '@/interfaces/types';

const API_BASE_URL = 'https://boasorte.teddybackoffice.com.br';

export const fetchClients = async (page: number, limit: number) => {
  try {
    console.log('Fazendo requisição para buscar clientes:', { page, limit });
    
    const response = await axios.get(`${API_BASE_URL}/users`, {
      params: { page, limit },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    
    console.log('Resposta recebida:', response.data); // Loga a resposta para depuração
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export const deleteClient = async (clientId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${clientId}`, {
      headers: { 'Accept': '*/*' },
    });
    if (response.status === 200 && response.data === 'User removed') {
      return true;
    } else {
      throw new Error('Erro ao excluir cliente');
    }
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
};

export const createClientService = async (clientData: CreateClient) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, {
      name: clientData.name,
      salary: clientData.salary,  // Deve estar em formato decimal com ponto
      companyValuation: clientData.companyValuation,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};

export const updateClientService = async (clientId: number, client: CreateClient) => {
  const response = await axios.patch(`${API_BASE_URL}/users/${clientId}`, client);
  return response.data;
};