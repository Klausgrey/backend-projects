export const getProfile = (req, res) => {
	return res.status(200).json(req.user);
};
