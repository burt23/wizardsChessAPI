const express = require('express');
const { resolve } = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 3001

const app = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/wizardschess.club/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/wizardschess.club/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/wizardschess.club/chain.pem') 
};


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(resolve(__dirname, '../src/public')));

app.get('/rooms/:name', (req, res) => {
	let Room = models.Room
	Room.find().byName(req.params.id)
	.then((doc) => console.log(doc))
})

app.get('/.well-known/acme-challenge/zpYoCjpQwKdhK3L_5iLLoKyJcXc4AotZGG9ALy7jpKA', (req, res) => {
  const answer = 'zpYoCjpQwKdhK3L_5iLLoKyJcXc4AotZGG9ALy7jpKA.qgUDJGZFDeLX2UcTcBgNs74XXt0DX7aAuSK-yIFaCaE';
  res.send(answer);
})

app.post('/rooms', (req, res) => {
	let Room = models.Room
	let room = new Room({
		name: req.body.name,
		users: req.body.users
	})
	room.save()
	.then((doc) => console.log(doc))
})

app.delete('/rooms/:name', (req, res) => {
	let Room = models.Room
	Room.remove({ name: 'diagon alley'})
	.then(()=> Room.find())
	.then((doc) => console.log(doc))
})

app.get('*', (req, res) => {
	res.redirect('/');
})

//app.listen(port, () => {
//  console.log('App is listening to port ' + port);
//})
//
// http.createServer(app).listen(3000);
https.createServer(options, app).listen(3443);

module.exports = app;
