import { connect, client, disconnect } from "../Utils/prismaHandler.js";
import {keyExcluder} from "../Utils/keyExcluder.js";
import {loggerHelper} from "../Utils/loggerHelper.js";

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

export const getLatestNews = async (req, res) => {
    await connect()

    const latestNews = await client.NewsAnnouncements.findMany({
        orderBy: {
            news_date: "desc"
        },
        take: 3
    })

    res.status(200).json({
        latestNews
    })
}

export { getAllNews, getSingleNews, createNews, updateNews }