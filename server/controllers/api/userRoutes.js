const router = require('express').Router();
const User = require('../../models/User');
const Review = require('../../models/Review');
const bcrypt = require('bcrypt');
const auth = require('../../utils/Auth');


router.post('/login', async (req, res) => {
    try {
        const userDb = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (!userDb) {
            res.status(404).json({message: `A user with that email currently does not exist in the User database.
              Please use a registered email, or create and account.`});
            return;
        }
        const validPassword = userDb.checkAuth(req.body.password);
         console.log(validPassword);
         console.log(userDb.password)
        if (!validPassword) {
            res.status(404).json({message: 'Your password is incorrect. Please use a registered email, or create and account.'});
            return; 
        }
        req.session.save(() => {
            //
            req.session['loggedOnUserEmail'] = userDb.email;
            req.session['loggedOnUserID'] = userDb.id;
            req.session['loggedOnUserFirstName'] = userDb.first_name;
            req.session['loggedOnUserLastName'] = userDb.last_name;
            req.session['loggedOnUserFullName'] = userDb.first_name + " " + userDb.last_name;
            //
            //console.log(req.session['loggedOnUserEmail']);
            //console.log(req.session['loggedOnUserID']);
            //console.log(req.session['loggedOnUserFirstName']);
            //console.log(req.session['loggedOnUserLastName']);
            //console.log(req.session['loggedOnUserFullName']);
            //
            req.session.loggedIn = true;
            res.session = req.session;
            console.log("!!!!!!!!!!!!!!!!!!! UserRoute LOGON SUCCESSFUL !!!!!!!!!!!!!!!!!!!");
            res.status(200).json({message: 'Login succeeded.'});
        });
    } catch(err) {
        res.status(500).json({message: "An error occurred, please try again. If problem persists, contact us"});
    }
});


// GET all users.
router.get('/',  async (req, res) => {
  try {
    const userData = await User.findAll({
      include: { model: Review }
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET one user.
router.get('/:id',  async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: { model: Review }
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST create a new user.
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
     first_name: req.body.first_name,
     last_name: req.body.last_name,
     email: req.body.email,
     phone_number: req.body.phone_number,
     password: req.body.password,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT update a user.
router.put('/:id',  async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json({message: 'The selected user was updated.'});
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE a user.
router.delete('/:id',  async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json( {message: 'User deleted.'} );
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
