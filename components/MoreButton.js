import React from 'react';
import {Icon} from 'react-native-elements';

export default function MoreButton(props) {
  return (
    <Icon type="ionicons" name="add-circle-outline" onPress={props.onPress} />
  );
}
