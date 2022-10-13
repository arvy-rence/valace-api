import {client, disconnect, connect} from "../Utils/prismaHandler.js";
import {loggerHelper} from "../Utils/loggerHelper.js";
import {keyExcluder} from "../Utils/keyExcluder.js";

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
        recentTopnotchers: topnotchers
    })

    await disconnect()
}

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