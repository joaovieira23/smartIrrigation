import React from 'react';
import { View } from 'react-native';
import useTheme from '../../hooks/useTheme';

interface Props {
  children: View['props']['children'];
  forceContrast?: boolean;
}

function Screen(props: Props) {
  const {
    cores: { background, surface },
  } = useTheme();

  const backgroundColor = !props.forceContrast ? background : surface;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      {props.children}
    </View>
  );
}

export default Screen;
