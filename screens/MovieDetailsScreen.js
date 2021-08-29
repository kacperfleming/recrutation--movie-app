import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {LinearProgress} from 'react-native-elements';

import MovieCard from '../components/MovieCard';

export default function MovieDetailsScreen({route}) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(async () => {
    if (isLoading | error) return;

    setIsLoading(true);

    try {
      const {
        title,
        overview,
        poster_path: posterPath,
        popularity,
        vote_count: voteCount,
        genres,
        production_countries: productionCountries,
      } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${route.params.movieId}?language=en&api_key=908c8ee616534e11d253631e8399c456`,
        )
      ).json();

      setData({
        title,
        overview,
        posterPath,
        popularity,
        voteCount,
        genres,
        productionCountries,
      });
    } catch (err) {
      console.log(err);
      setError(err);
    }

    setIsLoading(false);
  }, []);

  console.log(data);

  return (
    <ScrollView>
      {isLoading && <LinearProgress color="primary" />}
      {data && !isLoading && !error && (
        <MovieCard
          title={data.title}
          posterPath={data.posterPath}
          overview={data.overview}
          details={[
            {name: 'popularity', value: data.popularity},
            {name: 'vote count', value: data.voteCount},
            {
              name: 'genres',
              value: data.genres.map(genre => genre.name).join(', '),
            },
            {
              name: 'production countries',
              value: data.productionCountries
                .map(country => country.name)
                .join(', '),
            },
          ]}
        />
      )}
    </ScrollView>
  );
}
