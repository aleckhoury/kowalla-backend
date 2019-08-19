const mailgun = require("mailgun-js");
// const template = require('../EmailTemplates/WelcomeEmail.ejs.html');
const DOMAIN = 'kowalla.co';
const api_key = 'e2a99e09d23ef862951659cff28d130a-898ca80e-4963c86f';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

module.exports = {
    async sendWelcomeEmail(name, email) {
        const data = {
            from: 'Kowalla <alec@kowalla.co>',
            to: email,
            subject: 'Welcome to Kowalla!',
            html: "" +
                "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" +
                "\n" +
                "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:v=\"urn:schemas-microsoft-com:vml\">\n" +
                "<head>\n" +
                "    <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->\n" +
                "    <meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\"/>\n" +
                "    <meta content=\"width=device-width\" name=\"viewport\"/>\n" +
                "    <!--[if !mso]><!-->\n" +
                "    <meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\"/>\n" +
                "    <!--<![endif]-->\n" +
                "    <title></title>\n" +
                "    <!--[if !mso]><!-->\n" +
                "    <link href=\"https://fonts.googleapis.com/css?family=Lato\" rel=\"stylesheet\" type=\"text/css\"/>\n" +
                "    <!--<![endif]-->\n" +
                "    <style type=\"text/css\">\n" +
                "        body {\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "        }\n" +
                "\n" +
                "        table,\n" +
                "        td,\n" +
                "        tr {\n" +
                "            vertical-align: top;\n" +
                "            border-collapse: collapse;\n" +
                "        }\n" +
                "\n" +
                "        * {\n" +
                "            line-height: inherit;\n" +
                "        }\n" +
                "\n" +
                "        a[x-apple-data-detectors=true] {\n" +
                "            color: inherit !important;\n" +
                "            text-decoration: none !important;\n" +
                "        }\n" +
                "        img + div { display:none; }\n" +
                "    </style>\n" +
                "    <style id=\"media-query\" type=\"text/css\">\n" +
                "        @media (max-width: 670px) {\n" +
                "\n" +
                "            .block-grid,\n" +
                "            .col {\n" +
                "                min-width: 320px !important;\n" +
                "                max-width: 100% !important;\n" +
                "                display: block !important;\n" +
                "            }\n" +
                "\n" +
                "            .block-grid {\n" +
                "                width: 100% !important;\n" +
                "            }\n" +
                "\n" +
                "            .col {\n" +
                "                width: 100% !important;\n" +
                "            }\n" +
                "\n" +
                "            .col>div {\n" +
                "                margin: 0 auto;\n" +
                "            }\n" +
                "\n" +
                "            img.fullwidth,\n" +
                "            img.fullwidthOnMobile {\n" +
                "                max-width: 100% !important;\n" +
                "            }\n" +
                "\n" +
                "            .no-stack .col {\n" +
                "                min-width: 0 !important;\n" +
                "                display: table-cell !important;\n" +
                "            }\n" +
                "\n" +
                "            .no-stack.two-up .col {\n" +
                "                width: 50% !important;\n" +
                "            }\n" +
                "\n" +
                "            .no-stack .col.num4 {\n" +
                "                width: 33% !important;\n" +
                "            }\n" +
                "\n" +
                "            .no-stack .col.num8 {\n" +
                "                width: 66% !important;\n" +
                "            }\n" +
                "\n" +
                "            .no-stack .col.num4 {\n" +
                "                width: 33% !important;\n" +
                "            }\n" +
                "\n" +
                "            .no-stack .col.num3 {\n" +
                "                width: 25% !important;\n" +
                "            }\n" +
                "\n" +
                "            .no-stack .col.num6 {\n" +
                "                width: 50% !important;\n" +
                "            }\n" +
                "\n" +
                "            .no-stack .col.num9 {\n" +
                "                width: 75% !important;\n" +
                "            }\n" +
                "\n" +
                "            .video-block {\n" +
                "                max-width: none !important;\n" +
                "            }\n" +
                "\n" +
                "            .mobile_hide {\n" +
                "                min-height: 0px;\n" +
                "                max-height: 0px;\n" +
                "                max-width: 0px;\n" +
                "                display: none;\n" +
                "                overflow: hidden;\n" +
                "                font-size: 0px;\n" +
                "            }\n" +
                "\n" +
                "            .desktop_hide {\n" +
                "                display: block !important;\n" +
                "                max-height: none !important;\n" +
                "            }\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body class=\"clean-body\" style=\"margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #F5F5F5;\">\n" +
                "<!--[if IE]><div class=\"ie-browser\"><![endif]-->\n" +
                "<table bgcolor=\"#F5F5F5\" cellpadding=\"0\" cellspacing=\"0\" class=\"nl-container\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F5F5F5; width: 100%;\" valign=\"top\" width=\"100%\">\n" +
                "    <tbody>\n" +
                "    <tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "        <td style=\"word-break: break-word; vertical-align: top;\" valign=\"top\">\n" +
                "            <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color:#F5F5F5\"><![endif]-->\n" +
                "            <div style=\"background-color:#E9EBEE;\">\n" +
                "                <div class=\"block-grid two-up no-stack\" style=\"Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;\">\n" +
                "                    <div style=\"border-collapse: collapse;display: table;width: 100%;background-color:#39c9a0;\">\n" +
                "                        <img src=\"https://kowalla-dev.s3.us-east-2.amazonaws.com/internal/Screen+Shot+2019-08-17+at+5.39.16+PM.png\" alt=\"kowalla-logo\" style=\"width: 100%;\">\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div style=\"background-color:#E9EBEE;\">\n" +
                "                <div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #D6E7F0;\">\n" +
                "                    <div style=\"border-collapse: collapse;display: table;width: 100%;background-color:white;\">\n" +
                "                        <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#E9EBEE;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:650px\"><tr class=\"layout-full-width\" style=\"background-color:#D6E7F0\"><![endif]-->\n" +
                "                        <!--[if (mso)|(IE)]><td align=\"center\" width=\"650\" style=\"background-color:#D6E7F0;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 25px; padding-left: 25px; padding-top:5px; padding-bottom:60px;\"><![endif]-->\n" +
                "                        <div class=\"col num12\" style=\"min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;\">\n" +
                "                            <div style=\"width:100% !important;\">\n" +
                "                                <!--[if (!mso)&(!IE)]><!-->\n" +
                "                                <div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0; padding-right: 25px; padding-left: 25px;\">\n" +
                "                                    <!--<![endif]-->\n" +
                "                                    <div align=\"center\" class=\"img-container center fixedwidth\" style=\"padding-right: 0px;padding-left: 0px;\">\n" +
                "                                        <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr style=\"line-height:0px\"><td style=\"padding-right: 0px;padding-left: 0px;\" align=\"center\"><![endif]-->\n" +
                "                                        <img src=\"https://kowalla-dev.s3.us-east-2.amazonaws.com/internal/Screen+Shot+2019-08-17+at+5.31.48+PM.png\" alt=\"welcome-phone\" style=\"width: 75%;\" />\n" +
                "                                        <!--[if mso]></td></tr></table><![endif]-->\n" +
                "                                    </div>\n" +
                "                                    <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 15px; padding-top: 20px; padding-bottom: 0px; font-family: Tahoma, Verdana, sans-serif\"><![endif]-->\n" +
                "                                    <div style=\"color:#052d3d;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:150%;padding-top:20px;\">\n" +
                "                                        <div style=\"font-size: 12px; line-height: 18px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #052d3d;\">\n" +
                "                                            <p style=\"font-size: 14px; line-height: 75px; text-align: center; margin: 0;\"><span style=\"font-size: 50px;\"><strong><span style=\"line-height: 75px; font-size: 50px;\"><span style=\"font-family: 'Nunito'; font-size: 30px; color: #0a2049;\">Welcome, @" + name + "</span></span></strong></span></p>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                    <!--[if mso]></td></tr></table><![endif]-->\n" +
                "                                    <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif\"><![endif]-->\n" +
                "                                    <div style=\"color:#555555;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">\n" +
                "                                        <div style=\"font-size: 12px; line-height: 14px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #555555;\">\n" +
                "                                            <p style=\"font-size: 14px; line-height: 21px; text-align: center; margin: 0;\"><span style=\"font-size: 18px; color: #0a2049;\">\n" +
                "                                                Thanks for signing up for Kowalla! We're so happy to have you! <a href=\"mailto:alec@kowalla.co?subject=What%20I%20want%20from%20Kowalla\" rel=\"noopener\" style=\"text-decoration: none; color: #2190E3;\" target=\"_blank\">Reply</a> to this email and let us know what you want to get out of Kowalla, so we can make your ✨dreams✨ come true!</span></p>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                    <!--[if mso]></td></tr></table><![endif]-->\n" +
                "                                    <!--<div align=\"center\" class=\"button-container\" style=\"padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">-->\n" +
                "                                        <!--&lt;!&ndash;[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\"><tr><td style=\"padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px\" align=\"center\"><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"#\" style=\"height:39pt; width:172.5pt; v-text-anchor:middle;\" arcsize=\"29%\" stroke=\"false\" fillcolor=\"#fc7318\"><w:anchorlock/><v:textbox inset=\"0,0,0,0\"><center style=\"color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px\"><![endif]&ndash;&gt;<a href=\"#\" style=\"-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #fc7318; border-radius: 15px; -webkit-border-radius: 15px; -moz-border-radius: 15px; width: auto; width: auto; border-top: 1px solid #fc7318; border-right: 1px solid #fc7318; border-bottom: 1px solid #fc7318; border-left: 1px solid #fc7318; padding-top: 10px; padding-bottom: 10px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;\" target=\"_blank\"><span style=\"padding-left:40px;padding-right:40px;font-size:16px;display:inline-block;\">-->\n" +
                "<!--<span style=\"font-size: 16px; line-height: 32px;\"><strong>START SHOPPING</strong></span>-->\n" +
                "<!--</span></a>-->\n" +
                "                                        <!--&lt;!&ndash;[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]&ndash;&gt;-->\n" +
                "                                    <!--</div>-->\n" +
                "                                    <!--[if (!mso)&(!IE)]><!-->\n" +
                "                                </div>\n" +
                "                                <!--<![endif]-->\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n" +
                "                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div style=\"background-color:#E9EBEE;\">\n" +
                "                <div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #E9EBEE;\">\n" +
                "                    <div style=\"border-collapse: collapse;display: table;width: 100%;background-color:white;\">\n" +
                "                        <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#E9EBEE;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:650px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->\n" +
                "                        <!--[if (mso)|(IE)]><td align=\"center\" width=\"650\" style=\"background-color:#E9EBEE;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:60px;\"><![endif]-->\n" +
                "                        <div class=\"col num12\" style=\"min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;\">\n" +
                "                            <div style=\"width:100% !important;\">\n" +
                "                                <!--[if (!mso)&(!IE)]><!-->\n" +
                "                                <div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:20px; padding-bottom:60px; padding-right: 0px; padding-left: 0px;\">\n" +
                "                                    <!--<![endif]-->\n" +
                "                                    <!--<table cellpadding=\"0\" cellspacing=\"0\" class=\"social_icons\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;\" valign=\"top\" width=\"100%\">-->\n" +
                "                                        <!--<tbody>-->\n" +
                "                                        <!--<tr style=\"vertical-align: top;\" valign=\"top\">-->\n" +
                "                                            <!--<td style=\"word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;\" valign=\"top\">-->\n" +
                "                                                <!--<table activate=\"activate\" align=\"center\" alignment=\"alignment\" cellpadding=\"0\" cellspacing=\"0\" class=\"social_table\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;\" to=\"to\" valign=\"top\">-->\n" +
                "                                                    <!--<tbody>-->\n" +
                "                                                    <!--<tr align=\"center\" style=\"vertical-align: top; display: inline-block; text-align: center;\" valign=\"top\">-->\n" +
                "                                                        <!--<td style=\"word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 8px; padding-left: 8px;\" valign=\"top\"><a href=\"https://www.facebook.com/\" target=\"_blank\"><img alt=\"Facebook\" height=\"32\" src=\"images/facebook@2x.png\" style=\"text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;\" title=\"Facebook\" width=\"32\"/></a></td>-->\n" +
                "                                                        <!--<td style=\"word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 8px; padding-left: 8px;\" valign=\"top\"><a href=\"https://twitter.com/\" target=\"_blank\"><img alt=\"Twitter\" height=\"32\" src=\"images/twitter@2x.png\" style=\"text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;\" title=\"Twitter\" width=\"32\"/></a></td>-->\n" +
                "                                                        <!--<td style=\"word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 8px; padding-left: 8px;\" valign=\"top\"><a href=\"https://instagram.com/\" target=\"_blank\"><img alt=\"Instagram\" height=\"32\" src=\"images/instagram@2x.png\" style=\"text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;\" title=\"Instagram\" width=\"32\"/></a></td>-->\n" +
                "                                                        <!--<td style=\"word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 8px; padding-left: 8px;\" valign=\"top\"><a href=\"https://www.pinterest.com/\" target=\"_blank\"><img alt=\"Pinterest\" height=\"32\" src=\"images/pinterest@2x.png\" style=\"text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;\" title=\"Pinterest\" width=\"32\"/></a></td>-->\n" +
                "                                                    <!--</tr>-->\n" +
                "                                                    <!--</tbody>-->\n" +
                "                                                <!--</table>-->\n" +
                "                                            <!--</td>-->\n" +
                "                                        <!--</tr>-->\n" +
                "                                        <!--</tbody>-->\n" +
                "                                    <!--</table>-->\n" +
                "                                    <!--&lt;!&ndash;[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif\"><![endif]&ndash;&gt;-->\n" +
                "                                    <!--<div style=\"color:#555555;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:150%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">-->\n" +
                "                                        <!--<div style=\"font-size: 12px; line-height: 18px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #555555;\">-->\n" +
                "                                            <!--<p style=\"font-size: 14px; line-height: 21px; text-align: center; margin: 0;\">Kowalla - Coworking Anywhere </p>-->\n" +
                "                                            <!--<p style=\"font-size: 14px; line-height: 21px; text-align: center; margin: 0;\">329 California St, San Francisco, CA 94118</p>-->\n" +
                "                                        <!--</div>-->\n" +
                "                                    <!--</div>-->\n" +
                "                                    <!--&lt;!&ndash;[if mso]></td></tr></table><![endif]&ndash;&gt;-->\n" +
                "                                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">\n" +
                "                                        <tbody>\n" +
                "                                        <tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "                                            <td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;\" valign=\"top\">\n" +
                "                                                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" height=\"0\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 60%; border-top: 1px dotted #C4C4C4; height: 0px;\" valign=\"top\" width=\"60%\">\n" +
                "                                                    <tbody>\n" +
                "                                                    <tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "                                                        <td height=\"0\" style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\"><span></span></td>\n" +
                "                                                    </tr>\n" +
                "                                                    </tbody>\n" +
                "                                                </table>\n" +
                "                                            </td>\n" +
                "                                        </tr>\n" +
                "                                        </tbody>\n" +
                "                                    </table>\n" +
                "                                    <!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif\"><![endif]-->\n" +
                "                                    <div style=\"color:#4F4F4F;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">\n" +
                "                                        <div style=\"font-size: 12px; line-height: 14px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #4F4F4F;\">\n" +
                "                                            <p style=\"font-size: 12px; line-height: 16px; text-align: center; margin: 0;\"><span style=\"font-size: 14px;\"><a href=\"mailto:help@kowalla.co?subject=I%20need%20help!\" rel=\"noopener\" style=\"text-decoration: none; color: #2190E3;\" target=\"_blank\"><strong>Help &amp; Unsubscribe</strong></a> |  <a href=\"https://kowalla.co/beta\" rel=\"noopener\" style=\"text-decoration: none; color: #2190E3;\" target=\"_blank\"><strong>Login</strong></a></p>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                    <!--[if mso]></td></tr></table><![endif]-->\n" +
                "                                    <!--[if (!mso)&(!IE)]><!-->\n" +
                "                                </div>\n" +
                "                                <!--<![endif]-->\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n" +
                "                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n" +
                "        </td>\n" +
                "    </tr>\n" +
                "    </tbody>\n" +
                "</table>\n" +
                "<!--[if (IE)]></div><![endif]-->\n" +
                "</body>\n" +
                "</html>"
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
};