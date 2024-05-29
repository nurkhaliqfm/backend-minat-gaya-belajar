const {
  events,
  events_history,
  biodata_users,
  ref_school,
  ref_kode_option,
  ref_result,
} = require("../models");
const db = require("../models");

const getEvent = async (req, res) => {
  const { id } = req;
  try {
    const getUserBiodata = await biodata_users.findOne({
      where: { id_user: id },
      attributes: ["full_name", "id_school"],
    });

    const dataEvents = await events.findAll({
      where: { id_school: getUserBiodata.id_school },
      attributes: ["id", "name", "id_kode_soal"],
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

const getEventHistory = async (req, res) => {
  const { id } = req;
  const { id_event } = req.params;
  try {
    const dataEventsHistory = await events_history.findAll({
      where: { id_user: id, id_event: id_event },
      attributes: ["id"],
      include: {
        model: ref_result,
        as: "ref_result",
        attributes: ["name", "keterangan", "rekomendasi"],
      },
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Data History Event",
      data: dataEventsHistory,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data  History Event" });
  }
};

const createEventHistory = async (req, res) => {
  const { id } = req;
  const userEventResult = req.body;

  try {
    const getUserBiodata = await biodata_users.findOne({
      where: { id_user: id },
      attributes: ["full_name", "id_school"],
    });

    const dataEvents = await events.findOne({
      where: {
        id_school: getUserBiodata.id_school,
        id: userEventResult.id_event,
      },
      attributes: ["id_kode_soal"],
    });

    if (!dataEvents) {
      return res.status(400).json({
        error: "invalid_request",
        message:
          "The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.",
      });
    }

    const dataOptiontRef = await ref_kode_option.findAll({
      where: { id_kode_soal: dataEvents.id_kode_soal },
      attributes: ["id", "name"],
    });

    let userResultName = [];
    let currentScoreValue = 0;
    dataOptiontRef.forEach((item) => {
      const findOptionScore = userEventResult.selected_option.filter(
        (option) => option.id_kode_option === item.id
      );

      if (currentScoreValue < findOptionScore.length) {
        currentScoreValue = findOptionScore.length;
        userResultName = [item.name];
      } else if (currentScoreValue === findOptionScore.length) {
        currentScoreValue = findOptionScore.length;
        userResultName.push(item.name);
      }
    });

    await events_history.destroy({
      where: { id_event: userEventResult.id_event, id_user: id },
    });

    userResultName.forEach(async (item) => {
      const getResult = await ref_result.findOne({
        where: { name: item },
        attributes: ["id"],
      });

      await events_history.create({
        id_event: userEventResult.id_event,
        id_user: id,
        id_result: getResult.id,
      });
    });

    res.status(200).json({
      message: "Berhasil Menyimpan History Event User",
      event_id: userEventResult.id_event,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data Event" });
  }
};

module.exports = {
  getEvent,
  createEventHistory,
  getEventHistory,
};
