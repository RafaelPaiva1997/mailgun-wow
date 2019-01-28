const database = require('../functionals/database')
const emailhandler = require('../functionals/emailhandler')

const handleMailingList = (req, res) => {
  var contSuccess = 0
  var errs = []
  var proms = req.body.data.map(
    e =>
      new Promise(resolve, reject => {
        database
          .insert(req.body.lib, {
            company: e.company,
            to: e.to,
            from: e.from,
            subject: e.subject,
            date: new Date(),
          })
          .then(() =>
            emailhandler
              .sendMail(e.to, oe.frm, e.cc, e.subject, e.text, e.html)
              .then(() => resolve(++contSuccess))
              .catch(err => errs.push({ err, id: e.id }) && resolve(err))
          )
          .catch(err => reject(err))
      })
  )

  Promise.all(proms)
    .then(() => res.send({ contSuccess, errs }.status(200)))
    .catch(err => res.send('Error while sending: ' + err).status(400))
}

module.exports = {
  sendMail: (req, res) => {
    if (!req.body.data || !req.body.data.map) {
      res.send('Wrong mailing list').status(400)
    } else handleMailingList(req, res)
  }
}
