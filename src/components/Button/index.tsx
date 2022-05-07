import React from 'react';
import { ActivityIndicator, Text, View, ViewStyle, TextStyle } from 'react-native';
import Touchable from '../Touchable';
import useTheme from '../../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadialGradient from 'react-native-radial-gradient';

interface Props {
  loading?: boolean;
  label?: string;
  onPress: () => any;
  labelColor?: string;
  accessibilityLabel?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  outlined?: boolean;
  disable?: boolean;
  icon?: string;
  negativo?: boolean;
  neutro?: boolean;
  excluir?: boolean;
  fontSize?: number;
  sizeIcon?: number;
  width?: number;
  height?: number
  border?: boolean;
}

export default function TextButton(props: Props) {
  const {
    cores: {
      primaria, secundaria, surface, indicadorNegativo, destaquePrimaria
    },
  } = useTheme();

  const { loading, label, onPress, fontSize = 16, labelColor = surface, icon, sizeIcon = 20, disable = false, width = 302, height = 48 } = props;
  const Container = disable ? View : Touchable;

	return (
		<Container accessibilityLabel={props.accessibilityLabel} onPress={() => !loading && onPress()}>
			<View
				//@ts-ignore
				style={{
					borderRadius: 25,
					overflow: 'hidden',
					borderColor: props.neutro
						? 'rgba(145, 145, 159, 1)'
						: props.negativo
						? indicadorNegativo
						: props.border && primaria,
					borderWidth: props.border && 1,
				}}
			>
				<RadialGradient
					style={[
						{
							width: width,
							height: height,
							justifyContent: 'center',
							alignItems: 'center',

							paddingVertical: 12,
							flexDirection: 'row',
						},
						props.containerStyle,
					]}
					colors={
						props.excluir
							? [indicadorNegativo, indicadorNegativo]
							: props.outlined
							? [surface, surface]
							: !disable
							? [primaria, secundaria]
							: ['#DDDDDD', '#939E8D']
					}
					center={[100, 100]}
					stops={[0.1, 0.4, 0.3, 0.75]}
					radius={210}
				>
					<View pointerEvents="auto">
						<>
							{Boolean(icon) && (
								<View style={{ marginRight: label ? 10 : 0 }}>
									{/*
                // @ts-ignore */}
									<Icon name={icon} size={sizeIcon} color={labelColor} />
								</View>
							)}

							{!loading ? (
								<Text
									style={[
										{
											fontFamily: 'Montserrat-Bold',
											letterSpacing: 1,
											fontSize: fontSize,
											color: props.neutro
												? 'rgba(145, 145, 159, 1)'
												: !props.outlined
												? labelColor
												: props.negativo
												? indicadorNegativo
												: destaquePrimaria,
											fontWeight: '500',
											textAlign: 'center',
										},
										props.labelStyle,
									]}
								>
									{label?.toUpperCase()}
								</Text>
							) : (
								<ActivityIndicator style={{ marginLeft: 7.5 }} size="small" color={labelColor} />
							)}
						</>
					</View>
				</RadialGradient>
			</View>
		</Container>
	);
}
