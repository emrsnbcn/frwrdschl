  //This is just a prototype
const express = require("express")
const cheerio = require("cheerio")
const request = require("request")
const cors = require("cors")
const PORT = 4000
const app = express()

app.use(cors())
getHTML = (url) => {
	return new Promise((resolve, reject) => {
		request.get(url, (err, res, html) => {
			resolve(cheerio.load(html))
		})
	})
}

app.get("/", async (req,res) => {
	const $ = await getHTML("https://www.jobstreet.com.my/en/job-search/job-vacancy.php?ojs=10&key=software+engineer")
	const temp = $('#bodyalign').html()
	return res.send(temp)
})

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))