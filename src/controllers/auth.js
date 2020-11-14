import User from '../models/user';

export const getAuth = (req, res, next) => {

    User.find({ _id: "5fae8d026d78c61ea0d2d7b3" })
        .then(user => {
            // console.log(user);
            res.json({
        
                success: true,
                user
            })
        });
    
}

export const postLogIn = (req, res, next) => {

    req.session.isLoggedIn = true;

    res.json({
        success: true,
        msg: 'Inicio de session!',
        session: req.session
    });
}

export const postLogOut = (req, res, next) => {

    // req.session.destroy((err) => {
    //     // You action here
    //     // res.redirect('/')
    //     console.log(err);
    // });
    res.json({
        success: true,
        msg: 'Cerrando session!',
        session: req.session
    })
}
