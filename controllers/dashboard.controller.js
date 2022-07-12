const home = (req,res) => {
    res.json({
        error: null,
        data: { 
            title: 'Esta es una ruta protegida',
            user: req.user
        }
    })
}

module.exports = {
    home
}