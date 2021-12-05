const fetchToken =(path,data,method = 'GET')=>{
    const url = `http://localhost:4000/api/${path}`;
    if(method === 'GET'){
        return fetch(url);
    }else {
        return fetch(url,{
            method,
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        });
    }
};

const fetchWithToken =(path,data,method = 'GET')=>{
    const url = `http://localhost:4000/api/${path}`;
    const token = localStorage.getItem('token') || '';
    if(method === 'GET'){
        return fetch(url,{
            method,
            headers:{
                'x-token': token
            }
        });
    }else {
        return fetch(url,{
            method,
            headers:{
                'Content-Type': 'application/json',
                'x-token': token
            },
            body : JSON.stringify(data)
        });
    }
};

export {
    fetchToken,
    fetchWithToken
}