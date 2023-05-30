const config = require("config");
const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  config.get("mjPublicKey"),
  config.get("mjPrivateKey")
);

module.exports = ({ email, name, subject, message }) => {
  console.log("mail", { email, name, subject, message });
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "chad@codersimp.com",
          Name: "PATDOC Update",
        },
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        Subject: subject,
        TextPart: `Dear ${name}, You have a new update from your Patdoc account! ${message} Login to view details.`,
        HTMLPart: `<h3>Dear ${name}, <br>You have a new update from your Patdoc account! </h3>
            <p>${message}</p>
            <p><a href='http://45.80.152.161:8080/'>Visit PatDoc</a> to view more details</p>`,
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};
