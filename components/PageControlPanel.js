import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';

export default function PageControlPanel(props) {
  return (
    <View style={styles.root}>
      <Icon
        size={30}
        type="ionicons"
        name="remove-circle-outline"
        onPress={props.onDecrement}
      />
      <Text h4>{props.page}</Text>
      <Icon
        size={30}
        type="ionicons"
        name="add-circle-outline"
        onPress={props.onIncrement}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
    paddingHorizontal: 60,
    borderTopWidth: 1,
  },
});
