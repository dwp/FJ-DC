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

  // ITERATION 3
  
  // Didn’t attend their appointment

  app.post('/iteration-3/q-attended-logic', function (req, res) {

    let question = req.session.data['question']
    let status = req.session.data['status']

    if (question === 'yes') {
      res.redirect(`q-proved-identity?status=${status}`)
    } else if (question === 'no') {
      // Failed to attend
      if (status === 'fta') {
        res.redirect(`prestatus?status=${status}&prestatus=changetofta2&nextstatus=fta2`)
      } else {
        res.redirect(`prestatus?status=${status}&prestatus=changetofta&nextstatus=fta`)
      }
    } else {
      res.redirect('error')
    }

  });

  // Didn’t prove their identity
  
  app.post('/iteration-3/q-proved-identity-logic', function (req, res) {

    let question = req.session.data['question']
    let status = req.session.data['status']

    if (question === 'yes') {
      res.redirect(`q-signed-claimant-commitment?status=${status}`)
    } else if (question === 'no') {
      // No identity
      if (status === 'noidentity') {
        res.redirect(`prestatus?status=${status}&prestatus=stayasnoidentity&nextstatus=noidentity`)
      } else {
        res.redirect(`prestatus?status=${status}&prestatus=changetonoidentity&nextstatus=noidentity`)
      }
    } else {
      res.redirect('error')
    }

  });

  // Signed their claimant commitment
  
  app.post('/iteration-3/q-signed-claimant-commitment-logic', function (req, res) {

    let question = req.session.data['question']
    let status = req.session.data['status']

    if (question === 'yes') {
      res.redirect(`q-before-you-can-verify-them?status=${status}`)
    } else if (question === 'no') {
      // No claimant commitment
      if (status === 'noclaimantcommitment') {
        res.redirect(`prestatus?status=${status}&prestatus=stayasnoclaimantcommitment&nextstatus=noclaimantcommitment`)
      } else {
        res.redirect(`prestatus?status=${status}&prestatus=changetonoclaimantcommitment&nextstatus=noclaimantcommitment`)
      }
    } else {
      res.redirect('error')
    }

  });

  // Before you can verify them
  
  app.post('/iteration-3/q-before-you-can-verify-them-logic', function (req, res) {

    let sentemail = req.session.data['sentemail']
    let status = req.session.data['status']

    if (sentemail) {
      res.redirect(`status-confirmation?status=verified`)
    } else {
      res.redirect('error')
    }

  });

}