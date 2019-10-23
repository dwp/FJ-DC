module.exports = {

  bind: function (app) {

    app.get('/', function (req, res) {
      res.render('index');
    });

    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });

    // Includes

    // Experiments
    require('./routes/va.js')(app);

    // Processing centre versions
    require('./routes/v2.js')(app);
    require('./routes/v3.js')(app);
    require('./routes/v4.js')(app);
    require('./routes/v5.js')(app);

    // Work coach versions
    require('./routes/wcv1.js')(app);
    require('./routes/wcv2.js')(app);
    require('./routes/wcv3.js')(app);
    require('./routes/wcv4.js')(app);
    require('./routes/wcv5.js')(app);

    // Screens for JIRA stories
    require('./routes/iteration-1.js')(app);
    require('./routes/iteration-3.js')(app);

  }
}