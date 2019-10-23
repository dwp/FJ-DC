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

  // WORK COACH V1

  // Destroy the session after coming back to the home screen
  
  app.get('/wcv1/home', function (req, res) {
    req.session.destroy()
    res.render('wcv1/home')
  })

  app.post('/wcv1/search-entry', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let search = req.session.data['search']
    let part2 = req.session.data['part2']

    // Barney Rubble
    if (search === 'QQ 11 11 11 Z' || search === 'QQ111111Z' || search === 'barney rubble' || search === 'Barney Rubble' || search === 'barney' || search === 'Barney' || search === 'rubble' || search === 'Rubble'){
      res.redirect('claimant?nino=QQ111111Z&status=appointmentbooked&ssp1=true&fitnotes=true&pension=true')
    // Clark Kent
    } else if (search === 'QQ 11 22 33 A' || search === 'QQ112233A' || search === 'clark kent' || search === 'Clark Kent' || search === 'clark' || search === 'Clark' || search === 'kent' || search === 'Kent') {
      res.redirect('claimant?nino=QQ112233A&status=appointmentbooked&sr=true&ssp1=true&fitnotes=true')
    // Buzz Lightyear
    } else if (search === 'QQ000011A' || search === 'QQ000011A' || search === 'buzz lightyear' || search === 'Buzz Lightyear' || search === 'buzz' || search === 'Buzz' || search === 'lightyear' || search === 'Lightyear') {
      res.redirect('claimant?nino=QQ000011A&status=appointmentbooked&sr=true&ssp1=true&fitnotes=true')
    // Lois Lane
    } else if (search === 'QQ 11 11 22 B' || search === 'QQ111122B' || search === 'lois lane' || search === 'Lois Lane' || search === 'lois' || search === 'Lois' || search === 'lane' || search === 'Lane') {
      res.redirect('claimant?nino=QQ111122B&status=appointmentbooked&fitnotes=true&pension=true')
    // Micky Mouse
    } else if (search === 'QQ 11 22 33 Z' || search ==='QQ112233Z' || search === 'micky mouse' || search === 'Micky Mouse' || search === 'micky' || search === 'Micky' || search === 'mouse' || search === 'Mouse') {
      if (part2 === 'QQ112233Z') {
        res.redirect('claimant?nino=QQ112233Z&status=newappointmentneeded&ssp1=true&fitnotes=true&pension=true')
      } else {
        res.redirect('claimant?nino=QQ112233Z&status=appointmentbooked&ssp1=true&fitnotes=true&pension=true')
      }
    // Marge Simpson
    } else if (search === 'QQ 23 12 34 Z' || search ==='QQ231234Z' || search === 'marge simpson' || search === 'Marge Simpson' || search === 'marge' || search === 'Marge' || search === 'simpson' || search === 'Simpson') {
      if (part2 === 'QQ231234Z') {
        res.redirect('claimant?nino=QQ231234Z&status=newappointmentneeded&ssp1=true&fitnotes=true&pension=true')
        } else {
        res.redirect('claimant?nino=QQ231234Z&status=appointmentbooked&ssp1=true&fitnotes=true&pension=true')
      }
    // Lex Luther
    } else if (search === 'QQ 00 11 22 A' || search ==='QQ001122A' || search === 'lex luther' || search === 'Lex Luther' || search === 'lex' || search === 'Lex' || search === 'luther' || search === 'Luther') {
      if (part2 === 'QQ001122A') {
        res.redirect('claimant?nino=QQ001122A&status=verified&ssp1=true&fitnotes=true')
        } else {
        res.redirect('claimant?nino=QQ001122A&status=appointmentbooked&ssp1=true&fitnotes=true')
      }
    // Fred Flintstone
    } else if (search === 'QQ 11 22 33 B' || search ==='QQ112233B' || search === 'fred flintstone' || search === 'Fred Flintstone' || search === 'fred' || search === 'Fred' || search === 'flintstone' || search === 'Flintstone') {
      res.redirect('claimant?nino=QQ112233B&status=appointmentbooked&ssp1=true')

    // Homer Simpson
    } else if (search === 'QQ 11 22 33 C' || search ==='QQ112233C' || search === 'homer simpson' || search === 'Homer Simpson' || search === 'homer' || search === 'Homer' || search === 'simpson' || search === 'Simpson') {
      res.redirect(`multiple-results-homer?nino=QQ112233C&status=appointmentbooked&ssp1=true&ssp1=true&fitnotes=true&pension=true&searchterm=${search}`)

    // Minnie Mouse
    } else if (search === 'QQ 01 01 01 A' || search ==='QQ010101A' || search === 'minnie mouse' || search === 'Minnie Mouse' || search === 'minnie' || search === 'Minnie' || search === 'mouse' || search === 'Mouse') {
      res.redirect(`multiple-results-minnie?nino=QQ010101A&status=appointmentbooked&ssp1=true&ssp1=true&fitnotes=true&searchterm=${search}`)
    } else if (search === '') {
      res.redirect(`home?error=empty`)
    } else {
      res.redirect(`search-not-found?searchterm=${search}`)
    }

  })

  app.post('/wcv1/status-changing', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let status = req.session.data['status']

    let nino = req.session.data['nino']

    let early = req.session.data['early']

    if (status === 'verified') {
      res.redirect(`upload?status=appointmentbooked&nino=${nino}&early=${early}`)
    } else if (status === 'newappointmentneeded') {
      res.redirect(`status-confirmation?status=newappointmentneeded&nino=${nino}&early=${early}`)
    } else if (status === 'withdrawn') {
      res.redirect(`status-confirmation?status=withdrawn&nino=${nino}&early=${early}`)
    } else if (status === 'appointmentbooked') {
      res.redirect(`status-confirmation?status=appointmentbooked&nino=${nino}&early=${early}`)
    } else {
      res.redirect('error')
    }
  })

  app.post('/wcv1/upload-logic', function (req, res) {
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
      // res.redirect(`yabba`)
      res.redirect(`upload?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&file3=true&filename3=${file3}&early=${early}&status=${status}`)
    } else if (file2) {
      res.redirect(`upload?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&early=${early}&status=${status}`)
    } else {
      if (file1) {
        res.redirect(`upload?nino=${nino}&file1=true&filename1=${file1}&early=${early}&status=${status}`)
      } else {
        res.redirect(`upload?nino=${nino}&error=true&early=${early}&status=${status}`)
      }
    }
  })

  // END OF WORK COACH V1

}