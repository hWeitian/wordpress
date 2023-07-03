const db = require("../db/models");
const { Speaker } = db;
const { Op } = require("sequelize");

const {
  getAuthAccessToken,
  updateUserInAuth,
  addUserToAuth,
  getUserFromAuth,
  deleteUserFromAuth,
} = require("../utils");

const getSpeaker = async (req, res) => {
  const { speakerId } = req.params;
  try {
    const speaker = await Speaker.findByPk(speakerId);
    return res.status(200).json(speaker);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.findAll();
    return res.status(200).json(speakers);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addSpeaker = async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    title,
    email,
    organisation,
    biography,
    photoUrl,
    isAdmin,
  } = req.body;
  try {
    const speaker = await Speaker.create({
      firstName,
      lastName,
      country,
      title,
      email,
      organisation,
      biography,
      photoUrl,
      isAdmin,
    });

    if (isAdmin) {
      const response = await addUserToAuth(firstName, email);
    }

    return res.status(200).json(speaker);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteSpeaker = async (req, res) => {
  const { speakerId } = req.params;
  const { isAdmin, email } = req.body;
  try {
    await Speaker.destroy({
      where: { id: speakerId },
    });
    if (isAdmin) {
      const userId = await getUserFromAuth(email);
      const response = await deleteUserFromAuth(userId);
    }
    return res.status(200).json("Speaker deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getSpeaker,
  getSpeakers,
  addSpeaker,
  deleteSpeaker,
};
