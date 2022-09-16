import cors from "cors"
import express from "express"

// app routes
import {eventsRoutes} from "./Routes/events.routes.js";
import {logsRoutes} from "./Routes/logs.routes.js";
import {newsRoutes} from "./Routes/news.routes.js";
import {sisterCityRoutes} from "./Routes/sisterCity.routes.js";

// initialize app
const app = express()

// use middleware
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

// use routes
app.get("/api", (req, res) => {
    res.status(200).json({
        title: "ValACE Web API",
        version: "1.0.0",
        description: "This is a customized API built for interfacing with the ValACE Web App and the ValACE Single Page App.",
        developers: [
            {
                name: "Jon Arvy Enriquez",
                email: "jonarvy11@gmail.com"
            },
            {
                name: "Clarence Rhey Salaveria",
                email: "rencesalaveria@outlook.com"
            },
        ],
    })
})

app.use("/api/events", eventsRoutes)
app.use("/api/logs", logsRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/sisterCity", sisterCityRoutes)