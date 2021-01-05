import BootClient from "./client/bot_client";
import { owners } from "./config/config";
const token = process.env.DISCORD_TOKEN;

console.log(token, "INI TOKEEENENENDA");
const client: BootClient = new BootClient({ owners, token });
client.start();