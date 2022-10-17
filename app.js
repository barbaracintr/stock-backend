const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())

const rotaStocks = require("./routes/stocks");
app.use(bodyParser.urlencoded({ extended: false })) //apenas dados simples
app.use(bodyParser.json()) //aceita apenas json de entrada no body

app.use("/stocks", rotaStocks);

//Quando nao encontra rota
app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
