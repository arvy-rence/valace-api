import {connect, client, disconnect} from "../Utils/prismaHandler.js";
import {loggerHelper} from "../Utils/loggerHelper.js";

const getAllSisterCities = async (req, res) => {
    await connect()

    const sisterCities = await client.SisterCity.findMany()

    res.status(200).json({
        sisterCities
    })

    await disconnect()
}

const getSingleSisterCity = async (req, res) => {
    await connect()

    const sisterCity = await client.SisterCity.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    res.status(200).json({
        sisterCity
    })

    await disconnect()
}

const createSisterCity = async (req, res) => {
    await connect()

    const {libraryName, address, imageLink, libraryDescription} = req.body

    const city = await client.SisterCity.create({
        data: {
            library_name: libraryName,
            address: address,
            image_link: imageLink,
            library_description: libraryDescription
        }
    })

    await loggerHelper(`Created sister city ${libraryName} with id ${city.id}`)

    res.status(201).json({
        message: "Sister City Record created successfully",
        cityDetails: city
    })

    await disconnect()
}

const updateSisterCity = async (req, res) => {
    await connect()

    const parsedId = parseInt(req.params.id)

    const {libraryName, address, imageLink, libraryDescription} = req.body

    const city = await client.SisterCity.update({
        where: {
            id: parsedId
        },
        data: {
            library_name: libraryName,
            address: address,
            image_link: imageLink,
            library_description: libraryDescription,
            date_updated: new Date()
        }
    })

    await loggerHelper(`Updated sister city ${libraryName} with id ${parsedId}`)

    res.status(200).json({
        message: "Sister City Record updated successfully",
        cityDetails: city
    })

    await disconnect()
}

export {getAllSisterCities, getSingleSisterCity, createSisterCity, updateSisterCity}