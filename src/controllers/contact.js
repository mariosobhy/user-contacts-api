const Contact = require("../models/contact");
module.exports = {
  addContact: async (req, res) => {
    const contactRequested = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNumber: req.body.mobileNumber,
      userId: req.body.userId,
      sharedUsers: req.body.sharedUsers
    };
    try {
      let contact = new Contact(contactRequested);
      await contact.save()
      res.status(201).send(contact);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getList: async (req, res) => {
    try {
      const contacts = await Contact.find({
        userId: req.body.userId
      });
      res.send(contacts);
    } catch (error) {
      res.status(500).send();
    }
  },
  getRecentList: async (req, res) => {
    try {
      const contacts = await Contact.find({
          userId: req.body.userId
        })
        .sort({
          createdAt: "desc"
        })
        .limit(5);
      res.status(200).send(contacts);
    } catch (error) {
      res.status(500).send();
    }
  },
  getSharedList: async (req, res) => {
    try {
      const contacts1 = await Contact.find({
        userId: req.body.userId,
        sharedUsers: {
          $elemMatch: {
            userId: req.body.secondUserId
          }
        }
      });

      const contacts2 = await Contact.find({
        userId: req.body.secondUserId,
        sharedUsers: {
          $elemMatch: {
            userId: req.body.userId
          }
        }
      });
      const sharedContacts = contacts1.concat(contacts2);
      res.status(200).send(sharedContacts);
    } catch (error) {
      res.status(500).send();
    }
  }
}