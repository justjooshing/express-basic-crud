const { Router } = require("express");
const { nanoid } = require("nanoid");
const router = Router();

const members = require("../../Members.json");
const writeDataToFile = require("../../utils");
//Get all members
router.get("/", (req, res) => res.json(members));

// Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === req.params.id);
  if (found) {
    res.json(members.filter((member) => member.id === req.params.id));
  } else {
    res
      .status(400)
      .send(`<h1>No member found with the id of ${req.params.id}</h1>`);
  }
});

// Create member
router.post("/", (req, res) => {
  const { name, email } = req.body;
  const newMember = {
    name,
    email,
    id: nanoid(10),
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include a name and email" });
  }

  members.push(newMember);
  writeDataToFile("./Members.json", members);
  // res.json({ msg: `New member ${newMember.name} added` });
  res.redirect("/");
});

// Update single member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === req.params.id);
  if (found) {
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id === req.params.id) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;
      }
    });
    writeDataToFile("./Members.json", members);
    res.json({ msg: "Member was updated", members });
  } else {
    res.status(400).json({
      msg: `<h1>No member found with the id of ${req.params.id}</h1>`,
    });
  }
});

// Delete single member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === req.params.id);
  if (found) {
    console.log(`found`);
    const newMembers = members.filter((member) => member.id !== req.params.id);
    writeDataToFile("./Members.json", newMembers);
    res.json({
      msg: `Member deleted`,
      members: newMembers,
    });
  } else {
    res
      .status(400)
      .send(`<h1>No member found with the id of ${req.params.id}</h1>`);
  }
});

module.exports = router;
