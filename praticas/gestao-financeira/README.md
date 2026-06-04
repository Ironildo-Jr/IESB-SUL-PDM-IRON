# Gestão Financeira — Frontend (Expo / React Native)

Resumo
- Aplicativo móvel feito com Expo + React Native e `expo-router`.
- Usa `AsyncStorage` para cache local e consome a API em `../gestao-financeira-api`.

Principais tecnologias
- Expo (React Native)
- React 19
- expo-router, @react-native-async-storage/async-storage
- @react-native-picker/picker

Pré-requisitos
- Node.js (recomendado >= 18)
- npm ou yarn
- Expo CLI (opcional): `npm install -g expo-cli` ou use `npx expo` diretamente
- Emulador Android / Xcode (opcional) ou dispositivo físico com o app Expo Go

Instalação
1. Entrar na pasta do frontend:

```
cd praticas/gestao-financeira
```
2. Instalar dependências:

```
npm install
```

Como executar
- Iniciar o Metro/Expo:

```
npm run start
# ou
npx expo start
```

- Para abrir no emulador:

```
npm run android
npm run ios
```

Conectar ao backend (dicas)
- O frontend usa a constante `BASE_URL` definida em `praticas/gestao-financeira/services/api.js` — altere somente esse valor para apontar para o backend quando testar em dispositivos físicos, por exemplo `http://<SEU-PC-IP>:3000`.
- Alternativas: rodar `npx localtunnel --port 3000 --subdomain <nome>` ou `ngrok` e então atualizar `BASE_URL` no arquivo `services/api.js` com a URL pública.
- Backend padrão: `praticas/gestao-financeira-api` (porta 3000).

API consumida
- Endpoints principais (backend):
  - `GET /categories` — lista categorias
  - `POST /categories` — cria categoria
  - `PUT /categories/:id` — atualiza categoria
  - `DELETE /categories/:id` — remove categoria
  - `GET /transactions` — lista transações
  - `POST /transactions` — cria transação
  - `PUT /transactions/:id` — atualiza transação
  - `DELETE /transactions/:id` — remove transação

Observações
- Ao enviar/atualizar transações, garanta que o payload contenha `description` (string, não vazio), `amount` (número), `date` (YYYY-MM-DD) e `categoryId` (número).
- Se encontrar problemas de rede no dispositivo, verifique o IP do PC, regras de firewall e as alternativas de túnel.
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
