const UserModel = require('../../models/user/user');
const CheckBody = require('../../module/CheckBody')
const JWT = require('jsonwebtoken')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SecretKey);

exports.All = (req, res) => {
    UserModel.find().then(response => {
        res.send({
            message: `Successfull to get data`,
            statusCode: 200,
            results: response
        })
    }).catch(err => {
        res.send({
            message: `Failed to get data`,
            statusCode: 500,
        })
    })
}
exports.Create = async (req, res) => {
    if (!req.body) {
        res.send(400)
    }
    //    let DataFind= await UserModel.findOne({'username':req.body.usernama}).then(response=>false).catch(arr => true)
    //    if(DataFind)

    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: cryptr.encrypt(req.body.password),
    })


    newUser.save(newUser).then(response => {
        res.send({
            message: `Successfull to create data`,
            statusCode: 200,
            results: response
        })
    }).catch(err => {
        res.send({
            message: `Failed to create data`,
            statusCode: 500
        })
    })
}
exports.update = async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: "User Not Found"
                });
            }
            res.send({
                message: "success update user",
            })
        })
        .catch((err) => {
            res.status(409).send({
                message: "error update user"
            })
        })
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    UserModel.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(409).send({
                message: err.message
            })
        })
}

exports.Delete = (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndRemove(id)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: "User not found"
                })
            }
            res.send({
                message: "Success delete user"
            })
        }).catch((err) => {
            res.status(409).send({
                message: err.message,
            })
        })
}
exports.DeleteOne = (req, res) => {
    if (!req.body) {
        res.send({
            message: "failed to delete data",
            statusCode: 400
        })
    }
    UserModel.deleteOne({
            "_id": req.body.id
        })
        .then(response => {
            res.send({
                message: "Success delete data",
                statusCode: 200
            }).catch(err => {
                res.send({
                    message: "failed delete data"
                })
            })
        })
}
exports.Login = async (req, res) => {
    let DataUser = await UserModel.findOne({
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
            res.send({
                message: `Success username or password`,
                statusCode: 200,
                results: DataPassing
            })
        }

    }
}
exports.LoginPost = async (req, res) => {
    let DataUser = await UserModel.findOne({
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
            res.redirect('/')
        }
    }
}
