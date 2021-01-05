/* eslint-disable @typescript-eslint/no-var-requires */
import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { User, Message } from "discord.js";
import { join } from "path";
import { owners, prefix } from "../config/config";
require("dotenv").config();

declare module "discord-akairo" {
	interface AkairoClient {
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
	}
}

interface BotOptions {
	token?: string;
	owners?: string | string[];
}

export default class BootClient extends AkairoClient {
	public config: BotOptions;

	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, "..", "listeners")
	})

	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "commands"),
		prefix: prefix,
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		commandUtilLifetime: 3e5, //5 minutes
		defaultCooldown: 6e4,
		argumentDefaults: {
			prompt: {
				modifyStart: (_: Message, text: string): string => `${text}\n\nType \`cancel\` to cancel command...`,
				modifyRetry: (_: Message, text: string): string => `${text}\n\nType \`cancel\` to cancel command...`,
				timeout: "You took too long, command has been cancelled",
				ended: "You took maximum retries, this command is cancelled",
				retries: 3,
				time: 3e4
			},
			otherwise: ""
		},
		ignorePermissions: owners
	})

	public constructor(config: BotOptions) {
		super({
			ownerID: config.owners
		});

		this.config = config;
	}

	private async _init(): Promise<void> {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process
		});

		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	public async start(): Promise<string> {
		console.log("masuk start");
		console.log(__dirname, "<<<<<");
		await this._init();
		console.log("sesai init");
		console.log(this.config.token, "token di");
		return this.login(this.config.token);
	}
}