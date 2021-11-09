import prismaClient from "../prisma"

class GetLast3MessagesService {
	async execute() {
		const messages = await prismaClient.message.findMany({
			take: 3,
			orderBy: {
				create_at: "desc"
			},
			include: {
				user: true
			},
		});

		// SELECT * FROM MESSAGE ORDER BY CREATE_AT DESC LIMIT 3;

		return messages;
	}
}

export { GetLast3MessagesService }
