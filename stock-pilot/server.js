import app from './app.js'
import "dotenv/config.js"
app.listen(process.env.PORT || 5000, () => {console.log('server is running...')})