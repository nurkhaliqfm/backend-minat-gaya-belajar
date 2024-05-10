const { users, biodata_users } = require("../models");
const db = require("../models");
const bcrypt = require("bcrypt");

const registUser = async (req, res) => {
  let userData = req.body;
  const t = await db.sequelize.transaction();
  if (
    !userData.username ||
    !userData.password ||
    !userData.email ||
    !userData.full_name ||
    !userData.hp
  ) {
    return res.status(400).json({ message: "Permintaan Tidak Valid" });
  }

  try {
    const verifyEmail = await users.findOne({
      where: { email: userData.email },
    });

    if (!verifyEmail) {
      const createUser = await users.create(
        {
          username: userData.username,
          email: userData.email,
          password: bcrypt.hashSync(userData.password, 10),
          client_id: 2,
          role_id: 2,
        },
        { transaction: t }
      );

      await biodata_users.create(
        {
          user_id: createUser.id,
          full_name: userData.full_name,
          hp: userData.hp,
        },
        { transaction: t }
      );

      await t.commit();
      res.status(200).json({ message: "Berhasil Membuat User" });
    } else {
      await t.rollback();
      res.status(403).json({ message: "Email Telah Terdaftar" });
    }
  } catch (error) {
    await t.rollback();
    console.error("Gagal Mendapatkan Kegiatan:", error);
    res.status(400).json({ message: "Permintaan Tidak Valid" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req;
  const { userId } = req.params;
  const userData = req.body;

  if (userData.password) {
    const encryptedPassword = bcrypt.hashSync(userData.password, 10);
    userData.password = encryptedPassword;
  }

  try {
    const currentUser = await users.findOne({
      where: { id: id },
    });

    if (currentUser.role_id === 2) {
      await users.update(userData, {
        where: {
          id: userId,
        },
      });
      res.status(200).json({ message: "Berhasil Diperbaharui" });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Gagal Mendapatkan Kegiatan:", error);
    res.status(400).json({ message: "Permintaan Tidak Valid" });
  }
};

// NOTE: Admin Controller
const createAdmin = async (req, res) => {
  let userData = req.body;

  if (!userData.username || !userData.password || !userData.email) {
    return res.status(400).json({ message: "Permintaan Tidak Valid" });
  }

  try {
    const verifyEmail = await users.findOne({
      where: { email: userData.email },
    });

    if (!verifyEmail) {
      await users.create({
        username: userData.username,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10),
        client_id: 2,
        role_id: 1,
      });
      await users.create(userData);

      res.status(200).json({ message: "Berhasil Membuat User" });
    } else {
      res.status(403).json({ message: "Email Telah Terdaftar" });
    }
  } catch (error) {
    console.error("Gagal Membuat Akun:", error);
    res.status(400).json({ message: "Permintaan Tidak Valid" });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req;
  const { userId } = req.params;
  const userData = req.body;

  if (userData.password) {
    const encryptedPassword = bcrypt.hashSync(userData.password, 10);
    userData.password = encryptedPassword;
  }

  try {
    const currentUser = await users.findOne({
      where: { id: id },
    });

    if (currentUser.role_id === 1) {
      await users.update(userData, {
        where: {
          id: userId,
        },
      });
      res.status(200).json({ message: "Berhasil Diperbaharui" });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Gagal Mendapatkan Kegiatan:", error);
    res.status(400).json({ message: "Permintaan Tidak Valid" });
  }
};

const getListUser = async (req, res) => {
  const { id } = req;

  try {
    const currentUser = await users.findOne({
      where: { id: id },
    });

    if (currentUser.role_id === 1) {
      const userData = await users.findAll({
        attributes: ["id", "username", "email"],
      });
      res.status(200).json(userData);
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Gagal Mendapatkan User:", error);
    res.status(400).json({ message: "Permintaan Tidak Valid" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req;
  const { userId } = req.params;

  try {
    const currentUser = await users.findOne({
      where: { id: id },
    });

    if (currentUser.role_id === 1) {
      await users.destroy({
        where: {
          id: userId,
        },
      });

      res.status(200).json({ message: "User Berhasil Dihapus" });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Gagal Mendapatkan Kegiatan:", error);
    res.status(400).json({ message: "Permintaan Tidak Valid" });
  }
};

// Export
module.exports = {
  getListUser,
  registUser,
  updateUser,
  deleteUser,
  updateAdmin,
  createAdmin,
};