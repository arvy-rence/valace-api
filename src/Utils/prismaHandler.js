import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

const connect = async () => {
    await client.$connect()
}

const disconnect = async ()  => {
    await client.$disconnect()
}

export { client, connect, disconnect }