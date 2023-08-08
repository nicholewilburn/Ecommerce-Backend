const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {

    const tags = await Tag.findAll(
      {
        include: [
            { model: Product}
        ]
    }
    );
    res.send(tags);

  } catch (err) {
      res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {

    const aTag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });
    res.send(aTag);

  } catch (err) {
      res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag

  try {

    const newTag = await Tag.create(
      //TODO: {???}
    );

    res.send(newTag);

  } catch (err) {
      res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  try {

    Tag.update(
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

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  try {

    Tag.destroy({
      where: {
        id: req.params.id
      }
    })

  } catch (err) {
      res.status(500).json(err);
  }

});

module.exports = router;
