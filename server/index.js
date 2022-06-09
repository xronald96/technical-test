import express from "express";
import { getItems, updateItem, addItem, deleteItem} from './operations.mjs'
const app = express();
app.use(express.json());
app.all("/*", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    return next();
  });
app.get('/', (req, res)=>{
    res.status(200).send(getItems(req.query))
})

app.post('/', (req, res)=>{
    res.status(200).send(addItem(req.body))
})
app.put('/', (req, res)=>{
    res.status(200).send(updateItem(req.body))
})
app.delete('/:id', (req, res)=>{
    deleteItem(req.query.id)
    res.status(204).send()
})
app.listen(4000, ()=>console.log('localhost://4000'))