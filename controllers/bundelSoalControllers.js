const {
  events,
  bundle_soal,
  biodata_users,
  bank_soal,
  bundle_option,
} = require("../models");

var Sequelize = require("sequelize");

const getBundelSoalByEvent = async (req, res) => {
  const { id } = req;
  const { kode_event } = req.params;
  try {
    const getUserBiodata = await biodata_users.findOne({
      where: { id_user: id },
      attributes: ["full_name", "id_school"],
    });

    const dataEvents = await events.findOne({
      where: { id_school: getUserBiodata.id_school, id: kode_event },
      attributes: ["name"],
      include: {
        model: bundle_soal,
        as: "bundle_soal",
        attributes: ["id", "id_event"],
        include: {
          model: bank_soal,
          as: "bank_soal",
          attributes: ["id", "soal", "id_kode_soal"],
          include: {
            model: bundle_option,
            as: "bundle_option",
            attributes: ["id", "id_soal", "name", "id_kode_option"],
          },
        },
      },
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Data Event",
      data_bundle_soal: dataEvents,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data Event" });
  }
};

module.exports = {
  getBundelSoalByEvent,
};
