import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const app = createApp(App);

app.provide(DefaultApolloClient, apolloClient);

app.mount('#app');
