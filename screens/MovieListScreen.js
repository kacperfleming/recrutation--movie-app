import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {SearchBar, LinearProgress} from 'react-native-elements';

import MovieCard from '../components/MovieCard';

export default function MovieListScreen({navigation}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [searchVal, setSearchVal] = useState();

  useEffect(() => {
    if (!searchVal | isLoading) return;

    let timeout;

    timeout = setTimeout(async () => {
      setIsLoading(true);

      try {
        const {results} = await (
          await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchVal}&page=1&language=pl-PL&api_key=908c8ee616534e11d253631e8399c456`,
          )
        ).json();

        setData(results);
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchVal]);

  const searchHander = val => setSearchVal(val);

  return (
    <View style={styles.root}>
      <SearchBar
        inputContainerStyle={styles.searchBar}
        value={searchVal}
        onChangeText={searchHander}
        placeholder="Let's find a movie..."
        showLoading={isLoading}
      />
      {isLoading && <LinearProgress />}
      {data && !isLoading && !error && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  searchBar: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  movie: {
    marginBottom: 10,
    backgroundColor: 'red',
  },
});
