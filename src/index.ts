import express from "express";
import juice from "juice";
import { JuiceBody } from "./juicews";
const app = express();

app.use(express.json())

app.get('/juice', (req,res) => {
  const juiceBody = req.body as JuiceBody;
  res.send(juice(juiceBody.content, juiceBody.options))
})

app.listen(8080, () => {
  // tslint:disable-next-line:no-console
  console.log('Listening...')
})

