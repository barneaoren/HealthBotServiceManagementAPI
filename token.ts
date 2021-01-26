const secret = process.env.secret;
const jwt = require('jsonwebtoken');
import * as moment from "moment";
const tenantName = process.env.tenantName;

export function token(): string {
    const iat = moment().subtract(1, "minutes").unix();
    const token = jwt.sign({tenantName, iat}, secret);
    return token
}

export function urlPrefix(): string {
    return `${process.env.host}/api/account/${tenantName}`;
}