export const getReport = (req, res) => {
	res.status(200).json({ message: "Moderator reports", user: req.user });
};
