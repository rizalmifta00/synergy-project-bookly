const User = require('../../models/user/user')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SecretKey);
const JWT = require('jsonwebtoken')


module.exports = {

    viewLogin: (req,res)=>{
        if (req.session.user == null || req.session.user == undefined) {
            res.render('auth/login')
          } else {
            res.redirect('/admin/dashboard');
          }
    },
    register: (req, res) => {
        const {username, email, password} = req.body
        const user = User({
          username,
          email,
          password: cryptr.encrypt(password),
        });
        user.save((err, result)=>{
              if (err) {
                res.send({
                  message: `Failed to get data`,
                  statusCode: 500,
                });
              }
              res.send({
                message: `Register Data Success`,
                statusCode: 200,
              });
          
        })
      },

      login: async (req, res) => {
        let DataUser = await User.findOne({
            'username': req.body.username
        }).then(response => response).catch(err => false)
        if (!DataUser) {
            res.send({
                message: "User not found",
                statusCode: 400
            })
        } else {
            let Password = cryptr.decrypt(DataUser.password)
            if (Password != req.body.password) {
                res.send({
                    message: `Wrong username or password`,
                    statusCode: 400
                })
            } else {
                let CreateToken = JWT.sign({
                        UID: DataUser._id,
                        Username: DataUser.username,
                        Email: DataUser.email,
                    },
                    process.env.SecretKey,
                    { expiresIn: '1h' }
                )
                let DataPassing = {
                    Username: DataUser.username,
                    Email: DataUser.email,
                    TokenType: 'Bearer',
                    Token: CreateToken
                }
                req.session.user = {
                    id : DataUser._id,
                    username : DataUser.username,
                }
                res.send({
                    message: `Success username or password`,
                    statusCode: 200,
                    results: DataPassing
                })
            }
    
        }
      }
}