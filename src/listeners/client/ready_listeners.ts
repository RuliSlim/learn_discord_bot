import { Listener } from "discord-akairo";

export class ReadyListener extends Listener {
	public constructor() {
		super("ready", {
			emitter: "client",
			event: "ready",
			category: "client"
		});
	}

	public exec(): void {
		console.log("ko ga masuk sini?");
		console.log(`${this.client.user?.tag} is now online and ready`);
		console.log("masuk ga sih?");
	}
}