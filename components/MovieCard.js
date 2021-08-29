import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

const MovieCard = props => {
  let overview;
  if (props.overview) {
    overview = (
      <View style={styles.description}>
        <Card.Divider />
        <Text style={styles.detail}>{props.overview}</Text>
      </View>
    );
  }
  return (
    <Card containerStyle={styles.root}>
      <Card.Title style={styles.title}>{props.title}</Card.Title>
      <Card.Image
        containerStyle={styles.poster}
        style={styles.image}
        source={{uri: `https://image.tmdb.org/t/p/w400${props.posterPath}`}}
      />
      {props.details && props.details.length > 0 && (
        <View style={styles.details}>
          {props.details.map(detail => (
            <Text key={detail.name} style={styles.detail}>
              <Text style={styles.detailName}>{detail.name}: </Text>
              {detail.value}
            </Text>
          ))}
        </View>
      )}
      {overview && overview}
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 0,
    margin: 0,
  },
  title: {
    fontSize: 24,
  },
  poster: {
    width: '100%',
    height: 500,
    marginHorizontal: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  details: {
    paddingHorizontal: 6,
    paddingVertical: 9,
  },
  detail: {
    fontSize: 18,
  },
  detailName: {
    fontWeight: '600',
  },
  description: {
    paddingHorizontal: 6,
  },
});

export default memo(MovieCard);
