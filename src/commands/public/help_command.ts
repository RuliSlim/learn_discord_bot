import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import { stripIndents } from "common-tags";

export default class HelpCommand extends Command {
	public constructor() {
		super("help", {
			aliases: [ "help", "tolong" ],
			category: "Public",
			description: {
				content: "List for help message",
				usage: "help",
				example: [ "help" ]
			},
			ratelimit: 3,
			args: [
				{
					id: "command",
					type: "commandAlias",
					default: null
				}
			]
		});
	}

	public exec(message: Message, { command }: { command: Command }): Promise<Message> {
		if (command) {
			return message.channel.send(new MessageEmbed()
				.setAuthor(`Help | ${command}`, this.client.user.displayAvatarURL())
				.setColor("#4caf50")
				.setDescription(stripIndents`
					**Description**
					${command.description.content || "No Content Provided."}

					**Usage**
					${command.description.usage || "No Usage Provided."}

					**Example**
					${command.description.example || "No Example Provided."}
				`)
			);
		}

		const embed = new MessageEmbed()
			.setAuthor(`Help | ${this.client.user}`, this.client.user.displayAvatarURL())
			.setColor("#4caf50")
			.setFooter(`${this.client.commandHandler.prefix}help [command] for more information`);

		for (const category of this.handler.categories.values()) {
			if ([ "default" ].includes(category.id)) {
				continue;
			}
			embed.addField(category.id, category
				.filter(cmd => cmd.aliases.length > 0)
				.map(cmd => `**\`${cmd}\`**`)
				.join(", " || "No commands in this category.")
			);
		}

		return message.channel.send(embed);
	}
}

// name: 'help',
// description: 'Lists available commands',

// async run(client, message, args, con) {
// 		fs.readdir("./commands/", (err, files) => {
// 				if(err) console.error(err);

// 				let jsfiles = files.filter(f => f.split(".").pop() === "js");
// 				if(jsfiles.length <= 0) {
// 						console.log("No commands to load!");
// 						return;
// 				}

// 				var namelist = "";
// 				var desclist = "";

// 				let result = jsfiles.forEach((f, i) => {
// 						let props = require(`./${f}`);
// 						namelist = props.name;
// 						desclist = props.description;
// 						message.author.send(`**${namelist}** \n${desclist} \n`);
// 				});

// 		});