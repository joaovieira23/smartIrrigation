export function formataMoeda(
	valor: number,
	mostrarSinalVariacao = false,
	casasDecimais = 2,
	moedaPrefixo = 'R$',
): string {
	if (!valor || valor === undefined || valor === null) {
		valor = 0;
	}

	if (!valor && valor !== 0) {
		return '';
	}

	const valorAbsoluto = Math.abs(valor);

	const stringSeparada = valorAbsoluto.toFixed(casasDecimais).toString().split('.');

	stringSeparada[0] = stringSeparada[0]
		.split('')
		.reverse()
		.reduce((novoArray: string[], item, index, array) => {
			if ((index + 1) % 3 === 0 && index !== array.length - 1) {
				return [...novoArray, item, '.'];
			}

			return [...novoArray, item];
		}, [])
		.reverse()
		.join('');

	if (casasDecimais === 0) {
		if (valor < 0) {
			return `- ${moedaPrefixo} ${stringSeparada[0]}`;
		} else if (mostrarSinalVariacao && valor > 0) {
			return `+ ${moedaPrefixo} ${stringSeparada[0]}`;
		}

		return `${moedaPrefixo} ${stringSeparada[0]}`;
	} else {
		if (valor < 0) {
			return `- ${moedaPrefixo} ${stringSeparada[0]},${stringSeparada[1]}`;
		} else if (mostrarSinalVariacao && valor > 0) {
			return `+ ${moedaPrefixo} ${stringSeparada[0]},${stringSeparada[1]}`;
		}

		return `${moedaPrefixo} ${stringSeparada[0]},${stringSeparada[1]}`;
	}
}

/**
 *
 * @param valor
 * @param variacao
 * @param casas
 *
 * @returns String que representa a porcentagem equivalente de um numero
 */
export function formataPorcentagem(
	valor: number,
	mostrarSinalVariacao = false,
	casas = 2,
	ajustarValoresZerados = false,
): string {
	if (!valor || valor === undefined || valor === null) {
		valor = 0;
	}

	const numero = valor.toFixed(casas);

	if (parseFloat(numero) === 0 && ajustarValoresZerados) {
		if (valor > 0) {
			return '< 0,01%';
		} else {
			return '> -0,01%';
		}
	} else if (parseFloat(numero) === 0) {
		return parseInt('0', 10).toFixed(casas).replace('.', ',') + '%';
	}

	let sinalVariacao = '';
	if (mostrarSinalVariacao) {
		sinalVariacao = valor > 0 ? '+ ' : '- ';
	} else {
		sinalVariacao = valor > 0 ? '' : '- ';
	}

	const [parteInteiraValor, parteDecimalValor] = numero.split('.');

	if (casas === 0) {
		// se o numero de casas for 0, temos que tirar a parte decimal q é undefined
		return `${sinalVariacao}${Math.abs(parseInt(parteInteiraValor, 10))
			.toLocaleString(['de-DE', 'en-US'])
			.replace(',', '.')}%`;
	}

	return `${sinalVariacao}${Math.abs(parseInt(parteInteiraValor, 10))
		.toLocaleString(['de-DE', 'en-US'])
		.replace(',', '.')},${parteDecimalValor}%`;
}
