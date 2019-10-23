module.exports = function (app) {

  // Code supplied by Gary for dealing with query strings

  app.use(function(req, res, next){
    Object.assign(res.locals,{
      postData: (req.body ? req.body : false)
    });

    Object.assign(res.locals,{
      getData: (req.query ? req.query : false)
    });

    next();
  });

  // VERSION 3 ROUTES

  app.post('/v3/status-changing', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let status = req.session.data['status']

    let nino = req.session.data['nino']

    if (status === 'failed-to-attend') {
      res.redirect(`status-confirmation?nino=${nino}&status=failedtoattend`)
    } else if (status === 'verified') {
      res.redirect(`pdf?nino=${nino}&status=unverified`)
    } else {
      res.redirect('error')
    }
  })

  // END OF VERSION 3 ROUTES

}