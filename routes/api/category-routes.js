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
      {
        category_name: req.body.category_name
      }
    );

    res.send(newCat);

  } catch (err) {
      res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    const [updatedRowCount] = await Category.update(
      {
        category_name: req.body.category_name // Update category_name with the new value from request body
      },
      {
        where: {
          id: req.params.id // Condition to find the category to update by its id
        }
      }
    );

    if (updatedRowCount === 1) {
      const updatedCategory = await Category.findByPk(req.params.id); // Retrieve the updated category data
      res.json(updatedCategory); // Respond with the updated category data
    } else {
      res.status(404).json({ message: 'Category not found' }); // Handle category not found
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

  router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
     const categoryDelete= await Category.destroy({
        where: {
          id: req.params.id
        }
      })
      if(!categoryDelete){
        res.status(500).json({message:"Category Not Found"})
      }else{
        res.status(200).json({message:"Category Deleted"})
      }
  
    } catch (err) {
      console.error(err)
        res.status(500).json({message:err});
    }
  
  });


module.exports = router;
