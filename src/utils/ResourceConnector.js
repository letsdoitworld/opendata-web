export function getJSOnFromApiAsync(apiURl) {
    return fetch(apiURl)
        .then(response => response.json())
        .then(responseJson => responseJson)
        .catch((error) => {
            console.error(error);
        });
}
export default {getJSOnFromApiAsync};
