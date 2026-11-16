export function validator(schema) {
	return (req, res, next) => {
		const { error, value } = schema.validate(req.body, {
			stripUnknown: true,
			abortEarly: false,
		});

		if (error)
			return res.status(422).json({
				message: "validation error",
				details: error.details.map((err) => err.message),
			});

		req.body = value;
		next();
	};
}
