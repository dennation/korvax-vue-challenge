import express from "express"
import cors from "cors"
import { faker } from "@faker-js/faker"
import { readFile, writeFile } from "fs/promises"
import path from "path"
import bodyParser from "body-parser"

const port = 3000
const templateFilePath = path.join(__dirname, "..", "data", "template.txt")
const styleFilePath = path.join(__dirname, "..", "data", "style.txt")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/data", (req, res) => {
    res.send({
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        picture: faker.image.urlLoremFlickr({ category: "product" }),
    })
})

app.get("/template-data", async (req, res) => {
    const template = (await readFile(templateFilePath, "utf8")).trim()
    const style = (await readFile(styleFilePath, "utf8")).trim()

    res.send({
        template,
        style,
    })
})

app.post("/template-data", async (req, res) => {
    const { template, style } = req.body

    if (template === undefined || style === undefined) {
        return res.status(400).send()
    }

    await Promise.all([writeFile(templateFilePath, template), writeFile(styleFilePath, style)])

    res.status(201).send()
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
