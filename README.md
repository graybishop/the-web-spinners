
# the-web-spinners

![badge](https://img.shields.io/badge/license-MIT-green)

## Description

A fully featured web app that observes the MVC (model–view–controller) design pattern. Using the conceit of haunted locations, we provide an intuitive user experience for a user to book a cheap venue for their next party.

The application enables users to find events nearby their residence and to book an event for any type of celebration, whether it be a birthday, Bar mitzvah, wedding etc. The website allows the user to schedule an event and book a venue as per their requirements. Having selected their venue, they have now booked their destination for their spooky celebration.

## Features

### Fully Responsive Design

We've built our webpages with the mobile and desktop user in mind. Each page has been crafted with user readable designs at all common breakpoints with the help of *Tailwind CSS*, *Flexbox*, and *CSS Grid* Layout. Take your time to resize each page in your browser to see the responsive design in action.

We also provide subtle user feedback, and draw user focus using the *Animate.css* library.

### Search-bar with Smart Suggestions

Prominently featured on the page, the search bar lets a user search through the thousands of Venues in our database. With smart suggestions (provided by *autoComplete.js*) linked to the cities we have available in our system, the user is able to quickly find a Venue to host their next event.

### First Time User Experience

On the first visit to the homepage, the user is presented with a quick walk-through of the site powered by the 'lightweight library for creating step-by-step customer onboarding' *Intro.Js*. The user should feel familiar with our homepage after the introduction, and feel empowered to start using the site and booking their next event!

### Location Based Suggestions

If the user gives permission to use their location, we run a search on the homepage for them based on their city or state! We ask for the user location through the browser's *Navigator* interface, and pass that info to *OpenCage GeoCoding API* to parse the city and state from the coordinates provided.

### User Registration / User Model

For those power users, we've provide a user registration form on the site. Registered users are saved to the database through our ORM, *Sequelize* (connected through *mysql2*), models, and their password is hashed through *node.bcrypt.js*. Once registered a user may view their **User Dashboard** (dashboard detailed below), and start booking events.

### Dynamically Generated Venue Pages / Calender View

When visiting a venue page, an unregistered user is presented with a photo of the Venue, Description(provided by the venue), and reviews left by other users. The user is also presented with the option to book an event, or to save the venue. However, these functions are limited to logged in users. If they click on one of the options they are redirected to the login / register page.

A logged in user has more functionality. They are presented with a calendar that shows currently booked events, and can book events through clicking on a specific calendar date, or by clicking the book event button. They may also save the venue or leave a review

### User Dashboard

Once logged in, a user has access to their dashboard. We track loggedIn status through the Express middleware *express-session* and store our session information in our *MySQL* database through another library, *connect-session-sequelize*, keeping all pertinent user information quickly accessible for our server.

On the dashboard, the user is immediately presented with their pre-generated profile icon(Thanks to [*Unsplash Source*](https://source.unsplash.com/) for being such a simple way to pull high quality photos), their registered username and email, number of **Saved Venues**, **Booked Events**, and **Written Reviews** , and a button to reset the **First Time User Experience**. (Details on these features can be found below)

Below that they can see their **Saved Venues**, **Booked Events**, and **Written Reviews** listed below with the option to remove them.

We render the user information through a template powered by the template language *Handlebars*, in addition to the *Express Handlebars*(express-handlebars) project which provide a View Engine with the goal of standardizing folder structure, and making Handlebars and Express fun to use together. Rending this HTML server-side let's us access secure information all within the controller (like the user email), and completely removes the need for giving model access to the view.

### User's Saved Venues

Users on our site my save venues to look at later from the homepage star buttons located on every featured venue card or on specific venue pages. They can review their list of saved locations and remove items from the list on their user dashboard.

### User's Booked Events

On the venue pages, logged in users may book events through the 'book event' button on or by selecting a date on the calendar. Venue pages display events already booked at each location. Users can review their list of booked events and remove items from the list on their user dashboard.

### User's Written Reviews

Each venue page also provides a review form for a logged in user to post a new review of the location. They must choose a score from 1 to 5 stars, and may optionally add a text description. Users can see their list of written reviews and remove items from the list on their user dashboard.

## Technologies Used

- Node.js
- MySQL
- Sequelize
- Express
- Tailwind CSS Framework
- Handlebars
  
## Directions for Future Development

- Add admin dashboard
- Give user option to save profile picture
- Create location tags
- Let users add images to reviews

## License

![badge](https://img.shields.io/badge/license-MIT-green)

This application is covered by the MIT license.

## Questions?

Find us on GitHub:

- [jessicaga9410](https://github.com/Jessicaga9410)
- [graybishop](https://github.com/graybishop)
- [lazrekm](https://github.com/lazrekm)
- [sgfiles](https://github.com/sgfiles)
