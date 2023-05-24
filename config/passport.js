const passport = require("passport");
const UserModel = require("../models/database");
const { compareSync } = require("bcrypt");
const InstagramStrategy = require("passport-instagram").Strategy;
const dotenv = require("dotenv");
dotenv.config();

// passport.use(new instagramStrategy({
//   clientID: "CLIENT_ID",
//   clientSecret: "CLIENT_SECRET",
//   callbackURL: "/auth/instagram/callback",
// },
// function(accessToken, refreshToken, profile, done) {
//   console.log(accessToken, profile);
//   // UserModel.findOrCreate({ instagramId: profile.id }, function (err, user) {
//   //   return done(err, user);
//   // });
//   UserModel.findOne({instagramID : profile.id}, (err, user) => {
//     if(err) return done(err, null);
//     if(!user) {
//       let newUser = new UserModel({
//         instagramID : profile.id,
//         name : profile.displayName
//       })
//       newUser.save()
//       return done(null, newUser);
//     }else {
//       return done(null, user);
//     }
//   });
// }
// ));

passport.use(new InstagramStrategy({
  clientID: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ instagramId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));

  //Persits user data inside session.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });


  //Fetches Session details using session id.
  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
  });






