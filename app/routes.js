const express = require('express')
const router = express.Router()

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

router.post('v2/status-accepted', function (req, res) {

    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  if (status === 'rejected') {
    res.redirect('v2/status-reason-for-rejection')
  }
  else {
    res.redirect('v2/status-accepted')
  }
})

module.exports = router