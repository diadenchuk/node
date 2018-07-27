export default function getBaseUrl(){
    return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : 'https://powerful-atoll-97347.herokuapp.com/';
}

function getQueryStringParameterByName(){
    return false;
}