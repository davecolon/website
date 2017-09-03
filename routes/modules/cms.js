
/*
	https://docs.google.com/spreadsheets/d/1SD-Cklhvqw1jtQDO_rHEz_85Iy8oxvDK-OxtrZETcoY/edit#gid=0
	https://docs.google.com/spreadsheets/d/1ILcoM0VIo6Y83uXLMWwjWmcAb1il1XsczqbiFTHtAiA/edit#gid=0
*/

const GoogleSpreadsheet = require('google-spreadsheet')
const doc = new GoogleSpreadsheet('1ILcoM0VIo6Y83uXLMWwjWmcAb1il1XsczqbiFTHtAiA')
const async = require('async')

var cachedSheetPromise
var lastCacheInvalidation = Date.now()

function getSheetAsJSON(){

	var sheet
	var navBarTittle

	return new Promise((resolve, reject) => {
		async.series([
			function getSheet(next){
				doc.getInfo((err, info) => {
					if(err) {
						reject(err)
					}else {
						sheet = info.worksheets[0]
						next()
					}
				})
			},
			function parseToJSON(){

				sheet.getRows({
					offset: 0,
					limit: 200,
					orderby: 'col1'
				}, (err, rows) => {
					if(err){
						reject()
					}else{
						var row = rows[0] 
						delete row._xml
						delete row.id
						delete row._links
						delete row.save
						delete row.del
						resolve(row)
					}
				})
			}
		])
	})
}

function getNavLinkAsJson(){

	var navBarTittle

	return new Promise((resolve, reject) => {
		async.series([
			function getSheet(next){
				doc.getInfo((err, info) => {
					if(err) {
						reject(err)
					}else {
						navBarTittle = info.worksheets[1]
						next()
					}
				})
			},
			function parseToJSON(){
				//Getting cells
				navBarTittle.getCells({
					'min-row': 2,
					'max-row': 200,
					'min-col': 1,
					'max-col': 2,
					'return-empty': false
				},(err, cells) => {
					if(err) {
						reject(err)
					}else {
						var cel= cells
						resolve(cel)
					}
				})
			}
		])
	})
}

function getImgAsJson(){

	var imgUrls

	return new Promise((resolve, reject) => {
		async.series([
			function getSheet(next){
				doc.getInfo((err, info) => {
					if(err) {
						reject(err)
					}else {
						imgUrls = info.worksheets[2]
						next()
					}
				})
			},
			function parseToJSON(){
				//Getting cells
				imgUrls.getCells({
					'min-row': 2,
					'max-row': 200,
					'min-col': 1,
					'max-col': 20,
					'return-empty': false
				},(err, imgs) => {
					if(err) {
						reject(err)
					}else {
						var img= imgs
						var objImages= {}
						var i
						for(i = 0; i < img.length; i+=2){
							objImages[img[i].value] = img[i+1].value
						}
						resolve(objImages)
					}
				})
			}
		])
	})
}

function getDataCms(nSheet, minRow, maxRow, minCol, maxCol){

	var dataValue

	return new Promise((resolve, reject) => {
		async.series([
			function getSheet(next){
				doc.getInfo((err, info) => {
					if(err) {
						reject(err)
					}else {
						dataValue = info.worksheets[nSheet]
						next()
					}
				})
			},
			function parseToJSON(){
				//Getting cells
				dataValue.getCells({
					'min-row': minRow,
					'max-row': maxRow,
					'min-col': minCol,
					'max-col': maxCol,
					'return-empty': false
				},(err, data) => {
					if(err) {
						reject(err)
					}else {
						//var finalData= data
						var objData= {}
						var objSize= 0
						var i
						for(i = 0; i < data.length; i+=2){
							objData[data[i].value] = data[i+1].value
							objSize++;
						}
						objData["size"]=objSize
						resolve(objData)
					}
				})
			}
		])
	})
}

module.exports = {
	loadData(cacheTimeInMinutes){
		cacheTimeInMinutes = undefined ? cacheTimeInMinutes = 10 : ''
		var bustCache = Date.now() - lastCacheInvalidation > (cacheTimeInMinutes*6000)
		if(bustCache || cachedSheetPromise === undefined){
			//all(row, linksData, imgData, content)
			cachedSheetPromise = Promise.all([
				getSheetAsJSON(),
				getNavLinkAsJson(), //linkData
				getDataCms(2,2,200,1,20), //imgData
				getDataCms(3,3,200,1,2), //content_intro
				getDataCms(3,3,200,4,5), //content_about
				getDataCms(3,3,200,7,8), //content_who_we_are
				getDataCms(3,3,200,10,11), //content_research
				getDataCms(3,3,200,13,14), //content_location
				getDataCms(3,3,200,16,17), //content_footer
				getDataCms(3,3,200,19,20), //content_flavor
				getDataCms(3,3,200,22,23) //content_contact
				])
		}
		return cachedSheetPromise
	}

}