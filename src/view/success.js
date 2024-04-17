require('dotenv').config();

const successView = (text) => {
  const view = `<html>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
    </head>
      <style>
        body {
          text-align: center;
          padding: 40px 0;
          background: #83f2c9;
        }
          h1 {
            color: #88B04B;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-weight: 900;
            font-size: 40px;
            margin-bottom: 10px;
          }
          p {
            color: #404F5E;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-size:20px;
            margin: 0;
          }
        i {
          color: #9ABC66;
          font-size: 100px;
          line-height: 200px;
          margin-left:-15px;
        }
        .card {
          background: white;
          padding: 60px;
          border-radius: 10px;
          box-shadow: 0 2px 3px #C8D0D8;
          display: inline-block;
          margin: 0 auto;
         /*  border: 1px solid #ccc; Añadir borde */
          width: 400px; /* Ajustar el ancho */
        }
      </style>
      <body>
        <div class="card" style="width:500px;">
        <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;  ">
          <i class="checkmark">✓</i>
        </div>
          <h1>Compra Realizada</h1> 
          <br/>
          <p>${text}.</p>
            <br/>
              <br/>
            <p>Puede cerrar esta ventana.</p>
        </div>
           <br/>
      </body>
      <br/>
           <a href=${"https://www.garmon.com.mx"}>  Regresar a Garmon Solutions </a>
  </html>`;

  return view;
};

module.exports = successView;
