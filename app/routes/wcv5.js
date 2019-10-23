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

  // WORK COACH V2

  // Destroy the session after coming back to the home screen
  
  app.get('/wcv5/home', function (req, res) {
    req.session.destroy()
    res.render('wcv5/home')
  })

  // SEARCH

  app.post('/wcv5/search-entry', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let nino = req.session.data['nino']
    let status = req.session.data['status']
    
    res.redirect(`claimant-overview?status=${status}&nino=${nino}`)

  })

  // STATUS QUESTIONS

  // Has the claimant attended their appointment?
  app.post('/wcv5/q-attended-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']

    if (question === 'yes') {
      res.redirect(`q-appointment-checklist?status=${status}&nino=${nino}`)
    } else if (question === 'no') {
      res.redirect(`q-arranged-another?status=${status}&nino=${nino}`)
    } else {
      res.redirect('error')
    }

  })

  // Appointment checklist
  app.post('/wcv5/q-appointment-checklist-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']

    if (question) {
      if (question.includes('identity') && question.includes('commitment') && question.includes('evidence')) {
        res.redirect(`q-upload?status=${status}&nino=${nino}`)
      } else if (question.includes('identity') && question.includes('commitment')) {
        res.redirect(`notes?status=${status}&nino=${nino}&next=verified`)
      } else if (question.includes('identity')) {
        res.redirect(`q-no-commitment-reason?status=${status}&nino=${nino}`)
      } else if (question.includes('commitment')) {
        res.redirect(`q-book-another?status=${status}&nino=${nino}&justcommitment=true`)
      } else {
        res.redirect(`q-book-another?status=${status}&nino=${nino}`)
      }
    } else {
      res.redirect(`q-book-another?status=${status}&nino=${nino}`)
    }

  })

  // Upload logic
  app.post('/wcv5/q-upload-logic', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let file1 = req.session.data['file-upload-1']
    let file2 = req.session.data['file-upload-2']
    let file3 = req.session.data['file-upload-3']

    let nino = req.session.data['nino']
    let early = req.session.data['early']
    let status = req.session.data['status']

    if (file3) {
      res.redirect(`q-upload?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&file3=true&filename3=${file3}&early=${early}&status=${status}`)
    } else if (file2) {
      res.redirect(`q-upload?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&early=${early}&status=${status}`)
    } else {
      if (file1) {
        res.redirect(`q-upload?nino=${nino}&file1=true&filename1=${file1}&early=${early}&status=${status}`)
      } else {
        res.redirect(`q-upload?nino=${nino}&error=true&early=${early}&status=${status}`)
      }
    }
  })

  app.post('/wcv5/documents-upload-logic', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let documentsfile1 = req.session.data['documentsfile-upload-1']
    let documentsfile2 = req.session.data['documentsfile-upload-2']
    let documentsfile3 = req.session.data['documentsfile-upload-3']

    let nino = req.session.data['nino']
    let early = req.session.data['early']
    let status = req.session.data['status']

    if (documentsfile3) {
      res.redirect(`documents-upload?nino=${nino}&documentsfile1=true&documentsfilename1=${documentsfile1}&documentsfile2=true&documentsfilename2=${documentsfile2}&documentsfile3=true&documentsfilename3=${documentsfile3}&early=${early}&status=${status}`)
    } else if (documentsfile2) {
      res.redirect(`documents-upload?nino=${nino}&documentsfile1=true&documentsfilename1=${documentsfile1}&documentsfile2=true&documentsfilename2=${documentsfile2}&early=${early}&status=${status}`)
    } else {
      if (documentsfile1) {
        res.redirect(`documents-upload?nino=${nino}&documentsfile1=true&documentsfilename1=${documentsfile1}&early=${early}&status=${status}`)
      } else {
        res.redirect(`documents-upload?nino=${nino}&error=true&early=${early}&status=${status}`)
      }
    }
  })

  // No claimant commitment reason
  app.post('/wcv5/q-no-commitment-reason-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']
    let next = req.session.data['next']

    if (question === 'more-time') {
      res.redirect(`q-book-another?status=${status}&nino=${nino}&justidentity=true`)
    } else if (question === 'not-wanted') {
      res.redirect(`notes?status=${status}&nino=${nino}&next=unverified-commitment`)
    } else {
      res.redirect('error')
    }

  })

  // Book another appointment (to follow)
  app.post('/wcv5/q-book-another-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']

    if (question === 'yes') {
      res.redirect(`notes?status=${status}&nino=${nino}&next=appointmentbooked`)
    } else if (question === 'no-someone-else') {
      res.redirect(`notes?status=${status}&nino=${nino}&next=newappointmentneeded`)
    } else if (question === 'no-not-needed') {
      res.redirect(`notes?status=${status}&nino=${nino}&next=unverified-identity`)
    }
    else {
      res.redirect('error')
    }

  })

  // Have they arranged another appointment?
  app.post('/wcv5/q-arranged-another-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']
    let next = req.session.data['next']

    if (question === 'yes') {
      res.redirect(`notes?status=${status}&nino=${nino}&next=appointmentbooked`)
    } else if (question === 'no') {
      res.redirect(`notes?status=${status}&nino=${nino}&next=fta`)
    } else if (question === 'dont-know') {
      res.redirect(`notes?status=${status}&nino=${nino}&next=fta`)
    } else {
      res.redirect('error')
    }

  })

  // WITHDRAWN

  app.post('/wcv5/withdrawn-confirmation-logic', function (req, res) {

    let withdraw = req.session.data['withdraw']
    let nino = req.session.data['nino']
    let next = req.session.data['next']

    if (withdraw === 'yes') {
      res.redirect(`notes?status=withdrawn&nino=${nino}&next=withdrawn`)
    } else if (withdraw === 'no') {
      res.redirect(`claimant-overview?status=appointmentbooked&nino=${nino}`)
    } else {
      res.redirect('error')
    }
  })

  // UPLOAD IN CLERICAL FORM

  app.post('/wcv5/add-clerical-upload-evidence-logic', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let file1 = req.session.data['file-upload-1']
    let file2 = req.session.data['file-upload-2']
    let file3 = req.session.data['file-upload-3']

    let nino = req.session.data['nino']
    let early = req.session.data['early']
    let status = req.session.data['status']

    if (file3) {
      res.redirect(`add-clerical-upload-evidence?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&file3=true&filename3=${file3}&early=${early}&status=${status}`)
    } else if (file2) {
      res.redirect(`add-clerical-upload-evidence?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&early=${early}&status=${status}`)
    } else {
      if (file1) {
        res.redirect(`add-clerical-upload-evidence?nino=${nino}&file1=true&filename1=${file1}&early=${early}&status=${status}`)
      } else {
        res.redirect(`add-clerical-upload-evidence?nino=${nino}&error=true&early=${early}&status=${status}`)
      }
    }
  })

  // STATUS CHANGING

  app.post('/wcv5/status-changing', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let status = req.session.data['status']
    let nino = req.session.data['nino']
    let next = req.session.data['next']

    // Processed
    if (status === 'processed') {
      res.redirect(`notes?status=verified&nino=${nino}&next=processed`)
    // Disallowed
    } else if (status === 'disallowed') {
      res.redirect(`notes?status=verified&nino=${nino}&next=disallowed`)
    } else {
      res.redirect('error')
    }
  })

  // RESTORE CLAIM

  app.post('/wcv5/restore-claim-logic', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let status = req.session.data['status']
    let nino = req.session.data['nino']

    // Verified
    if (status === 'verified') {
      res.redirect(`notes?status=withdrawn&nino=${nino}&next=verified`)
    // Failed to attend
    } else if (status === 'fta') {
      res.redirect(`notes?status=withdrawn&nino=${nino}&next=fta`)
    // Unverified
    } else if (status === 'unverified') {
      res.redirect(`notes?status=withdrawn&nino=${nino}&next=unverified`)
    // New appointment needed
    } else if (status === 'newappointmentneeded') {
      res.redirect(`notes?status=withdrawn&nino=${nino}&next=newappointmentneeded`)
    // New appointment booked
    } else if (status === 'appointmentbooked') {
      res.redirect(`notes?status=withdrawn&nino=${nino}&next=appointmentbooked`)
    } else {
      res.redirect('error')
    }
  })

}