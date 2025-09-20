import dotenv from "dotenv";
dotenv.config();

const MAIL = {
    HOST: process.env.SMPT_HOST,
    PORT: Number(process.env.SMPT_PORT),
    SERVICE: process.env.SMPT_SERVICE,
    USER: process.env.SMPT_MAIL, //simple mail protocol transfer
    PASS: process.env.SMPT_PASSWORD,
};

export default MAIL;