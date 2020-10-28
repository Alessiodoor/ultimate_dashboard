class Authentication {
	constructor(mongoose, passportLocalMongoose, findOrCreate){
		this.userSchema = new mongoose.Schema ({
			email: String,
			password: String,
			googleId: String
		});

		this.userSchema.plugin(passportLocalMongoose);
		this.userSchema.plugin(findOrCreate);

		this.User = new mongoose.model("User", this.userSchema);
	}

	getUser(){
		return this.User;
	}

	registerNewUser(username, password, passport, fn) {
		this.User.register({username: username}, password, function(err, user) {
			if(err){
				fn({err: err, message: "err"});
			}else{
				passport.authenticate("local")(req, res, function() {
					fn({err: null, message: "Registered"});
				});
			}
		});
	}
}

module.exports = Authentication;