router.get('/user', (req, res, next) => {
	//console.log("Entrée ici");
	res.setHeader('Content-Type', 'text/plain');
	res.send('route /user');
  //res.sendFile(path.join(__dirname,'/../index.html'));

});
