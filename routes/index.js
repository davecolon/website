const express = require('express')
const router = express.Router()
const app = express()
const cms = require('./modules/cms')

router.get('/', (req, res, next) => {
	cms.loadData().then(cmsData => {
		res.render('index', { 
			rows : cmsData[0],
			links : cmsData[1],
			images : cmsData[2],
			cont_intro : cmsData[3],
			cont_about : cmsData[4],
			cont_who_we : cmsData[5],
			cont_research : cmsData[6],
			cont_location : cmsData[7],
			cont_footer : cmsData[8],
			cont_flavor : cmsData[9],
			title: 'k+'
		})
	}).catch(err => { console.error(err) })
	
})


module.exports = router
