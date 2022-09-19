import { connect, client, disconnect } from "../Utils/prismaHandler.js";

const getAllLogs = async (req, res) => {
    await connect()

    let logsUTC8 = []

    const logsUTC = await client.Logs.findMany()

    logsUTC.forEach(log => {
        logsUTC8.push({
            ...log,
            log_date: new Date(log.log_date).toLocaleString()
        })
    })

    res.status(200).json({
        logsUTC8
    });

    await disconnect()
}

export { getAllLogs }