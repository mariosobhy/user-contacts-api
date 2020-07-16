const Contact = require("../models/contact");
const handleRespone = (status, message, data, res) => {
  res.status(status).send({
    statusCode: status,
    message: message,
    data: data
  });
}
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
      handleRespone(201, "Contact created successfully.", contact, res);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getList: async (req, res) => {
    try {
      const contacts = await Contact.find({
        userId: req.body.userId
      });
      handleRespone(200, "Contatcs retrieved successfully.", contacts, res);
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
      handleRespone(200, "Recent contatcs retrieved successfully.", contacts, res);
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
      handleRespone(200, "Shared contatcs retrieved successfully.", sharedContacts, res);
    } catch (error) {
      res.status(500).send();
    }
  }
}