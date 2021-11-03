const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };

 const formatDate = (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  }

module.exports = {withAuth, formatDate}