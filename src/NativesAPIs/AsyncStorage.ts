import AsyncStorage from '@react-native-async-storage/async-storage';

export type ChavesAsyncStorage = 'onboarding' | string;

function getItem(chave: ChavesAsyncStorage) {
	return AsyncStorage.getItem(chave);
}

function setItem(chave: ChavesAsyncStorage, valor: string) {
	return AsyncStorage.setItem(chave, valor);
}

function removeItem(chave: ChavesAsyncStorage) {
	return AsyncStorage.removeItem(chave);
}

function multiGet(chaves: ChavesAsyncStorage[]) {
	return AsyncStorage.multiGet(chaves);
}

function multiSet(paresChaveValor: [ChavesAsyncStorage, string][]) {
	return AsyncStorage.multiSet(paresChaveValor);
}

function multiRemove(chaves: ChavesAsyncStorage[]) {
	return AsyncStorage.multiRemove(chaves);
}

function clear() {
	return AsyncStorage.clear();
}

function getAllKeys() {
	return AsyncStorage.getAllKeys();
}

export default {
	getItem,
	getAllKeys,
	setItem,
	removeItem,
	multiGet,
	multiSet,
	multiRemove,
	clear,
};
