# Projeto de Listagem e Seleção de Clientes

Este é um projeto de aplicação mobile que permite listar clientes, selecionar clientes específicos, exibir detalhes e realizar ações como editar, excluir e limpar a lista de clientes selecionados. A aplicação foi desenvolvida em React Native e utiliza componentes estilizados com Styled Components.

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado (versão recomendada: >= 12.x).
- **Expo CLI**: `npm install -g expo-cli`
- **Dependências de desenvolvimento**: Confira o arquivo `package.json` para garantir a instalação de todas as dependências listadas.

## Instalação

1. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. Instale as dependências do projeto:
   ```bash
   npm install

## Configuração

Para persistir dados como o nome do usuário, o projeto utiliza o `AsyncStorage`. Certifique-se de que ele está configurado corretamente para o ambiente de desenvolvimento.

Se estiver utilizando uma API externa para buscar, atualizar ou excluir clientes, configure a URL e as credenciais no arquivo de serviços `clientService.ts` (ou em um arquivo de configuração separado, se preferir).

## Execução

Para rodar a aplicação:

1. Execute o comando:
   ```bash
   expo start

2. Utilize o aplicativo Expo Go em seu dispositivo ou emulador para visualizar a aplicação escaneando o QR code fornecido no terminal ou na janela de execução do Expo.
Copiar código


## Funcionalidades

### 1. Listagem de Clientes
A tela inicial exibe uma lista de clientes, mostrando o nome, salário e avaliação da empresa.

### 2. Seleção de Clientes
Os clientes podem ser adicionados a uma lista de "Clientes Selecionados" ao clicar no ícone de adição (+).

### 3. Modal de Clientes Selecionados
Exibe uma lista de clientes selecionados, com opções para remover clientes individuais ou limpar todos os clientes da lista.

### 4. Edição e Exclusão de Clientes
Cada cliente pode ser editado ou excluído diretamente na listagem.

### 5. Salvar Preferências
O nome do usuário é salvo utilizando `AsyncStorage` e exibido no cabeçalho da aplicação.

### 6. Controle de Paginação
Permite controlar o número de clientes exibidos por página com opções predefinidas.

## Estrutura do Projeto

Abaixo está uma visão geral da estrutura do projeto para facilitar a navegação.

.
├── **assets/**                     # Recursos como imagens e ícones
├── **components/**                 # Componentes reutilizáveis e específicos do projeto
│   ├── **ClientsScreen.tsx**       # Tela principal de listagem de clientes
│   ├── **SelectedClientsScreen.tsx** # Tela de clientes selecionados
│   └── **menu.tsx**                # Componente de menu lateral
├── **services/**                   # Serviços de API
│   └── **clientService.ts**        # Funções para buscar, criar, atualizar e deletar clientes
├── **interfaces/**                 # Definição de tipos e interfaces
│   └── **types.ts**                # Tipos de dados utilizados no projeto
├── **App.tsx**                     # Arquivo principal do aplicativo
└── **README.md**                   # Documentação do projeto

## Tecnologias Utilizadas

- **React Native**: Framework principal para desenvolvimento mobile.
- **Expo**: Ferramenta para desenvolvimento e build de aplicativos React Native.
- **Styled Components**: Biblioteca para estilização dos componentes.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.
- **AsyncStorage**: Armazenamento local para persistir dados no dispositivo.
 

Projeto desenvolvido por [Amanda Durães](https://www.linkedin.com/in/amanda-dias-duraes-04b15a119/). 

Muito obrigada :)
