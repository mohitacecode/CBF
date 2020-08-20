import _ from "@lodash";

export const SendEmailTrayConfig = {
  icon: "contact_mail",
  nodeType: "SEND_EMAIL",
  primaryText: "Send Email",
  secondaryText: "Send Email to Specified Address",
  questionText:
    "email is sent to you on your registered mail id if not please check the spam folder also.",
  sendMailObj: { from_email: "autovistateam@gmail.com", to_email: "", subject: "", content: "" },
  portOpt: [
    { linkType: "in", name: `in-${_.getUID()}`, in: true },
    { linkType: "out", name: `out-${_.getUID()}`, in: false },
  ],
};
