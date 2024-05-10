const { bank_soal, ref_sub_category } = require("../models");

// PU = 30 => 30 minutes
// PBM = 20 => 25 minutes
// PPU = 20 => 15 minutes
// PK = 15 => 20 minutes
// LBING = 20 => 30 minutes
// LBI = 30 => 45 minutes
// PM = 20 => 30 minutes

// Nilai Dasar 150 Points
// points * 50

const getBankSoalByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const subCategoryBankSoal = await ref_sub_category.findOne({
      where: { id: id },
    });
    const dataBankSoal = await bank_soal.findAll({
      where: { sub_category_id: id },
      attributes: [
        "id",
        "kode_soal",
        "category_id",
        "sub_category_id",
        "createdAt",
        "updatedAt",
      ],
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Data Bank Soal",
      data: { name: subCategoryBankSoal.name, soal: dataBankSoal },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data Bank Soal" });
  }
};

const getSoalById = async (req, res) => {
  const { id } = req.params;

  try {
    const dataSoal = await bank_soal.findAll({
      where: { id: id },
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Data Soal",
      data: dataSoal,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data Soal" });
  }
};

const updateSoal = async (req, res) => {
  const { id } = req.params;

  try {
    const dataSoal = await bank_soal.findAll({ where: { category_id: id } });

    res.status(200).json({
      message: "Berhasil Mendapatkan Data Soal",
      data: dataSoal,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data Soal" });
  }
};

const createSoal = async (req, res) => {
  const { id } = req.params;

  try {
    const dataSoal = await bank_soal.findAll({ where: { category_id: id } });

    res.status(200).json({
      message: "Berhasil Mendapatkan Data Soal",
      data: dataSoal,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Data Soal" });
  }
};

module.exports = {
  createSoal,
  updateSoal,
  getSoalById,
  getBankSoalByCategory,
};
