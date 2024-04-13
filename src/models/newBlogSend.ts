require("dotenv").config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
  user: process.env.MAIL,
  pass: process.env.MAIL_PASS,
 },
});

const newBlogSendMail = async (
 toEmail: string,
 subject: string,
 img1: string,
 title: string,
 subtitle: string,
 body: string
) => {
 try {
  const mailOptions = {
   from: process.env.MAIL,
   to: toEmail,
   subject: subject,
   html: `<!DOCTYPE html>
<html
 xmlns:v="urn:schemas-microsoft-com:vml"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 lang="en"
>
 <head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!--[if mso
   ]><xml
    ><o:OfficeDocumentSettings
     ><o:PixelsPerInch>96</o:PixelsPerInch
     ><o:AllowPNG /></o:OfficeDocumentSettings></xml
  ><![endif]-->
  <!--[if !mso]><!-->
  <!--<![endif]-->
  <style>
   * {
    box-sizing: border-box;
   }

   body {
    margin: 0;
    padding: 0;
   }

   a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: inherit !important;
   }

   #MessageViewBody a {
    color: inherit;
    text-decoration: none;
   }

   p {
    line-height: inherit;
   }

   .desktop_hide,
   .desktop_hide table {
    mso-hide: all;
    display: none;
    max-height: 0px;
    overflow: hidden;
   }

   .image_block img + div {
    display: none;
   }

   @media (max-width: 700px) {
    .desktop_hide table.icons-inner,
    .row-3 .column-1 .block-7.button_block .alignment a,
    .row-3 .column-1 .block-7.button_block .alignment div,
    .social_block.desktop_hide .social-table {
     display: inline-block !important;
    }

    .icons-inner {
     text-align: center;
    }

    .icons-inner td {
     margin: 0 auto;
    }

    .mobile_hide {
     display: none;
    }

    .row-content {
     width: 100% !important;
    }

    .stack .column {
     width: 100%;
     display: block;
    }

    .mobile_hide {
     min-height: 0;
     max-height: 0;
     max-width: 0;
     overflow: hidden;
     font-size: 0px;
    }

    .desktop_hide,
    .desktop_hide table {
     display: table !important;
     max-height: none !important;
    }

    .row-1 .column-1 .block-1.paragraph_block td.pad > div {
     text-align: center !important;
     font-size: 18px !important;
    }

    .row-2 .column-1 .block-2.heading_block h1,
    .row-3 .column-1 .block-1.heading_block h2,
    .row-3 .column-1 .block-4.heading_block h2 {
     text-align: left !important;
    }

    .row-2 .column-1 .block-2.heading_block h1 {
     font-size: 32px !important;
    }

    .row-3 .column-1 .block-2.paragraph_block td.pad > div,
    .row-3 .column-1 .block-3.paragraph_block td.pad > div,
    .row-3 .column-1 .block-5.paragraph_block td.pad > div,
    .row-3 .column-1 .block-6.paragraph_block td.pad > div {
     text-align: left !important;
     font-size: 16px !important;
    }

    .row-2 .column-1 .block-3.paragraph_block td.pad > div {
     text-align: left !important;
     font-size: 14px !important;
    }

    .row-3 .column-1 .block-1.heading_block h2,
    .row-3 .column-1 .block-4.heading_block h2 {
     font-size: 20px !important;
    }

    .row-4 .column-1 .block-1.spacer_block,
    .row-5 .column-1 .block-1.spacer_block {
     height: 40px !important;
    }

    .row-3 .column-1 .block-7.button_block a,
    .row-3 .column-1 .block-7.button_block div,
    .row-3 .column-1 .block-7.button_block span {
     line-height: 32px !important;
    }

    .row-3 .column-1 .block-7.button_block .alignment {
     text-align: center !important;
    }

    .row-6 .column-1 .block-1.paragraph_block td.pad {
     padding: 0 0 16px !important;
    }

    .row-2 .column-1 {
     padding: 0 24px 16px !important;
    }

    .row-3 .column-1 {
     padding: 0 24px !important;
    }

    .row-6 .column-1 {
     padding: 32px 16px 48px !important;
    }
   }
  </style>
 </head>

 <body
  style="
   background-color: #f8f6ff;
   margin: 0;
   padding: 0;
   -webkit-text-size-adjust: none;
   text-size-adjust: none;
  "
 >
  <table
   class="nl-container"
   width="100%"
   border="0"
   cellpadding="0"
   cellspacing="0"
   role="presentation"
   style="
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    background-color: #f8f6ff;
    background-image: none;
    background-position: top left;
    background-size: auto;
    background-repeat: no-repeat;
   "
  >
   <tbody>
    <tr>
     <td>
      <table
       class="row row-1"
       align="center"
       width="100%"
       border="0"
       cellpadding="0"
       cellspacing="0"
       role="presentation"
       style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
      >
       <tbody>
        <tr>
         <td>
          <table
           class="row-content stack"
           align="center"
           border="0"
           cellpadding="0"
           cellspacing="0"
           role="presentation"
           style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #a797ff;
            color: #000000;
            width: 680px;
            margin: 0 auto;
           "
           width="680"
          >
           <tbody>
            <tr>
             <td
              class="column column-1"
              width="100%"
              style="
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               font-weight: 400;
               text-align: left;
               padding-bottom: 32px;
               padding-left: 48px;
               padding-right: 48px;
               padding-top: 32px;
               vertical-align: top;
               border-top: 0px;
               border-right: 0px;
               border-bottom: 0px;
               border-left: 0px;
              "
             >
              <table
               class="paragraph_block block-1"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                word-break: break-word;
               "
              >
               <tr>
                <td class="pad">
                 <div
                  style="
                   color: #ffffff;
                   direction: ltr;
                   font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                   font-size: 24px;
                   font-weight: 700;
                   letter-spacing: 0px;
                   line-height: 120%;
                   text-align: center;
                   mso-line-height-alt: 28.799999999999997px;
                  "
                 >
                  <p style="margin: 0">Frerot</p>
                 </div>
                </td>
               </tr>
              </table>
             </td>
            </tr>
           </tbody>
          </table>
         </td>
        </tr>
       </tbody>
      </table>
      <table
       class="row row-2"
       align="center"
       width="100%"
       border="0"
       cellpadding="0"
       cellspacing="0"
       role="presentation"
       style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
      >
       <tbody>
        <tr>
         <td>
          <table
           class="row-content stack"
           align="center"
           border="0"
           cellpadding="0"
           cellspacing="0"
           role="presentation"
           style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
            border-radius: 0;
            color: #000000;
            width: 680px;
            margin: 0 auto;
           "
           width="680"
          >
           <tbody>
            <tr>
             <td
              class="column column-1"
              width="100%"
              style="
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               font-weight: 400;
               text-align: left;
               padding-left: 48px;
               padding-right: 48px;
               vertical-align: top;
               border-top: 0px;
               border-right: 0px;
               border-bottom: 0px;
               border-left: 0px;
              "
             >
              <div
               class="spacer_block block-1"
               style="height: 48px; line-height: 48px; font-size: 1px"
              >
               &#8202;
              </div>
              <table
               class="heading_block block-2"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
               <tr>
                <td
                 class="pad"
                 style="padding-bottom: 8px; text-align: center; width: 100%"
                >
                 <h1
                  style="
                   margin: 0;
                   color: #292929;
                   direction: ltr;
                   font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                   font-size: 32px;
                   font-weight: 700;
                   letter-spacing: normal;
                   line-height: 120%;
                   text-align: left;
                   margin-top: 0;
                   margin-bottom: 0;
                   mso-line-height-alt: 38.4px;
                  "
                 >
                  <span class="tinyMce-placeholder">It's Blog's time!</span>
                 </h1>
                </td>
               </tr>
              </table>
          
              <table
               class="image_block block-4"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
               <tr>
                <td class="pad" style="width: 100%">
                 <div
                  class="alignment"
                  align="center"
                  style="line-height: 10px"
                 >
                  <div style="max-width: 584px">
                   <img
                    src='${img1}'
                    style="display: block; height: auto; border: 0; width: 100%"
                    width="584"
                    height="auto"
                   />
                  </div>
                 </div>
                </td>
               </tr>
              </table>
             </td>
            </tr>
           </tbody>
          </table>
         </td>
        </tr>
       </tbody>
      </table>
      <table
       class="row row-3"
       align="center"
       width="100%"
       border="0"
       cellpadding="0"
       cellspacing="0"
       role="presentation"
       style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
      >
       <tbody>
        <tr>
         <td>
          <table
           class="row-content stack"
           align="center"
           border="0"
           cellpadding="0"
           cellspacing="0"
           role="presentation"
           style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
            border-radius: 0;
            color: #000000;
            width: 680px;
            margin: 0 auto;
           "
           width="680"
          >
           <tbody>
            <tr>
             <td
              class="column column-1"
              width="100%"
              style="
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               font-weight: 400;
               text-align: left;
               padding-left: 48px;
               padding-right: 48px;
               padding-top: 48px;
               vertical-align: top;
               border-top: 0px;
               border-right: 0px;
               border-bottom: 0px;
               border-left: 0px;
              "
             >
              <table
               class="heading_block block-1"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
               <tr>
                <td class="pad" style="text-align: center; width: 100%">
                 <h2
                  style="
                   margin: 0;
                   color: #000000;
                   direction: ltr;
                   font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                   font-size: 24px;
                   font-weight: 700;
                   letter-spacing: normal;
                   line-height: 120%;
                   text-align: left;
                   margin-top: 0;
                   margin-bottom: 0;
                   mso-line-height-alt: 28.799999999999997px;
                  "
                 >
                  <span class="tinyMce-placeholder"
                   >${title}</span
                  >
                 </h2>
                </td>
               </tr>
              </table>
              <table
               class="paragraph_block block-2"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                word-break: break-word;
               "
              >
               <tr>
                <td class="pad" style="padding-top: 16px">
                 <div
                  style="
                   color: #525252;
                   direction: ltr;
                   font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                   font-size: 16px;
                   font-weight: 400;
                   letter-spacing: 0px;
                   line-height: 150%;
                   text-align: left;
                   mso-line-height-alt: 24px;
                  "
                 >
                  <p style="margin: 0">
                   ${subtitle}
                  </p>
                 </div>
                </td>
               </tr>
              </table>
              <table
               class="paragraph_block block-5"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                word-break: break-word;
               "
              >
               <tr>
                <td class="pad" style="padding-top: 16px">
                 <div
                  style="
                   color: #525252;
                   direction: ltr;
                   font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                   font-size: 16px;
                   font-weight: 400;
                   letter-spacing: 0px;
                   line-height: 150%;
                   text-align: left;
                   mso-line-height-alt: 24px;
                  "
                 >
                  <p style="margin: 0">
                   ${body}
                  </p>
                 </div>
                </td>
               </tr>
              </table>
              <table
               class="button_block block-7"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
               <tr>
                <td class="pad" style="padding-top: 12px; text-align: left">
                 <div class="alignment" align="left">
                  <!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://mybrandfrerot.netlify.app/html/blogspage" style="height:42px;width:158px;v-text-anchor:middle;" arcsize="20%" stroke="false" fillcolor="#7259ff">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
<!
                  [endif]--><a
                   href="https://mybrandfrerot.netlify.app/html/blogspage"
                   target="_blank"
                   style="
                    text-decoration: none;
                    display: inline-block;
                    color: #ffffff;
                    background-color: #7259ff;
                    border-radius: 8px;
                    width: auto;
                    border-top: 0px solid transparent;
                    font-weight: 400;
                    border-right: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-left: 0px solid transparent;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    text-align: center;
                    mso-border-alt: none;
                    word-break: keep-all;
                   "
                   ><span
                    style="
                     padding-left: 24px;
                     padding-right: 24px;
                     font-size: 16px;
                     display: inline-block;
                     letter-spacing: normal;
                    "
                    ><span style="word-break: break-word; line-height: 32px"
                     >Read full article</span
                    ></span
                   ></a
                  ><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                 </div>
                </td>
               </tr>
              </table>
              <table
               class="divider_block block-8"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
               <tr>
                <td class="pad" style="padding-top: 24px">
                 <div class="alignment" align="center">
                  <table
                   border="0"
                   cellpadding="0"
                   cellspacing="0"
                   role="presentation"
                   width="100%"
                   style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  >
                   <tr>
                    <td
                     class="divider_inner"
                     style="
                      font-size: 1px;
                      line-height: 1px;
                      border-top: 1px solid #dddddd;
                     "
                    >
                     <span>&#8202;</span>
                    </td>
                   </tr>
                  </table>
                 </div>
                </td>
               </tr>
              </table>
             </td>
            </tr>
           </tbody>
          </table>
         </td>
        </tr>
       </tbody>
      </table>
      <table
       class="row row-4"
       align="center"
       width="100%"
       border="0"
       cellpadding="0"
       cellspacing="0"
       role="presentation"
       style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
      >
       <tbody>
        <tr>
         <td>
          <table
           class="row-content stack"
           align="center"
           border="0"
           cellpadding="0"
           cellspacing="0"
           role="presentation"
           style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
            border-radius: 0;
            color: #000000;
            width: 680px;
            margin: 0 auto;
           "
           width="680"
          >
           <tbody>
            <tr>
             <td
              class="column column-1"
              width="100%"
              style="
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               font-weight: 400;
               text-align: left;
               vertical-align: top;
               border-top: 0px;
               border-right: 0px;
               border-bottom: 0px;
               border-left: 0px;
              "
             >
              <div
               class="spacer_block block-1"
               style="height: 50px; line-height: 50px; font-size: 1px"
              >
               &#8202;
              </div>
             </td>
            </tr>
           </tbody>
          </table>
         </td>
        </tr>
       </tbody>
      </table>
      <table
       class="row row-5"
       align="center"
       width="100%"
       border="0"
       cellpadding="0"
       cellspacing="0"
       role="presentation"
       style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
      >
       <tbody>
        <tr>
         <td>
          <table
           class="row-content stack"
           align="center"
           border="0"
           cellpadding="0"
           cellspacing="0"
           role="presentation"
           style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
            border-radius: 0;
            color: #000000;
            width: 680px;
            margin: 0 auto;
           "
           width="680"
          >
           <tbody>
            <tr>
             <td
              class="column column-1"
              width="100%"
              style="
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               font-weight: 400;
               text-align: left;
               vertical-align: top;
               border-top: 0px;
               border-right: 0px;
               border-bottom: 0px;
               border-left: 0px;
              "
             >
              <div
               class="spacer_block block-1"
               style="height: 50px; line-height: 50px; font-size: 1px"
              >
               &#8202;
              </div>
             </td>
            </tr>
           </tbody>
          </table>
         </td>
        </tr>
       </tbody>
      </table>
      <table
       class="row row-6"
       align="center"
       width="100%"
       border="0"
       cellpadding="0"
       cellspacing="0"
       role="presentation"
       style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
      >
       <tbody>
        <tr>
         <td>
          <table
           class="row-content stack"
           align="center"
           border="0"
           cellpadding="0"
           cellspacing="0"
           role="presentation"
           style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #a797ff;
            border-radius: 0;
            color: #000000;
            width: 680px;
            margin: 0 auto;
           "
           width="680"
          >
           <tbody>
            <tr>
             <td
              class="column column-1"
              width="100%"
              style="
               mso-table-lspace: 0pt;
               mso-table-rspace: 0pt;
               font-weight: 400;
               text-align: left;
               padding-bottom: 48px;
               padding-top: 32px;
               vertical-align: top;
               border-top: 0px;
               border-right: 0px;
               border-bottom: 0px;
               border-left: 0px;
              "
             >
              <table
               class="paragraph_block block-1"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                word-break: break-word;
               "
              >
               <tr>
                <td class="pad" style="padding-bottom: 22px">
                 <div
                  style="
                   color: #ffffff;
                   direction: ltr;
                   font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                   font-size: 27px;
                   font-weight: 700;
                   letter-spacing: 0px;
                   line-height: 120%;
                   text-align: center;
                   mso-line-height-alt: 32.4px;
                  "
                 >
                  <p style="margin: 0">Frerot</p>
                 </div>
                </td>
               </tr>
              </table>
              <table
               class="social_block block-2"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
               <tr>
                <td
                 class="pad"
                 style="
                  padding-bottom: 32px;
                  padding-top: 24px;
                  text-align: center;
                  padding-right: 0px;
                  padding-left: 0px;
                 "
                >
                 <div class="alignment" align="center">
                  <table
                   class="social-table"
                   width="92px"
                   border="0"
                   cellpadding="0"
                   cellspacing="0"
                   role="presentation"
                   style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    display: inline-block;
                   "
                  >
                   <tr>
                    <td style="padding: 0 7px 0 7px">
                     <a
                      href="https://www.linkedin.com/ntwalifrerot"
                      target="_blank"
                      ><img
                       src="https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/emailPhotos%2Flinkedin%402x.png?alt=media&token=d7b6a40c-67e8-454e-9b5c-79eeed3027e4"
                       width="32"
                       height="auto"
                       alt="Linkedin"
                       title="linkedin"
                       style="display: block; height: auto; border: 0"
                     /></a>
                    </td>
                    <td style="padding: 0 7px 0 7px">
                     <a
                      href="https://www.instagram.com/frerot._"
                      target="_blank"
                      ><img
                       src="https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/emailPhotos%2Finstagram%402x.png?alt=media&token=979f17b2-2325-4b06-9f83-33d4c1e50098"
                       width="32"
                       height="auto"
                       alt="Instagram"
                       title="instagram"
                       style="display: block; height: auto; border: 0"
                     /></a>
                    </td>
                   </tr>
                  </table>
                 </div>
                </td>
               </tr>
              </table>
              <table
               class="divider_block block-3"
               width="100%"
               border="0"
               cellpadding="10"
               cellspacing="0"
               role="presentation"
               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
               <tr>
                <td class="pad">
                 <div class="alignment" align="center">
                  <table
                   border="0"
                   cellpadding="0"
                   cellspacing="0"
                   role="presentation"
                   width="85%"
                   style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  >
                   <tr>
                    <td
                     class="divider_inner"
                     style="
                      font-size: 1px;
                      line-height: 1px;
                      border-top: 1px solid #9583ff;
                     "
                    >
                     <span>&#8202;</span>
                    </td>
                   </tr>
                  </table>
                 </div>
                </td>
               </tr>
              </table>
              <table
               class="paragraph_block block-4"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                word-break: break-word;
               "
              >
               <tr>
                <td class="pad" style="padding-top: 16px">
                 <div
                  style="
                   color: #443888;
                   direction: ltr;
                   font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                   font-size: 12px;
                   font-weight: 400;
                   letter-spacing: 0px;
                   line-height: 120%;
                   text-align: center;
                   mso-line-height-alt: 14.399999999999999px;
                  "
                 >
                  <p style="margin: 0">
                   You have received this email because you are a subscriber of
                   <a
                    href="https://mybrandfrerot.netlify.app/"
                    target="_blank"
                    style="text-decoration: underline; color: #202020"
                    rel="noopener"
                    >This site</a
                   >
                  </p>
                 </div>
                </td>
               </tr>
              </table>
              <table
               class="paragraph_block block-5"
               width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               role="presentation"
               style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                word-break: break-word;
               "
              >
               <tr>
                <td class="pad" style="padding-top: 16px">
                 <div
                  style="
                   color: #443888;
                   direction: ltr;
                   font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                   font-size: 12px;
                   font-weight: 400;
                   letter-spacing: 0px;
                   line-height: 120%;
                   text-align: center;
                   mso-line-height-alt: 14.399999999999999px;
                  "
                 >
                  <p style="margin: 0">
                   if you feel you received it by mistake or wish to
                   unsubscribe,
                   <a
                    href="http://example.com/unsubcribe"
                    target="_blank"
                    style="text-decoration: underline; color: #202020"
                    rel="noopener"
                    >click here</a
                   >.
                  </p>
                 </div>
                </td>
               </tr>
              </table>
             </td>
            </tr>
           </tbody>
          </table>
         </td>
        </tr>
       </tbody>
      </table>
 
                    
                   </td>
                  </tr>
                 </table>
                </td>
               </tr>
              </table>
             </td>
            </tr>
           </tbody>
          </table>
         </td>
        </tr>
       </tbody>
      </table>
     </td>
    </tr>
   </tbody>
  </table>
 </body>
</html>
`,
  };
  await transporter.sendMail(mailOptions);
 } catch (error) {
  console.log(error);
 }
};

export default newBlogSendMail;
