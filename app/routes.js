var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

const express = require('express')
const router = express.Router()
const config = require('./config')

// Add your routes here - above the module.exports line

// Commitments for different Disability Confident levels

router.post('v2/dc-commitments-level-1', function (req, res) {

    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

  let dcLevel = req.session.data['dc-level']

  if (dcLevel === 'level-2') {
    res.redirect('v2/dc-commitments-level-2')
  }
  if (dcLevel === 'level-3') {
    res.redirect('v2/dc-commitments-level-3')
  } 
  else {
    res.redirect('v2/dc-commitments-level-1')
  }
})

// Change registration status

// router.post('v2/status-accepted', function (req, res) {

//     // Get the answer from session data
//     // The name between the quotes is the same as the 'name' attribute on the input elements
//     // However in JavaScript we can't use hyphens in variable names

//   let status = req.session.data['status']

//   if (status === 'rejected') {
//     res.redirect('v2/status-reason-for-rejection')
//   }
//   else {
//     res.redirect('v2/status-accepted')
//   }
// })

// Notify routes

router.post('/v2/status', function (req, res) {

console.log('req.session.data[status]', req.session.data);
  
  
  // let status = req.body.statusAccepted;
  let status = req.session.data['status']
  if (status === 'rejected') {
    notify.sendEmail(
      // this long string is the template ID, copy it from the template
      // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
      // in your code.
      '9d037de7-f79c-42f1-9c67-2535dce0d170',
      // pulls 'emailAddress' variable set in the config file
      config.emailAddress
    );
    res.redirect('/v2/status-reason-for-rejection')
  }
  else {
    notify.sendEmail(
      // this long string is the template ID, copy it from the template
      // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
      // in your code.
      'b4c3fc3e-c05d-4865-aa5f-a520fc0deab1',
      // pulls 'emailAddress' variable set in the config file
      config.emailAddress
    );
    res.redirect('/v2/status-accepted')
  }
});

module.exports = router