import React from 'react';
import { View } from 'react-native';
import Shimmer from 'react-native-shimmer';
import useTheme from '../hooks/useTheme';

interface Props {
  height: number;
  width: number;
  borderRadius?: number;
}

const ShimmerView = React.memo((props: { color: string; width: number; height: number; borderRadius?: number }) => {
  const { width, height, color, borderRadius } = props;

  return (
    <View
      style={{
        width,
        height,
      }}
    >
      <Shimmer duration={1000}>
        <View
          style={{
            backgroundColor: '#FCFDFF',
            width,
            height,
            borderRadius,
          }}
        />
      </Shimmer>
    </View>
  );
});

function Placeholder(props: Props) {
  const { width, height, borderRadius } = props;
  const theme = useTheme();

  return <ShimmerView borderRadius={borderRadius} width={width} height={height} color={theme.cores.placeholder} />;
}

export default Placeholder;
