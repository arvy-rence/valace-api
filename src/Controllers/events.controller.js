import {connect, client, disconnect} from "../Utils/prismaHandler.js";
import {loggerHelper} from "../Utils/loggerHelper.js";
import {keyExcluder} from "../Utils/keyExcluder.js";

const getAllEvents = async (req, res) => {
    await connect()

    let eventsUTC8 = []

    const eventsUTC = await client.Events.findMany()

    eventsUTC.forEach(event => {
        // remove unneeded fields from the object
        const optimizedEventDetails = keyExcluder(
            event,
            "date_created", "date_updated"
        )

        // push the new object and convert the date to UTC+8
        eventsUTC8.push({
            ...optimizedEventDetails,
            event_date: new Date(event.event_date).toLocaleString()
        })
    })

    res.status(200).json({
        eventsUTC8
    })

    await disconnect()
}

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
        event_date: new Date(eventUTC.event_date).toLocaleString()
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

const createEvent = async (req, res) => {
    await connect()

    /**
     * Notes about entering new data:
     * -> eventDate should follow the stringified format of MM-DD-YYYY, HH:mm:SS
     */
    const {eventName, eventDescription, eventDate, eventLocation, eventImageLink} = req.body

    const event = await client.Events.create({
        data: {
            event_name: eventName,
            event_description: eventDescription,
            event_date: new Date(eventDate),
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

const updateEvent = async (req, res) => {
    await connect()

    const parsedId = parseInt(req.params.id)

    const {eventName, eventDescription, eventDate, eventLocation, eventImageLink} = req.body

    const event = await client.Events.update({
        where: {
            id: parsedId
        },
        data: {
            event_name: eventName,
            event_description: eventDescription,
            event_date: new Date(eventDate),
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

export {getAllEvents, getSingleEvent, createEvent, updateEvent}

