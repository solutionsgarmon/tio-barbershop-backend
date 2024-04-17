// En errorView.js

const errorView = (text) => {
  const view = `<html>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
    </head>
      <style>
        body {
          text-align: center;
          padding: 40px 0;
          background: #f0a57a;
        }
          h1 {
            color: #FF6347; /* Cambiar color a rojo para representar error */
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
          color: #FF6347; 
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
          width: 500px; /* Ajustar el ancho */
        }
      </style>
      <body>
        <div class="card">
          <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
            <i class="checkmark">❌</i> <!-- Cambiar a una marca de error -->
          </div>
          <h1>Error</h1> 
          <br/>
          <p>${text}.</p>
          <br/>
          <br/>
          <p>Por favor, intente nuevamente.</p> <!-- Agregar mensaje adicional -->
           <p>En caso de persistir este error, ponte en contácto directo con nosotros: store@garmon.com.mx </p> <!-- Agregar mensaje adicional -->
        </div>
        <br/>
         <a href=${"https://www.garmon.com.mx"}>  Regresar a Garmon Solutions </a>
      </body>
  </html>`;

  return view;
};

module.exports = errorView;
