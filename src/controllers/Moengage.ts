import axios from 'axios';

function atualizaAtributoMoengage(userId: string, attributes: Record<string, number | boolean | string>) {
	return axios.post(
		'https://api-01.moengage.com/v1/customer/23N1CFNBO3SGF6N67UEY7B3X',
		{
			type: 'customer',
			customer_id: userId,
			attributes,
		},
		{
			auth: {
				username: '23N1CFNBO3SGF6N67UEY7B3X',
				password: 'l8VlgTPsl5mnwJieGd0@ICW6',
			},
		},
	);
}
