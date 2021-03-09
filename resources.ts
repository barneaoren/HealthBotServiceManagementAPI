require('dotenv').config();
import {token, urlPrefix} from "./token";

const FormData = require('form-data');

const path = require("path");
const fs = require('fs');

const axios = require('axios');

async function read(): Promise<void> {
    try {
        const files = await axios.get(`${urlPrefix()}/resources`, {headers: {'Authorization': `Bearer ${token()}`}});
        console.table(files.data.entries)
    } catch (error) {
        console.error(error);
    }
}

async function upload(): Promise<void> {
    try {
        const form = new FormData();
        const files = fs.readdirSync(path.join(__dirname, "samples"));
        for (const file of files) {
            form.append(file, fs.createReadStream(path.join(__dirname, "samples", file)));
        }
        const request_config = {
            headers: {
                'Authorization': `Bearer ${token()}`,
                ...form.getHeaders()
            }
        };
        console.log("uploading files");
        await axios.post(`${urlPrefix()}/resources`, form, request_config);
        console.log("uploading files completed !")
    } catch (error) {
        console.error(error);
    }
}

async function remove(): Promise<void> {
    try {
        const files = fs.readdirSync(path.join(__dirname, "samples"));
        console.log(`removing ${files}`);
        await axios.delete(`${urlPrefix()}/resources`, {headers: {'Authorization': `Bearer ${token()}`}, params: {name: files}});
        console.log(`removing ${files} completed`);
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    await upload();
    await read();
    await remove();
})();
