import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;

    await Address.create({
      ...address,
      userId
    });

    return res.status(201).json({
      success: true,
      message: "Address added successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add address",
      error: error.message
    });
  }
};
