import {client, disconnect, connect} from "./prismaHandler.js";

(async ()=>{
    await connect()

    const dateQuery = await client.$queryRaw`SELECT CONVERT_TZ('2022-11-12T01:00:00.000Z', '+00:00','+08:00') as date`

    console.log(dateQuery)

    await disconnect()
})()