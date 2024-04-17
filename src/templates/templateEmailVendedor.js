 const cat_productos = require("../data/productos");

 function getTemplateHTMLVendedor(order) {
  const URL_GARMON="https://www.garmon.com.mx"
  const DIRECCION ="Av. Cam. Real a San Lorenzo 71, 8va, Amp San Miguel, 09837, CDMX."
  const COLOR1 ="#021024"
  const COLOR2 ="#052659"
  let texto1=`Nuevo pedido en Garmon Store, No. de Pedido #${order.id_order}`
  //const COLOR2 ="#7DA0CA"
  

// Map para generar la lista de productos comprados en el correo electrónico
let productosHTML = order.products.map(producto => {
  if(producto){
      if(producto.newPrice){
      subtotal = producto.newPrice * producto.quantity }
    else{
      subtotal= producto.price * producto.quantity;}
    const code = `
      <li style="list-style: none; margin-bottom: 0px; display: flex; align-items: center;">
        <img src=${producto.images[0]} alt="imagen" style="width: 28px; height: 28px; margin-right: 3px;">
        <p style="margin: 0; flex: 1;">(${producto?.quantity})  ${producto?.name.substring(0, 20)}...</p>
        <p style="margin: 0; margin-left: auto;"><span>$${subtotal}</span></p>
      </li>`;
    return code;
  }
    else return ''
}).join('');

productosHTML=productosHTML + `<hr/> 
<li style="list-style: none; margin-bottom: 10px;">${"Costo de envío"} <span style="float: right;">$${order.shipping}</span></li>
<li style="list-style-type: disc; margin-bottom: 10px;">Total <span style="float: right;">$${order.total}</span></li>`

	let template = `<!DOCTYPE html>
    <html>
    <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        /* FONTS */
        @media screen {
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 700;
              src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: italic;
              font-weight: 400;
              src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: italic;
              font-weight: 700;
              src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
            }
        }
        
        /* CLIENT-SPECIFIC STYLES */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
    
        /* RESET STYLES */
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        
        /* MOBILE STYLES */
        @media screen and (max-width:600px){
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }
    
        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
    </head>
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
      ${texto1} 
    </div>


    </div>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td bgcolor=${COLOR1} align="center">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                            <a href="http://litmus.com" target="_blank">
                                <img alt="Logo" src="https://i.ibb.co/R4y31sj/garmon-logo-2.png"  height="150" style="display: block; width: 100px; max-width: 100px; min-width: 200px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                            </a>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
        <!-- HERO -->
        <tr>
            <td bgcolor=${COLOR1} align="center" style="padding: 0px 10px 0px 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                          <h1 style="font-size: 40px; font-weight: 400; margin: 0;">Nuevo Pedido</h1>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
        <!-- COPY BLOCK -->
        <tr>
            <td bgcolor=${COLOR2} align="center" style="padding: 0px 10px 0px 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                  <!-- COPY -->
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                      <p style="margin: 0;">${texto1}</p>
                      <br>  <br>
                       <h4>Datos del Cliente</h4>
                       <br>
                        <p>Nombre: ${order.client_details.name}</p>
                        <p>Dirección: ${order.client_details.address}</p>
                        <p>Codigo Postal: ${order.client_details.cp}</p>
                        <p>Telefono: ${order.client_details.telephone}</p>
                         <p>E-mail: ${order.client_details.email}</p>
                    </td>
                  </tr>
                  <!-- BULLETPROOF BUTTON -->
                  <tr>
                    <td bgcolor="#ffffff" align="left">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 30px 30px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                  <td align="center" style="border-radius: 3px;" bgcolor="#000000"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- COPY -->
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 30px 50px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                        <!-- TODO LISTA PEDIDO --> 
                    ${productosHTML}
                    </td>
                  </tr>
                  <!-- COPY -->
                    <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                        <p style="margin: 0;"></p>
                      </td>
                    </tr>
                  <!-- COPY -->
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                      
                    </td>
                  </tr>
                  <!-- COPY -->
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                      <p style="margin: 0;"><br> <b>Garmon Solutions</b></p>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
        <!-- SUPPORT CALLOUT -->
        <tr>
            <td bgcolor=${COLOR2} align="center" style="padding: 30px 10px 0px 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                    <!-- HEADLINE -->
                    <tr>
                      <td bgcolor="#FFF0D1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                        <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">¡Visítanos! estamos a un clic de distancia</h2>
                        <p style="margin: 0;"><a href="                        <p style="margin: 0;"><a href="https://www.garmon.com.mx" target="_blank" style="color: #9B4503;">Visitar web</a>
                      </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
        <!-- FOOTER -->
        <tr>
            <td bgcolor=${COLOR2} align="center" style="padding: 0px 10px 0px 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                  <!-- NAVIGATION -->
                  <tr>
             
                  </tr>
                  <!-- PERMISSION REMINDER -->
                  <tr>
                    <td bgcolor=${COLOR2} align="left" style="padding: 0px 0px 0px 0px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 380; line-height: 14px;" >
                      <p align="justify">
                        AVISO DE PRIVACIDAD. GARMON SOLUTIONS, S.A. DE C.V., en cumplimiento
                        a lo establecido en la Ley Federal de Protección de Datos Personales en
                        Posesión de Particulares, podrá utilizar los datos personales por este
                        medio recabados, con la finalidad de que “GARMON SOLUTIONS” envíe comunicaciones y
                        correos electrónicos, comunicados, ofertas, entre otras, con el fin de recibir la
                        información y servicios que GARMON SOLUTIONS, S.A. DE C.V. 
                        presta. Para mayor información acerca del
                        tratamiento de sus datos personales y de los derechos con que usted cuenta,
                        así como la finalidad que le daremos a los mismos, incluyendo los datos
                        proporcionados  en el pasado por cualquier medio; favor de consultar
                        nuestro Aviso de Privacidad y Política de Privacidad y Protección de Datos,
                        a través de nuestro sitio Web
                        <a class="enlace" href="https://www.garmon.com.mx">https://www.garmon.com.mx</a>
                        
                      </p>
                    </td>
                  </tr>
                  <!-- UNSUBSCRIBE -->
                  <tr>
                    <td bgcolor=${COLOR2} align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
    
                    </td>
                  </tr>
                  <!-- ADDRESS -->
                  <tr>
                    <td bgcolor=${COLOR2} align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; line-height: 18px;" >
                      <p style="margin: 0;">${DIRECCION}</p>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
    </table>
        
    </body>
    </html> `;

	return template;
}

module.exports = getTemplateHTMLVendedor;