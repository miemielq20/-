import axios from 'axios'

const http = axios.create({
    method:'get',
    baseURL: 'http://localhost:3000/book',
    timeout: 10000,
    headers: {
        "Content-Type":"application/json"
    }
})


export {http}