import app from './app.js'
import { connectDB } from './config/db.js'
import 'dotenv/config'
const PORT = process.env.PORT || 3000

const start = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Server corriendo en puerto ${PORT}`)
        console.log('MONGO_URI:', process.env.MONGO_URI)

    })
}


start()