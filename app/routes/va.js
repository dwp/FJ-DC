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

  // VERSION A ROUTES (USED FOR EXPERIMENTING)


  // Branching on the status updates screen

  // Session stuff for dynamic 'back links'

  // Code from Steven for dealing with variables on list page

  app.get('/va/applications-duplicate-ninos', (req, res, next) => {
    if (req.query.origin) {
      req.session.origin = req.query.origin
    };
    res.render('va/applications-duplicate-ninos.html', {origin: req.session.origin});
  });

  app.get('/va/applications-cancelled', (req, res, next) => {
    if (req.query.origin) {
      req.session.origin = req.query.origin
    };
    res.render('va/applications-cancelled.html', {origin: req.session.origin});
  });

  app.get('/va/applicant', (req, res, next) => {
    if (req.query.origin) {
      req.session.origin = req.query.origin
    };
    res.render('va/applicant.html', {origin: req.session.origin});
  });

  // This code works with the code in server.js - Middleware making the origin property accessible to every template (working with Steven)

  // End session stuff for dynamic 'back links'



  app.post('/va/search-entry', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let search = req.session.data['search']

    // fred
    if (search === 'QQ 12 34 56 C' || search === 'QQ123456C') {
      res.redirect('applicant?nino=QQ123456C&status=unverified')
    // lex
    } else if (search === 'QQ 00 11 22 A' || search === 'QQ001122A') {
      res.redirect('applicant?nino=QQ001122A&status=unverified')
    // lois
    } else if (search === 'QQ 11 11 22 B' || search === 'QQ111122B') {
      res.redirect('applicant?nino=QQ111122B&status=unverified')
    // clark
    } else if (search === 'QQ 11 22 33 A' || search === 'QQ112233A') {
      res.redirect('applicant?nino=QQ112233A&status=unverified&sr=true')
    // not found
    } else if (search === 'QQ 12 34 56 Z' || search ==='QQ123456Z') {
      res.redirect('search-not-found?nino=QQ123456Z')
    } else if (search === 'QQ 12 12 12 A' || search ==='QQ121212A') {
      res.redirect('search-not-found?nino=QQ121212A')
    // barney
    } else if (search === 'QQ 11 11 11 Z' || search ==='QQ111111Z') {
      res.redirect('applicant?nino=QQ111111Z&status=unverified')
    // daffy
    } else if (search === 'QQ 22 22 33 V' || search ==='QQ222233V') {
      res.redirect('applicant?nino=QQ222233V&status=verified')
    // sponge bob
    } else if (search === 'QQ 11 22 33 M' || search ==='QQ112233M') {
      res.redirect('applicant?nino=QQ112233M&status=failedtoattend')
    // multiple-results
    } else if (search === 'QQ 01 01 01 A' || search ==='QQ010101A') {
      res.redirect('search-multiple-results')
    // multiple-results
    } else if (search === 'QQ 11 22 33 Z' || search ==='QQ112233Z') {
      res.redirect('applicant?nino=QQ112233Z&status=unverified')
    // Scrooge
    } else if (search === 'QQ 11 11 22 G' || search ==='QQ111122G') {
      res.redirect('applicant?nino=QQ111122G&status=failedtoattend')
    } else {
      res.redirect('back')
    }
  })

  app.post('/va/status-changing', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let status = req.session.data['status']

    let nino = req.session.data['nino']

    if (status === 'cancelled') {
      res.redirect(`cancelled-reason?nino=${nino}&status=unverified`)
    } else if (status === 'verified') {
      res.redirect(`pdf?nino=${nino}&status=unverified`)
    } else {
      res.redirect('error')
    }
  })

  app.post('/va/cancelled-logic', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let reason = req.session.data['reason']

    let nino = req.session.data['nino']

    if (reason === 'nocontact') {
      res.redirect(`letter?nino=${nino}&status=unverified`)
    } else {
      res.redirect(`status-confirmation?nino=${nino}&status=cancelled`)
    }
  })

  // END OF VERSION A ROUTES

}