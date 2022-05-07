import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import Card from '../../components/Card';
import Text from '../../components/Text';
import StarRating from 'react-native-star-rating';
import useTheme from '../../hooks/useTheme';

export default function CardNota() {

  const { width } = Dimensions.get('window');
  const {
    cores: { secundaria },
  } = useTheme();

  const [stars, setStars] = useState(0);

  return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 15,
				width: '100%',
			}}
		>
			<Card
				style={{
					width: width * 0.94,
					height: 177,
					borderRadius: 5,
					justifyContent: 'center',
				}}
			>
				<Text h3 fonte="Poppins-Medium" style={{ textAlign: 'center', marginBottom: 16 }}>
					{'Como está sendo a sua \nexperiência usando o junt?'}
				</Text>
				<View style={{ width: '50%', alignSelf: 'center' }}>
					<StarRating
						containerStyle={{ padding: 0 }}
						disabled={false}
						maxStars={5}
						starSize={24}
						rating={stars}
						fullStarColor={secundaria}
						selectedStar={(rating) => setStars(rating)}
					/>
				</View>
				<Text fonte="Poppins-Medium" style={{ textAlign: 'center', marginTop: 24 }}>
					Nos avalie na Playstore
				</Text>
			</Card>
		</View>
	);
}