// authentication
const LocalStrategy = require('passport-local').Strategy
const User = require('./model/User')
const bcrypt = require('bcrypt')

function initialize(passport){
    const strategy = new LocalStrategy(
        async function(username, password, done){
            try{
                const user = await User.findOne({ username : username })
                if(!user){
                    return done(null, false, { message : "username"})
                }else{
                    try{
                        const passwordIsValid = await bcrypt.compare(password, user.password)
                        if(!passwordIsValid){
                            return done(null, false, { message : "password" })
                        }else{
                            return done(null, user)
                        }
                    }catch(err){
                        return done(err)
                    }
                }
            }catch(err){
                return done(err)
            }
        }
    )
    passport.use(strategy)
    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })
    passport.deserializeUser( async(id, done) => {
        const user = await User.findOne({ _id : id})
        return done(null, user)
    })
}
module.exports = initialize