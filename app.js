const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// https://github.com/sass/node-sass-middleware
const sass = require('node-sass-middleware')

// https://github.com/ForbesLindesay/browserify-middleware
const browserify = require('browserify-middleware')

const routes = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser())

app.use(sass({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true,
	outputStyle: 'compressed',
	sourceMap: app.get('env') !== 'production',
	debug: app.get('env') !== 'production'
}))

browserify.settings({
	transform: [
		// 'jadeify', // client-side jade template functions
		['babelify', {presets: ['es2015']}] // compile client-side js as es6
	]
})
app.use('/js', browserify( path.join(__dirname, 'public/js'), {
	cache: true,
	precompile: true
} ))

app.use(express.static( path.join(__dirname, 'public') ))

app.use('/', routes)

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') !== 'production') {

	const livereload = require('express-livereload')

	// notify dev of errors in a notification
	if(app.get('env') === 'local'){
		const notifier = require('node-notifier')
		app.use((err, req, res, next) => {
			notifier.notify({
				'title': 'Error',
				'message': err.message
			})
			next()
		})
	}

	// notify dev of errors in console, and send to client
	app.use((err, req, res, next) => {
		console.error(err.message)
		res.status(err.status || 500)
		res.render('error', {
			message: err.message,
			error: err
		})
	})

	// hotswap styles
	livereload(app, {
		watchDir: __dirname + '/public/styles/',
		exts: ['css'], // only watch css
		exclusions: ['map', 'scss', 'sass'] // exclude scss and map because it will refresh the whole page
	})

	const chokidar = require('chokidar')
	const request = require('request')
	const styleWatcher = chokidar.watch(__dirname + '/public/styles/**/*.s*ss')
	styleWatcher.on('change', path => {
		console.log('CHANGED STYLE:', path)
		//TODO: infer path so this will work with any css file, not just style.css
		request('http://localhost:3000/styles/style.css', (err, response) => {
			// console.log(err, response)
		})
	})
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: {}
	})
})

// catch 404 and redirect
app.use((req, res, next) => {
	res.redirect('/')
})

module.exports = app
