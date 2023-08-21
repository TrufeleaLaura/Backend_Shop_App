import UserModel from "../model/user.js";
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
};
