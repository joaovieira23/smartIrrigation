import * as React from 'react';
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

type Props = {
  disabled?: boolean;
} & (TouchableNativeFeedback['props'] | TouchableOpacity['props']);

function Touchable(props: Props) {
  if (props.disabled) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  if (Platform.OS === 'android') {
    return <TouchableNativeFeedback {...props} />;
  }

  return <TouchableOpacity {...props} activeOpacity={0.3} />;
}

export default Touchable;
