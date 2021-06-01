// neem express-module en steek functionaliteit in constante
const express = require('express');

//constante aanmaken die als webserver zal dienen
const app = express();

// vertel aan webserver dat ik gebruik maak van een view engine en
//dan ook nog de welke, namelijk EJS.
app.set("views", "views");
app.set("view engine", "ejs");

// vertel aan de webserver waar de publieke bestanden zitten
app.use(express.static('public'));

// databestand inladen
const projectposts = require('./data/project.json');
const activiteitposts = require('./data/activiteit.json');
const individueelactiviteitposts = require('./data/namen.json');


// webserver luister naar GET-commando van de homepagina
app.get("/", function(request, response){
  response.render("start",{
    title: "",
    terug: "",
    terugclass: "hidden"
  });
});

app.get("/inlog", function(request, response){
  response.render("inlog",{
    title: "",
    terug: "",
    terugclass: "hidden",
    bodyclass: "header3"
  });
});

app.get("/home", function(request, response){
    response.render("home",{
      title: "home",
      terug: "",
      terugclass: "hidden",
    bodyclass: "header4"
    });
});

app.get("/activiteittoevoegen", function(request, response){
  //let data = require('./data/games.json');
    response.render("activiteittoevoegen",{
      title: "activiteit toevoegen",
      terug: "/home",
      terugclass: "",
    bodyclass: "header1"
    });
});

app.get("/activiteitbekijken", function(request, response){
  //let data = require('./data/games.json');
    response.render("activiteitbekijken",{
      title: "activiteiten bekijken",
      terug: "/home",
      posts: activiteitposts.activiteit,
      terugclass: "",
    bodyclass: "header2"
    });
});

app.get("/individueelactiviteit/:spelid", function(request, response){
  let color;
  switch (request.params.spelid) {
    case "0":
    case "4":
      color= "blue";
      break;
    case "1":
    case "5":
      color= "red";
      break;
    case "2":
    case "6":
      color= "orange";
      break;
    case "3":
    case "7":
      color= "green";
      break;

  }
  response.render("individueelactiviteit",{
      title: "activiteiten bekijken",
      terug: "/activiteitbekijken",
      spel: activiteitposts.activiteit[request.params.spelid],
      spelid: request.params.spelid,
      kinderen: individueelactiviteitposts.namen,
      terugclass: "",
      color: color,
    bodyclass: "header3"
  });
});

app.get("/evaluatiekind/:spelid/:kindid", function(request, response){
  //let data = require('./data/games.json');
  let color;
  switch (request.params.spelid) {
    case "0":
    case "4":
      color= "blue";
      break;
    case "1":
    case "5":
      color= "red";
      break;
    case "2":
    case "6":
      color= "orange";
      break;
    case "3":
    case "7":
      color= "green";
      break;

  }
    response.render("evaluatiekind",{
      title: "activiteiten bekijken",
      terug: "/individueelactiviteit/"+request.params.spelid,
      spel: activiteitposts.activiteit[request.params.spelid],
      kind: individueelactiviteitposts.namen[request.params.kindid],
      terugclass: "",
      color: color,
    bodyclass: "header4"
    });
});

app.get("/bedankt", function(request, response){
  //let data = require('./data/games.json');
    response.render("bedankt",{
      title: "Bedankt",
      terug: "/evalueren",
      terugclass: "hidden",
    bodyclass: "header1"
    });
});

app.get("/verwijderen", function(request, response){
  //let data = require('./data/games.json');
    response.render("verwijderen",{
      title: "Bedankt",
      terug: "/spelletjes",
      terugclass: "hidden",
    bodyclass: "header2"
    });
});

app.get("/bedanktactiviteit", function(request, response){
  //let data = require('./data/games.json');
    response.render("bedanktactiviteit",{
      title: "Bedankt",
      terug: "/home",
      terugclass: "hidden",
    bodyclass: "header3"
    });
});

app.get("/favorietenbekijken", function(request, response){
    response.render("favorietenbekijken",{
      title: "favorieten bekijken",
      terug: "/home",
      kinderen: individueelactiviteitposts.namen,
      terugclass: "",
    bodyclass: "header4"
    });
});

app.get("/favorietenkind/:kindid", function(request, response){
    response.render("favorietenkind",{
      title: "favorieten bekijken",
      terug: "/favorietenbekijken",
      kind: individueelactiviteitposts.namen[request.params.kindid],
      terugclass: "",
    bodyclass: "header1"
    });
});

app.get("/spelletjes", function(request, response){
    response.render("spelletjes",{
      title: "spelletjes",
      terug: "/home",
      posts: projectposts.project,
      terugclass: "",
    bodyclass: "header2"
    });
});

app.get("/speltoevoegen", function(request, response){
    response.render("speltoevoegen",{
      title: "spel toevoegen",
      terug: "/spelletjes",
      posts: projectposts.project,
      terugclass: "",
    bodyclass: "header3"
    });
});

app.get("/speluitleg/:postid", function(request, response){
  let color;
  switch (request.params.postid) {
    case "0":
    case "4":
      color= "blue";
      break;
    case "1":
    case "5":
      color= "red";
      break;
    case "2":
    case "6":
      color= "orange";
      break;
    case "3":
    case "7":
      color= "green";
      break;

  }
    response.render("speluitleg",{
      title: "speluitleg",
      terug: "/spelletjes",
      post: projectposts.project[request.params.postid],
      terugclass: "",
      color: color,
    bodyclass: "header4"
    });
});

app.use(function(request, response){
  response.statusCode = 404;
  response.render("404",{
    title: "foutmelding",
    terug: "/home",
    terugclass: ""
  });
});

// server opstarten en beschikbaar maken via URL
//app.listen(2003);
app.set('port', (process.env.PORT || 2003));
app.listen(app.get('port'), function() { });
