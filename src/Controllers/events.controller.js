import {connect, client, disconnect} from "../Utils/prismaHandler.js";
import {loggerHelper} from "../Utils/loggerHelper.js";
import {keyExcluder} from "../Utils/keyExcluder.js";

/**
 * Fetches all the events in the database in ascending ID order
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const getAllEvents = async (req, res) => {
    await connect()

    let eventsUTC8 = []

    const eventsUTC = await client.Events.findMany()

    // removes unnecessary meta info from the data and converts the date to UTC+8
    eventsUTC.forEach(event => {
        // remove unneeded fields from the object
        const optimizedEventDetails = keyExcluder(
            event,
            "date_created", "date_updated"
        )

        // push the new object and convert the date to UTC+8
        eventsUTC8.push({
            ...optimizedEventDetails,
            event_date_start: new Date(event.event_date_start).toLocaleString(),
            event_date_end: new Date(event.event_date_end).toLocaleString(),
            event_month: new Date(event.event_date_start).getMonth()+1
        })
    })

    // return optimized event details to the client as `eventsUTC8`
    res.status(200).json({
        eventsUTC8
    })

    await disconnect()
}

/**
 * Fetches a single event based on the parameter `id` passed in the URL
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const getSingleEvent = async (req, res) => {
    await connect()

    // search for the event with the specified ID
    const eventUTC = await client.Events.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    // convert the date to UTC+8
    let eventUTC8 = {
        ...eventUTC,
        event_date_start: new Date(eventUTC.event_date_start).toLocaleString(),
        event_date_end: new Date(eventUTC.event_date_end).toLocaleString(),
        event_month: new Date(eventUTC.event_date_start).getMonth()
    }

    // exclude the fields that are not needed
    eventUTC8 = keyExcluder(
        eventUTC8,
        "date_created", "date_updated"
    )

    // return optimized event details
    res.status(200).json({
        eventDetails: eventUTC8
    })

    await disconnect()
}


/**
 * Creates an event in the database and returns the created event if it is successful
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const createEvent = async (req, res) => {
    await connect()

    /**
     * Notes about entering new data:
     * -> eventDate should follow the stringified format of MM-DD-YYYY, HH:mm:SS
     */
    const {eventName, eventDescription, eventDateStart, eventDateEnd, eventLocation, eventImageLink} = req.body

    const event = await client.Events.create({
        data: {
            event_name: eventName,
            event_description: eventDescription,
            event_date_start: new Date(eventDateStart),
            event_date_end: new Date(eventDateEnd),
            event_location: eventLocation,
            event_image_link: eventImageLink,
        }
    })

    res.status(201).json({
        message: "Event created successfully",
        eventDetails: event
    })

    await loggerHelper(`Created event ${eventName} with id ${event.id}`)

    await disconnect()
}


/**
 * Updates an event based on the parameter `id` passed in the URL
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const updateEvent = async (req, res) => {
    await connect()

    // gets the parsed integer id from the URL
    const parsedId = parseInt(req.params.id)

    const {eventName, eventDescription, eventDateStart, eventDateEnd, eventLocation, eventImageLink} = req.body

    const event = await client.Events.update({
        where: {
            id: parsedId
        },
        data: {
            event_name: eventName,
            event_description: eventDescription,
            event_date_start: new Date(eventDateStart),
            event_date_end: new Date(eventDateEnd),
            event_location: eventLocation,
            event_image_link: eventImageLink,
            date_updated: new Date()
        }
    })

    await loggerHelper(`Updated event ${eventName} with id ${parsedId}`)

    res.status(200).json({
        message: "Event updated successfully",
        eventDetails: event
    })

    await disconnect()
}


/**
 * Fetches 5 events that are closest to the current date (upcoming events)
 * @param req contains the request body
 * @param res sends the response back to the client
 * @returns {Promise<void>}
 */
const getUpcomingEvents = async (req, res) => {
    await connect()

    let eventsUTC8 = []

    const eventsUTC = await client.Events.findMany({
        orderBy: {
            event_date_start: "asc"
        },
        where: {
            event_date_start: {
                gte: new Date()
            }
        },
        take: 5
    })

    eventsUTC.forEach(event => {
        // remove unneeded fields from the object
        const optimizedEventDetails = keyExcluder(
            event,
            "date_created", "date_updated"
        )

        // push the new object and convert the date to UTC+8
        eventsUTC8.push({
            ...optimizedEventDetails,
            event_date_start: new Date(event.event_date_start).toLocaleString()
        })
    })

    res.status(200).json({
        upcomingEvents: eventsUTC8
    })

    await disconnect()
}

export {getAllEvents, getSingleEvent, createEvent, updateEvent, getUpcomingEvents}