import express = require("express");
import { verify } from '@govtechsg/oa-verify';
const cors = require('cors')
const app = express();

app.use(express.json())
app.set("port", 3000);
app.use(cors())

app.post("/verify", async (req, res) => {
  const verifyResult = await verify(req.body,{ network: 'rinkeby' })
  res.send(verifyResult);
});

export default app;
