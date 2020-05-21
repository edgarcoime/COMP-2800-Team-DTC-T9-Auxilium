import express from "express";
import nodemailer from "nodemailer";
require('dotenv').config()
// Auth middleware
import auth from "../middleware/auth.middleware";

const emailRouter = express.Router();


emailRouter.post("/",auth, async (req, res, next) => {
    try {
        const {userEmail, username, ownerEmail} = req.body;
        console.log(userEmail, username, ownerEmail)
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                    user:"auxilium0921990@gmail.com",
                    pass:"auxiliumisawsome"
                }
        })
        
        const mailOption = {
            from: 'Auxilium <auxilium0921990@gmail.com>',
            to: ownerEmail,
            cc: userEmail,
            subject: `Auxilium: Volunteer acceptance from ${username}`,
    html: `<table style="display:none!important;">
    <tr>
        <td>
            <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                Pre-header for the newsletter template
            </div>
        </td>
    </tr>
</table>
<!-- pre-header end -->
<!-- header -->
<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">

    <tr>
        <td align="center">
            <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">

                <tr>
                    <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                </tr>
                <tr>
                    <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                </tr>

            </table>
        </td>
    </tr>
</table>
<!-- end header -->

<!-- big image section -->
<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">

    <tr>
        <td align="center">
            <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
                <tr>

                    <td align="center" class="section-img">
                        <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="https://i.imgur.com/qIsBhFb.png" style="display: block; width: 590px;" width="590" border="0" alt="" /></a>
                    </td>
                </tr>
                <tr>
                    <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td align="center" style="color: #343434; font-size: 24px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">


                        <div style="line-height: 35px">

                            HELP REQUEST <span style="color: #5caad2;">ACCEPTED</span>

                        </div>
                    </td>
                </tr>

                <tr>
                    <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                </tr>

                <tr>
                    <td align="center">
                        <table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="eeeeee">
                            <tr>
                                <td height="2" style="font-size: 2px; line-height: 2px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                </tr>

                <tr>
                    <td align="center">
                        <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container590">
                            <tr>
                                <td align="center" style="color: #888888; font-size: 16px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;">


                                    <div style="line-height: 24px">
                                        The user ${username} has accepted to help you, please give him or her a private message to obtain some help.
                                        Volunteer Email: ${userEmail}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                </tr>

                <tr>
                    <td align="center">
                        <table border="0" align="center" width="160" cellpadding="0" cellspacing="0" bgcolor="5caad2" style="">

                            <tr>
                                <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                            </tr>

                            <tr>
                                <td align="center" style="color: #ffffff; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 26px;">


                                    <div style="line-height: 26px;">
                                        <a href="https://master.dqek9jhclyvix.amplifyapp.com/" style="color: #ffffff; text-decoration: none;">GO TO OUR WEB</a>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                            </tr>

                        </table>
                    </td>
                </tr>


            </table>

        </td>
    </tr>

</table>
<!-- end section -->

<!-- contact section -->
<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">

    <tr class="hide">
        <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
    </tr>
    <tr>
        <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
    </tr>

    <tr>
        <td height="60" style="border-top: 1px solid #e0e0e0;font-size: 60px; line-height: 60px;">&nbsp;</td>
    </tr>

    <tr>
        <td align="center">
            <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590 bg_color">

                <tr>
                    <td>
                        <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
                            <tr>
                                <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                            </tr>

                            <tr>
                                <td align="left" style="color: #888888; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 23px;" class="text_color">
                                    <div style="color: #333333; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; font-weight: 600; mso-line-height-rule: exactly; line-height: 23px;">

                                        Email us: <br/> <a href="mailto:" style="color: #888888; font-size: 14px; font-family: 'Hind Siliguri', Calibri, Sans-serif; font-weight: 400;">auxilium0921990@gmail.com</a>

                                    </div>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <tr>
        <td height="60" style="font-size: 60px; line-height: 60px;">&nbsp;</td>
    </tr>

</table>`,
        }
        
    const result = await transporter.sendMail(mailOption)
    res.json(result)
    }catch(err){
        console.log(err)
        res.status(422).json("error occurs")
    }
});

export default emailRouter;
