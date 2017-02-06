var stores = ['negociacoes'];
var version = 2;
var dbName = 'aluraframe';

class ConnectionFactory {

	constructor() {

		throw new Error("ConnectionFactory não pode ser instanciada");
	}
	
	static getConnection() {

		return new Promise((resolve, reject) => {

			let openRequest = window.indexedDB.open(dbName,version);

			openRequest.onupgradeneeded = e => {

				ConnectionFactory._createStores(e.target.result);
						
			};

			openRequest.onsuccess = e => {	

				resolve(e.target.result);
			};

			openRequest.error = e => {	

				// logamos o objeto error
				console.log(e.target.error);

				// na rejeição da promise enviamos apenas o nome do erro
				reject(e.target.result.name);
			};

		});
	}

	static _createStores(connection) {

		stores.forEach(store => {

			if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
			connection.createObjectStore(store, { autoIncrement: true });
		});

	}
}