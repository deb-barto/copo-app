import axios from "axios";

const basicAuth = 'Basic ' + btoa('admin:admin123');

const api = axios.create({
    baseURL: 'https://copy-api-git-deploy-hanabananaas-projects.vercel.app/',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: basicAuth
    } 
});

export { api };