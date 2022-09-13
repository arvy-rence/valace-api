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

app.listen(process.env.PORT || 8080)

// use routes
app.use("/api/events", eventsRoutes)
app.use("/api/logs", logsRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/sisterCity", sisterCityRoutes)