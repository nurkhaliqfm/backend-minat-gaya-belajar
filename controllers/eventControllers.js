const { events, biodata_users, ref_school } = require("../models");

const getEvent = async (req, res) => {
  const { id } = req;
  try {
    const getUserBiodata = await biodata_users.findOne({
      where: { id_user: id },
      attributes: ["full_name", "id_school"],
    });

    const dataEvents = await events.findAll({
      where: { id_school: getUserBiodata.id_school },
      attributes: ["name"],
      include: {
        model: ref_school,
        as: "ref_school",
        attributes: ["name"],
      },
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Data Event",
      data: dataEvents,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data Event" });
  }
};

module.exports = {
  getEvent,
};
