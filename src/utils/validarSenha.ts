export default function validarSenha(senha: string) {
	const re = /^(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/;
	const re2 = /^(?=.*?[0-9])(?=.*?[a-z]).{8,}$/;
	return re.test(senha) || re2.test(senha);
}
