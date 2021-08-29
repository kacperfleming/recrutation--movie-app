import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

const MovieCard = props => {
  return (
    <Card containerStyle={styles.root}>
      <Card.Title style={styles.title}>{props.title}</Card.Title>
      <Card.Divider />
      <Card.Image
        containerStyle={styles.poster}
        source={{uri: `https://image.tmdb.org/t/p/w500${props.posterPath}`}}
      />
      <View style={styles.details}>
        {props.details &&
          props.details.map(detail => (
            <Text key={detail.name} style={styles.detail}>
              <Text style={styles.detailName}>{detail.name}: </Text>
              {detail.value}
            </Text>
          ))}
      </View>
      {props.description && <Text>{props.description}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 24,
  },
  poster: {
    width: '100%',
    marginHorizontal: 0,
  },
  details: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  detail: {
    fontSize: 18,
  },
  detailName: {
    fontWeight: '600',
  },
});

export default memo(MovieCard);
