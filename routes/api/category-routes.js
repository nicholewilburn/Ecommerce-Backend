const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {

    const categories = await Category.findAll(
      {
        include: [
            { model: Product}
        ]
    }
    );
    res.send(categories);

  } catch (err) {
      res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {

    const aCat = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });
    res.send(aCat);

  } catch (err) {
      res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  //create a category

  try {

    const newCat = await Category.create(
      //TODO: {???}
    );

    res.send(newCat);

  } catch (err) {
      res.status(500).json(err);
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  try {

    Category.update(
      // TODO: {???}
      {
      where: {
        id: req.params.id
      }
    })

  } catch (err) {
      res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {

    Category.destroy({
      where: {
        id: req.params.id
      }
    })

  } catch (err) {
      res.status(500).json(err);
  }

});

module.exports = router;
