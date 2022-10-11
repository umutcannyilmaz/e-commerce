const Card = require("../models/Card");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCard = new Card(req.body);

  try {
    const savedCard = await newCard.save();
    res.status(200).json(savedCard);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json("Card has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER Card
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Card = await Card.findOne({ userId: req.params.userId });
    res.status(200).json(Card);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Cards = await Card.find();
    res.status(200).json(Cards);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;