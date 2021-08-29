import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';

export default function ErrorView(props) {
  return (
    <View style={styles.root}>
      <Text h4 h4Style={styles.message}>
        {props.message || 'Something went wrong. Please, try again.'}
      </Text>
      <Button
        title="Okay"
        buttonStyle={styles.button}
        raised
        onPress={props.onCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 16,
  },
});
