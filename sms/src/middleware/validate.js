function validate(schema) {
	return (req, _res, next) => {
		const { error } = schema.validate(req.body);
		next();
	};
}

export default validate
