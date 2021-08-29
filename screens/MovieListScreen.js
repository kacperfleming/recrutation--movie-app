import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SearchBar, LinearProgress} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

import {movieActions} from '../store/movie-slice';
import MovieList from '../components/MovieList';
import ErrorView from '../components/ErrorView';
import PageControlPanel from '../components/PageControlPanel';

export default function MovieListScreen({navigation}) {
  const page = useSelector(state => state.movies.page);
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [searchVal, setSearchVal] = useState();

  useEffect(() => {
    if (!searchVal) return;

    let timeout;

    timeout = setTimeout(async () => {
      setIsLoading(true);

      try {
        const {results} = await (
          await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchVal}&page=${page}&language=pl-PL&api_key=908c8ee616534e11d253631e8399c456`,
          )
        ).json();
        console.log(results);

        setData(results);
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchVal, page]);

  return (
    <View style={styles.root}>
      <SearchBar
        inputContainerStyle={styles.searchBar}
        value={searchVal}
        onChangeText={val => setSearchVal(val)}
        placeholder="Let's find a movie..."
        showLoading={isLoading}
      />
      {isLoading && <LinearProgress />}
      {error && <ErrorView onCancel={() => setError(null)} />}
      {data && !isLoading && !error && (
        <>
          <MovieList data={data} navigation={navigation} />
          <PageControlPanel
            page={page}
            onIncrement={() => dispatch(movieActions.incrementPage())}
            onDecrement={() => {
              if (page < 2) return;
              dispatch(movieActions.decrementPage());
            }}
          />
        </>
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
});
