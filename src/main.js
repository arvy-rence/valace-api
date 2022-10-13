import cors from "cors"
import express from "express"

// app routes
import {eventsRoutes} from "./Routes/events.routes.js";
import {logsRoutes} from "./Routes/logs.routes.js";
import {newsRoutes} from "./Routes/news.routes.js";
import {sisterCityRoutes} from "./Routes/sisterCity.routes.js";
import {topnotchersRoutes} from "./Routes/topnotchers.routes.js";

// utils
import {wake} from "./Utils/wake.js";

// initialize app
const app = express()

// use middleware
app.use(cors())
app.use(express.json())

// wake the api in predetermined intervals
wake()

// listen to a specific port and run the server
app.listen(process.env.PORT || 8090, () => {
    console.log(`Server running on port ${process.env.PORT || 8090}`)
})

// use routes

// main route - shows info about the api along the technologies used to make this api and related projects
app.get("/api", (req, res) => {
    res.status(200).json({
        title: "ValACE Web API",
        version: "1.0.0",
        description: "This is a customized API built for interfacing with the ValACE Web App and the ValACE Single Page App.",
        developers: [
            {
                name: "Jon Arvy Enriquez",
            },
            {
                name: "Clarence Rhey Salaveria",
            },
        ],
        technologies: {
            nodeDependencies: [
                {
                    name: "Node.js",
                    version: "14.17.0"
                },
                {
                    name: "Express.js",
                    version: "4.18.1"
                },
                {
                    name: "Prisma",
                    version: "4.4.0"
                },
                {
                    name: "Axios",
                    version: "0.27.2"
                },
                {
                    name: "CORS",
                    version: "2.8.5"
                },
                {
                    name: "moment.js",
                    version: "2.29.4"
                }
            ],
            mainWebsiteFrontend: [
                {
                    name: "Nuxt3 JS",
                    version: "3RC"
                },
                {
                    name: "Tailwind CSS",
                    version: "3.1.8"
                },
                {
                    name: "Flowbite via CDN",
                    version: "1.5.3"
                },
                {
                    name: "Font Awesome via CDN",
                    version: "6.1.2"
                },
            ],
            spaWebsiteFrontend: [
                {
                    name: "Nuxt3 JS",
                    version: "3.0.0-rc.8"
                },
                {
                    name: "Tailwind CSS",
                    version: "3.1.8"
                },
                {
                    name: "Flowbite via CDN",
                    version: "1.5.3"
                },
                {
                    name: "Font Awesome via CDN",
                    version: "6.1.2"
                },
            ],
            backendSolutions: [
                {
                    name: "MySQL via PlanetScale",
                    link: "https://planetscale.com/"
                },
                {
                    name: "Heroku for server hosting",
                    link: "https://www.heroku.com/"
                },
            ],
            developmentTools: [
                {
                    name: "WebStorm",
                    link: "https://www.jetbrains.com/webstorm/"
                },
                {
                    name: "Postman",
                    link: "https://www.postman.com/"
                },
                {
                    name: "Datagrip",
                    link: "https://www.jetbrains.com/datagrip/"
                },
                {
                    name: "Github",
                    link: "https://www.github.com"
                }
            ]
        }
    })
})

// describes the routes for the events and the baseURL for the events
app.use("/api/events", eventsRoutes)

// describes the routes for the logs and the baseURL for the logs
app.use("/api/logs", logsRoutes)

// describes the routes for the news and the baseURL for the news
app.use("/api/news", newsRoutes)

// describes the routes for the sister cities and the baseURL for the sister cities
app.use("/api/sisterCity", sisterCityRoutes)

// describes the routes for the topnotchers and the baseURL for the topnotchers
app.use("/api/topnotchers", topnotchersRoutes)