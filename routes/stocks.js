const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

mysql.getConnection((error, conn) => {
  conn.query("CREATE DATABASE stocks_db", (error, resultado, field) => {});
  conn.query("USE stocks_db", (error, resultado, field) => {});
  conn.query(
    "CREATE TABLE IF NOT EXISTS stock(stock_id int NOT NULL auto_increment, stock_date date NOT NULL, stock_open float NOT NULL, stock_high float NOT NULL, stock_low float NOT NULL, stock_close float NOT NULL, stock_volume float NOT NULL, PRIMARY KEY (stock_id))",
    (error, resultado, field) => {}
  );
  conn.release();
});

router.get("/", (req, res) => {
  mysql.getConnection((error, conn) => {
    conn.query("SELECT * FROM stock", (error, resultado, field) => {
      conn.release();
      res.status(200).send({
        data: resultado,
      });
    });
  });
});

router.post("/", (req, res) => {
  req.body.dataJson.data.forEach((dataOne) => {
      const stock = {
        data: dataOne[0],
        open: dataOne[1],
        high: dataOne[2],
        low: dataOne[3],
        close: dataOne[4],
        volume: dataOne[5],
    }
    
  mysql.getConnection((error, conn) => {
    conn.query(
      "INSERT INTO stock (stock_date, stock_open, stock_high, stock_low, stock_close, stock_volume) VALUES (?, ?, ?, ?, ?, ?)",
      [
        stock.data,
        stock.open,
        stock.high,
        stock.low,
        stock.close,
        stock.volume,
      ],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null,
          });
        }

        res.status(201).send({
          mensagem: "Dado inserido com sucesso",
          stockCriado: stock,
        });
      }
    );
  });
  
});
});

module.exports = router;
