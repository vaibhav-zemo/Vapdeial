module.exports.home = function (req,res) {
    console.log(req.cookies);
    res.cookie('nthing',789);
    return res.render('home',{
        title : 'Home'
    });
}