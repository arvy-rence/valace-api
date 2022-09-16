import {client, connect, disconnect} from "./prismaHandler.js";

export const loggerHelper = async (logMessage) => {
    await connect()

    await client.Logs.create({
        data: {
            log_description: logMessage
        }
    })

    await disconnect()
}