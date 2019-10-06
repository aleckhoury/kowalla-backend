const mailgun = require('mailgun-js');
// const template = require('../EmailTemplates/WelcomeEmail.ejs.html');
const DOMAIN = 'kowalla.co';
const api_key = 'e2a99e09d23ef862951659cff28d130a-898ca80e-4963c86f';
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

module.exports = {
  async sendWelcomeEmail(name, email) {
    const data = {
      from: 'Kowalla <alec@kowalla.co>',
      to: email,
      subject: 'Welcome to Kowalla!',
      html:
        "<p>Welcome to Kowalla! My name is Alec, and I'm building Kowalla to help entrepreneurs and creators" +
        ' connect with the community and resources they need to build their dreams. ' +
        'Talented, ambitious entrepreneurs are scattered all across the globe, but the best resources and community' +
        ' for them to be successful are concentrated in large cities and startup hubs. Kowalla is here to change that.</p>' +
        '<p><a href="mailto:alec@kowalla.co?subject=What%20I%20want%20from%20Kowalla" rel="noopener" style="text-decoration: none; color: #2190E3;" target="_blank">Reply</a>' +
        " here and tell me what <strong><i>you'd</i></strong> like out of Kowalla, let me know if you have any questions, " +
        "or just say hello! I'm building this platform to be user-first, and " +
        'I need your help to make it great!</p>' +
        '<br>' +
        '<p>Alec Khoury</p>' +
        '<p>Kowalla</p>'
    };
    mg.messages().send(data, function(error, body) {
      console.log(body);
    });
  }
};
