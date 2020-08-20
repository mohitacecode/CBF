Bot publish (Admin)

* publish bot -> cors site -> response (212122415623152.js)
* 212122415623152.js -> xyz(has) -> 1(Bot id)


End-user (Webiste)

* <script src="./bot_static/212122415623152.js"></script>
* you will respond me with the daynamic js. (load.js) with hash

example:
```
app.get('/bot_static/*', function(req, res) {
     load.js -> is your templet (text.jade)  
    var key = req.query.key;
    var key = fetchKeyFromDBSync(); // just to make it easier here, no async.
    var out = fileJs.replace(API_KEY_CONST, key);
    res.setHeader('content-type', 'text/javascript');
    res.write(template({has:2121212}));
    res.end();
});
```

How API will work and how style
* will make api call with has to get style
* bot req/res has
* /chatbox/session/{hash}?dev=true
* dev queryParam is only for builder preview

