import { connect, client, disconnect } from "../Utils/prismaHandler.js";
import {keyExcluder} from "../Utils/keyExcluder.js";
import {loggerHelper} from "../Utils/loggerHelper.js";

/**
 * Fetches all news articles from the database
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const getAllNews = async (req, res) => {
    await connect()

    let newsUTC8 = []

    const newsUTC = await client.NewsAnnouncements.findMany()
    
    newsUTC.forEach(news => {
        // remove unneeded fields from the object
        const optimizedNewsDetails = keyExcluder(
            news,
            "date_created", "date_updated"
        )

        // push the new object and convert the date to UTC+8
        newsUTC8.push({
            ...optimizedNewsDetails,
            news_date: new Date(news.news_date).toLocaleString()
        })
    })

    res.status(200).json({
        newsUTC8
    })

    await disconnect()
}

/**
 * Fetch a single news article based on the `id` parameter on the URL
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const getSingleNews = async (req, res) => {
    await connect()

    const newsUTC = await client.NewsAnnouncements.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    let newsUTC8 = {
        ...newsUTC,
        news_date: new Date(newsUTC.news_date).toLocaleString()
    }

    newsUTC8 = keyExcluder(
        newsUTC8,
        "date_created", "date_updated"
    )

    res.status(200).json({
        newsDetails: newsUTC8
    })

    await disconnect()
}


/**
 * Creates a new news article in the database and returns the newly created news article if successful
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const createNews = async (req, res) => {
    await connect()

    /**
     * Notes about entering new data:
     * -> newsDate should follow the stringified format of MM-DD-YYYY, HH:mm:ss
     */
    const {newsTitle, newsDescription, newsDate, newsImageLink} = req.body

    const news = await client.NewsAnnouncements.create({
        data: {
            news_title: newsTitle,
            news_description: newsDescription,
            news_date: new Date(newsDate),
            news_image_link: newsImageLink
        }
    })

    res.status(201).json({
        message: "News created successfully",
        newsDetails: news
    })

    await loggerHelper(`Created news article ${newsTitle} with id ${news.id}`)

    await disconnect()
}


/**
 * Updates a news article based on the `id` parameter on the URL
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const updateNews = async (req, res) => {
    await connect()

    const parsedId = parseInt(req.params.id)

    const {newsTitle, newsDescription, newsDate, newsImageLink} = req.body

    const news = await client.NewsAnnouncements.update({
        where: {
            id: parsedId
        },
        data: {
            news_title: newsTitle,
            news_description: newsDescription,
            news_date: new Date(newsDate),
            news_image_link: newsImageLink,
            date_updated: new Date()
        }
    })

    await loggerHelper(`Updated event ${newsTitle} with id ${parsedId}`)

    res.status(200).json({
        message: "News updated successfully",
        newsDetails: news
    })

    await disconnect()
}


/**
 * Fetches the 3 latest news articles from the database
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
export const getLatestNews = async (req, res) => {
    await connect()

    const latestNews = await client.NewsAnnouncements.findMany({
        orderBy: {
            news_date: "desc"
        },
        take: 3
    })

    let newsUTC8 = []

    latestNews.forEach(news => {
        // remove unneeded fields from the object
        const optimizedNewsDetails = keyExcluder(
            news,
            "date_created", "date_updated"
        )

        // push the new object and convert the date to UTC+8
        newsUTC8.push({
            ...optimizedNewsDetails,
            news_date: new Date(news.news_date).toLocaleString()
        })
    })

    res.status(200).json({
        latestNews: newsUTC8
    })
}

export { getAllNews, getSingleNews, createNews, updateNews }