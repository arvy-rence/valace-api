import {connect, client, disconnect} from "../Utils/prismaHandler.js";
import {loggerHelper} from "../Utils/loggerHelper.js";

/**
 * Fetches all sister cities from the database
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const getAllSisterCities = async (req, res) => {
    await connect()

    const sisterCities = await client.SisterCity.findMany()

    res.status(200).json({
        sisterCities
    })

    await disconnect()
}


/**
 * Fetches a single sister city based on the `id` parameter on the URL
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
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


/**
 * Creates a new sister city record in the database and returns the newly created record
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
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


/**
 * Updates a sister city record based on the `id` parameter on the URL
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
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
            library_description: libraryDescription
            // no date updated since there is no date_updated column on the database
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