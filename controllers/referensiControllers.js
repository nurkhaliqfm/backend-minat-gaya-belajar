const {
  ref_category,
  ref_soal_type,
  ref_sub_category,
  ref_sumber_paket,
} = require("../models");

const getCategory = async (req, res) => {
  try {
    const dataKategoriSoal = await ref_category.findAll({
      attributes: ["id", "name", "kode"],
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Refernsi Kategori Soal",
      data: dataKategoriSoal,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(400)
      .json({ message: "Gagal Mendapatkan Refernsi Kategori Soal" });
  }
};

const getSoalType = async (req, res) => {
  try {
    const dataSoalType = await ref_soal_type.findAll({
      attributes: ["id", "name"],
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Refernsi Tipe Soal",
      data: dataSoalType,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Gagal Mendapatkan Refernsi Tipe Soal" });
  }
};

const getSumberPaket = async (req, res) => {
  try {
    const dataSoalType = await ref_sumber_paket.findAll({
      attributes: ["id", "name", "kode"],
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Refernsi Sumber Paket",
      data: dataSoalType,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(400)
      .json({ message: "Gagal Mendapatkan Refernsi Sumber Paket" });
  }
};

const getSubCategoryByCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    const dataSubKategoriSoal = await ref_sub_category.findAll({
      where: { category_id: id },
      attributes: ["id", "name", "kode", "jumlah", "category_id"],
    });

    res.status(200).json({
      message: "Berhasil Mendapatkan Refernsi Kategori Soal",
      data: dataSubKategoriSoal,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(400)
      .json({ message: "Gagal Mendapatkan Refernsi Kategori Soal" });
  }
};

module.exports = {
  getCategory,
  getSubCategoryByCategoryId,
  getSoalType,
  getSumberPaket,
};
