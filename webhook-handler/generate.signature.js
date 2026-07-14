import crypto from "node:crypto";
import "dotenv/config"


const secret = process.env.WEBHOOK_KEY;
const payload = JSON.stringify({
	event: "payment.success",
	payload: { amount: 5000, currency: "NGN" },
	source: "stripe",
	verified: false,
});

const signature = crypto
	.createHmac("sha256", secret)
	.update(payload)
	.digest("hex");
console.log(signature);
