import {client, disconnect, connect} from "../Utils/prismaHandler.js";
import {loggerHelper} from "../Utils/loggerHelper.js";
import {keyExcluder} from "../Utils/keyExcluder.js";

/**
 * Fetches all topnotchers in the database
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const getAllTopnotchers = async (req, res) => {
    await connect()

    let optimizedTopnotchers = []

    const topnotchers = await client.Topnotchers.findMany()

    topnotchers.forEach(topnotcher => {
        optimizedTopnotchers.push(keyExcluder(
            topnotcher,
            "date_created", "date_updated"
        ))
    })

    res.status(200).json({
        topnotchersDetail: optimizedTopnotchers
    })

    await disconnect()
}


/**
 * Fetches the three latest topnotchers based on the date uploaded
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const getThreeLatestTopnotchers = async (req, res) => {
    await connect()

    let optimizedTopnotchers = []

    const topnotchers = await client.Topnotchers.findMany({
        take: 3,
        orderBy: {
            date_uploaded: "desc"
        }
    })

    topnotchers.forEach(topnotcher => {
        optimizedTopnotchers.push(keyExcluder(
            topnotcher,
            "date_created", "date_updated"
        ))
    })

    res.status(200).json({
        recentTopnotchers: optimizedTopnotchers
    })

    await disconnect()
}


/**
 * Creates a topnotcher record in the database and returns it if it is successful
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const createTopnotcher = async (req, res) => {
    await connect()

    const {topnotcherName, topnotcherTitle, dateUploaded, imageLink} = req.body

    const topnotcher = await client.Topnotchers.create({
        data: {
            topnotcher_name: topnotcherName,
            topnotcher_title: topnotcherTitle,
            date_uploaded: new Date(dateUploaded),
            image_link: imageLink
        }
    })

    res.status(201).json({
        message: "Topnotcher created successfully",
        topnotcherDetails: topnotcher
    })

    await loggerHelper(`Created topnotcher ${topnotcherName} with id ${topnotcher.id}`)

    await disconnect()
}


/**
 * Updates a topnotcher record based on the `id` parameter on the URL
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const updateTopnotcher = async (req, res) => {
    await connect()

    const parsedId = parseInt(req.params.id)

    const {topnotcherName, topnotcherTitle, dateUploaded, imageLink} = req.body

    const topnotcher = await client.Topnotchers.update({
        where: {
            id: parsedId
        },
        data: {
            topnotcher_name: topnotcherName,
            topnotcher_title: topnotcherTitle,
            date_uploaded: new Date(dateUploaded),
            image_link: imageLink
        }
    })

    await loggerHelper(`Updated topnotcher ${topnotcherName} with id ${parsedId}`)

    res.status(200).json({
        message: "Topnotcher updated successfully",
        topnotcherDetails: topnotcher
    })

    await disconnect()
}

export {getAllTopnotchers, getThreeLatestTopnotchers, createTopnotcher, updateTopnotcher}