require('dotenv').config();
import {token, urlPrefix} from "./token";

const path = require("path");
const fs = require('fs');
import * as moment from "moment";

const axios = require('axios');
const tenantName = process.env.tenantName;

async function backup(): Promise<string> {
    const fileName: string = path.join(__dirname, `backup-${tenantName}-${moment().unix()}.hbs`);
    const response = await axios.get(`${urlPrefix()}/backup`, {headers: {Authorization: `Bearer ${token()}`}});
    fs.writeFileSync(fileName, response.data);
    return fileName;
}

async function restore(fileName: string): Promise<void> {
    const hbs = fs.readFileSync(fileName).toString();
    try {
        await axios({
            method: "POST",
            url: `${urlPrefix()}/backup` ,
            headers: {Authorization: `Bearer ${token()}`},
            data: {hbs}
        });
    } catch (e) {
        console.log(e)
    } finally {
        fs.unlinkSync(fileName);
    }
}

backup().then(filename => restore(filename));
