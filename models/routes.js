//export the 
module.exports = function(app, passport) {

// Homepage 

    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
      //  console.log(req.cookies);
       // console.log(req.signedCookies);
        //console.log(req.session);
    });

   
    // showing the login form

    app.get('/login', function(req, res) {

        // render the page and pass in any flash msg that has been defined
        res.render('login.ejs',{ message: req.flash('loginMessage') }); 
    });


//once user enters the details and logs in, the details must be sent to the database to check
    // process the login form
    // app.post('/login', all our passport stuff will happen here);

  app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the profile page
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages tp be displayed
    }));
   

    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash msg that has been displayed
        res.render('signup.ejs',{ message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', all our passport stuff happens here);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the user's profile page
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages to be displayed
    }));

     
    // you have to be logged in to visit the /profile page. use isLoggedIn

    // use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session (req.user) and pass to template along with the page
        });
    });

    //logout 
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to check if the user is logged in or not
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, go to next route.
    if (req.isAuthenticated())
        return next();

    // if user isn't authenticated redirect him back to the homepage
    res.redirect('/');
}