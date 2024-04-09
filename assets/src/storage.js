const STORAGE_TOKEN = 'A4FWT6VNANE57F3YJWY8RKAO2BLJ7XU20BKY7G0X';
const STORAGE_URL = ' https://remote-storage.developerakademie.org/item';

/**
 * The function calls the remote saved data with the key parameter.
 * 
 * @param {string} key 
 * @returns the value of the saved data with the key and token in json data structure {data, value, status}
 */
async function getItemFromRemoteStorage(key) {
    const URL = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return await fetch(URL).then(resp => resp.json());
}

/**
 * The function saves data with the pair key value on the remote server.
 * 
 * @param {string} key 
 * @param {JSON} value 
 * @returns a Promise
 */
async function setItemToRemoteStorage(key, value) {
    const payload = {key: key, value: value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)});
}

/**
 * This function calls all the users form server and returns them.
 * @returns JSON array
 */
async function loadUsersFromServer() {
    const response = await getItemFromRemoteStorage('users');
    let users = JSON.parse(response.data.value);
    return users;
  }


async function getUserFromServer(email) {
    let users = await loadUsersFromServer();
    let user = users.find(u => u.email == email);
    return user;
}

async function getTaskList(email) {
    let user = await getUserFromServer(email);
    return user.tasks;
}

async function getContactList(email) {
    let user = await getUserFromServer(email);
    return user.contacts;
}