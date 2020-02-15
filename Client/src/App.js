import React from 'react';
import BookList from "./components/Books/BookList";
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient()


function App() {
  return (
    <ApolloProvider client={client}>
      <header className="Header">
        <h1>GraphQl Server</h1>
      </header>
      <BookList />
    </ApolloProvider>
  );
}

export default App;
