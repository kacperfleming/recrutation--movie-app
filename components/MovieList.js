import React from 'react';
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import MovieCard from './MovieCard';

export default function MovieList({data, navigation}) {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.movie}
          onPress={() =>
            navigation.navigate('Movie Details', {
              movieId: item.id,
              title: item.title,
            })
          }>
          <MovieCard
            title={item.title}
            posterPath={item.poster_path}
            details={[
              {name: 'popularity', value: item.popularity},
              {name: 'vote count', value: item.vote_count},
            ]}
          />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  movie: {
    marginBottom: 10,
    backgroundColor: 'red',
  },
});
