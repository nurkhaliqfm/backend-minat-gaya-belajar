const { ref_event } = require("../models");

const getEventTryout = async (req, res) => {
  try {
    const dataEventsTryout = await ref_event.findAll();

    res.status(200).json({
      message: "Berhasil Mendapatkan Data Event Tryout",
      data: dataEventsTryout,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data Event Tryout" });
  }
};

module.exports = {
  getEventTryout,
};
