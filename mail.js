const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//ES6
module.exports = mail = async (
  msg = {
    to: "",
    from: process.env.FROM || "",
    subject: "",
    text: "",
    html: "",
  }
) => {
  const { text } = msg;
  if (text) delete msg.html;
  else delete msg.text;
  let success = true;
  let error = null;
  try {
    await sgMail.send(msg);
  } catch (err) {
    error = err;
    success = false;
  }
  return {
    success,
    error,
  };
};
