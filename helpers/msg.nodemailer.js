const transporter = require("../middlewares/nodemailer")

const recoverPass = async (token, email) => {
   try {
    await transporter.sendMail({
    from: `"EZ project" <${process.env.GMAIL_USER}>`,
    to: `${email}`,
    subject: "Recuperar tu contraseña ✔",
    text: "Aquí podras generar una nueva contraseña", // plain‑text body
    html: `
    <img src="logo-empresa">
    <b>Segui estos pasos</b>
    <a href="recoverPass/${token}">Hace click aquí para generar una nueva contraseña</a>`, // HTML body
  });
  return {
    msg: "ok",
    statusCode: 200
  }
   } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500
    }
   }
}

module.exports = {recoverPass}