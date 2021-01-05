import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
	public constructor() {
		super("ping", {
			aliases: [ "ping" ],
			category: "Public",
			description: {
				content: "Just checking latency to the bot",
				usage: "ping",
				example: [ "ping" ]
			},
			ratelimit: 3,
		});
	}

	public exec(message: Message): Promise<Message> | undefined {
		return message.util?.send(`Pong! ${this.client.ws.ping}ms`);
	}
}