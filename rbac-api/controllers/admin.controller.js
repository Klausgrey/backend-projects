export const getDashboard = (req, res) => {
	res.json({ message: "Welcome to the admin dashboard", user: req.user });
};
