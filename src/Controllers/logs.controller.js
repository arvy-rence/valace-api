import { connect, client, disconnect } from "../Utils/prismaHandler.js";

const getAllLogs = async (req, res) => {
    await connect()

    const logs = await client.Logs.findMany()

    res.status(200).json({
        logs
    })

    await disconnect()
}

export { getAllLogs }