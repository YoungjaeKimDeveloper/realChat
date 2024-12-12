import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    console.log(loggedInUserId);
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    // Filtered된 User정보 던져주기
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myID = req.user._id;
    // :으로 별명 넣어주기
    const { id: userToChatId } = req.params;
    // 주고 받고 한걸 넣어주면된다.
    const messages = await Message.find({
      // 데이터 베이스에서 데이터 찾아주기
      $or: [
        { senderID: myID, receiverID: userToChatId },
        { senderID: userToChatId, receiverID: myID },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getUsersForSidebar", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receivedrID } = req.params;

    const senderID = req.user._id;

    let imageUrl;
    if (image) {
      //Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderID: senderID,
      receivedrID: receivedrID,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();
    return res.status(201).json(newMessage);
    // TODO: realtime functionality goes here => socket.io
  } catch (error) {
    console.error("Error in Sending Message", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
