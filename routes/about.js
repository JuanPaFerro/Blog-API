const router = require("express").Router();
const About = require("../models/About");

router.post("/", async (req, res) => {
  const newAbout = new About(req.body);
  try {
    const savedAbout = await newAbout.save();
    res.status(200).json(savedAbout);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAbout);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.status(200).json("Project has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
