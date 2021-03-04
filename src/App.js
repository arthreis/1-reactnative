import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";

import Item from './components/Item';

import api from './services/api';

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleLikeRepository(id) {
    api.post(`repositories/${id}/like`).then(response => {
      const repoUpdated = repositories.map((r) => {
        if(r.id === id){
          return response.data;
        }else{
          return r;
        }
      })
      setRepositories(repoUpdated)
    })
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(r) => r.id}
          renderItem={
            ({item: r}) => (
              <Item
                repo={r}
                handleLike={handleLikeRepository}
              />
            )
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  }
});
