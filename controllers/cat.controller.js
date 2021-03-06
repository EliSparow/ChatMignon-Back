const Cat = require('../models/cat.model');

/*
    @desc Create a new cat entry in DB
    @methode POST
    @route /cat/
*/
exports.create = async (req, res) => {
    try {
        const { id, imageUrl } = req.body;
        const existingCat = await Cat.findOne({imageUrl: imageUrl});

        let cat = new Cat ({
            id,
            imageUrl
        });

        if(!existingCat) {
            await cat.save();

            res.status(200).json({
                msg: "Cat saved.",
                cat
            });
        } else {
            return res.status(404).json({
                msg: "This cat already exists."
            });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erreur serveur');
    }
}

/*
    @desc Get all cats
    @methode GET
    @route /cat/
*/
exports.listCats = async (req, res) => {
    try {
        const cats = await Cat.find().sort({score: -1});
        
        if(cats.length > 0) {
            res.status(200).json(cats);
        } else {
            return res.status(404).json({
                msg: "No cats found."
            });
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erreur serveur');
    }
}

/*
    @desc Get a cat by id
    @methode GET
    @route /cat/:id
*/
exports.showCat = async (req, res) => {
    try {
        const cat = await Cat.findById(req.params.id);
        
        if(cat) {
            res.status(200).json(cat);
        } else {
            return res.status(404).json({
                msg: "No cat found."
            });
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erreur serveur');
    }
}

/*
    @desc Update a cat by id
    @methode PUT
    @route /cat/:id
*/
exports.updateCat = async (req, res) => {
    try {
        const cat = await Cat.findById(req.params.id);
        const { id, imageUrl, score } = req.body;

        if(id && id != cat.id) cat.id = id;
        if(imageUrl && imageUrl != cat.imageUrl) cat.imageUrl = imageUrl;
        if(score && score != cat.score) cat.score = score;

        if(cat) {
            await cat.save();
            res.status(200).json(cat);
        } else {
            return res.status(404).json({
                msg: "No cat found."
            });
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Erreur serveur');
    }
}
