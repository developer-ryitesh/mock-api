import nodemailer, { Transporter, SendMailOptions, SentMessageInfo } from "nodemailer";
import path from "path";
import fs from "fs";
import ejs from "ejs";
import { IEmailOptions } from "./types";

export default class Mail {
   private transporter: Transporter;

   constructor() {
      this.transporter = nodemailer.createTransport({
         host: process.env.SMPT_HOST,
         port: Number(process.env.SMPT_PORT),
         service: process.env.SMPT_SERVICE,
         auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
         },
      });
   }

   private async renderTemplate(template: string, data?: Record<string, any>): Promise<string> {
      const templatesPath = path.join(process.cwd(), "server", "libs", "mail", "templates");
      const filePath = path.join(templatesPath, `${template}.ejs`);

      if (!fs.existsSync(filePath)) {
         throw new Error(`Template file not found: ${filePath}`);
      }

      return await ejs.renderFile(filePath, data || {});
   }

   send = async (options: IEmailOptions): Promise<SentMessageInfo> => {
      let htmlContent = options.html;

      if (options.template) {
         htmlContent = await this.renderTemplate(options.template, options.data);
      }

      const mailOptions: SendMailOptions = {
         from: options.from || process.env.SMPT_MAIL,
         to: options.to,
         subject: options.subject,
         html: htmlContent,
         ...(options.text && { text: options.text }),
      };

      return await this.transporter.sendMail(mailOptions);
   };
}
