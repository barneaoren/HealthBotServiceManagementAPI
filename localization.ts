require('dotenv').config();
import {token, urlPrefix} from "./token";

const axios = require('axios');

async function read(): Promise<void> {
    try {
        const localization = await axios.get(`${urlPrefix()}/localization`, {headers: {'Authorization': `Bearer ${token()}`}});
        console.table(localization.data)
    } catch (error) {
        console.error(error);
    }
}

async function write(): Promise<void> {
    try {
        const data = {
            custom: [
                {"String ID": "string_1", "en-us":"OK yey"},
                {"String ID": "string_2", "en-us":"baby"},
                {"String ID": "string_2", "ar-eg":"walid"},
                {"String ID": "string_2", "es-es":"spanilioto"}
            ],
            system: [
                {"String ID": "string_3", "en-us":"OK!!!"},
            ]            
        }
        await axios({
            method: "POST",
            url: `${urlPrefix()}/localization` ,
            headers: {Authorization: `Bearer ${token()}`},
            data
        });
        console.table(data);
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    await write();
    await read();
})();
