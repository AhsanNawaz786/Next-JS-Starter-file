import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        
        //sending email
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000});
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b91b7d1d874098",
              pass: "b4d0f4de46d3de"
            }
          });


          // create mailoptions
          const mailOptions = {
            from: 'harsh@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Password",
            html: `<p> Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "Verify Your Email" : "Reset Password"}
                   or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>`
                    
          }

          // send mail with mailoptions

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

       


    } catch (error:any) {
        throw new Error(error.message)
    }

}