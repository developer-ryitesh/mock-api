import hbs from "nodemailer-express-handlebars";
type TemplateName = "welcome.mail" | "account-status.mail" |"forgot-password.mail";

interface IEmailOptions{
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject?: string;
    from?: string;
    template: { 
        name?: TemplateName; 
        context?: Record<string, any>;
        inline?: string;
    };
}

interface IHbsOptions extends hbs.NodemailerExpressHandlebarsOptions {}

export type { IEmailOptions , IHbsOptions }





