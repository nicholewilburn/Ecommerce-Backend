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
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name // Provide the tag name in the request body
    });

    res.send(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    await Tag.update(
      {
        tag_name: req.body.tag_name // Update the tag name with the new value from request body
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    const updatedTag = await Tag.findByPk(req.params.id);
    res.json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
   const tagDelete= await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!tagDelete){
      res.status(500).json({message:"Tag Not Found"})
    }else{
      res.status(200).json({message:"Tag Deleted"})
    }

  } catch (err) {
    console.error(err)
      res.status(500).json({message:err});
  }

});

module.exports = router;
