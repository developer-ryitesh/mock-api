import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { IEmailOptions, IHbsOptions } from "../types";
import MAIL from "../config";

async function SendEmail({ to, cc, bcc, subject, from, template }: IEmailOptions): Promise<SentMessageInfo> {
    const transporter: Transporter = nodemailer.createTransport({
        host: MAIL.HOST,
        port: MAIL.PORT,
        service: MAIL.SERVICE,
        auth: {
            user: from || MAIL.USER,
            pass: MAIL.PASS,
        },
    });
    const templatesPath = path.resolve("./src/libs/mail/templates/");

    const hbsOptions: IHbsOptions = {
        viewEngine: {
            // extName: ".hbs",
            partialsDir: templatesPath,
            layoutsDir: templatesPath,
            defaultLayout: false,
        },
        viewPath: templatesPath,
        extName: ".hbs",
    };
    transporter.use("compile", hbs(hbsOptions));

    // Mail options
    const mailOptions: SendMailOptions = {
        from: from || process.env.SMPT_MAIL,
        ...(to && { to }),
        ...(cc && { cc }),
        ...(bcc && { bcc }),
        ...(subject && { subject }),
        ...(template.context && template.name ? {
            template: template.name,
            context: template.context
        } : {
            html: template.inline
        })
    };
    // Send email
    const info = await transporter.sendMail(mailOptions);
    return info;
}

export { SendEmail };