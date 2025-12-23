import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body.payload;

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

export const getAddress = async (req, res) => {

  try {
    const {userId} = req.body
    const addressses = await Address.find({userId})
    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      addressses
    });
  } catch (error) {
     console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add address",
      error: error.message
    });
  }
}
