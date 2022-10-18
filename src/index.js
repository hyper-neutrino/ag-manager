import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    IntentsBitField,
    InteractionType,
} from "discord.js";
import config from "./config.js";

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

client.on("ready", async () => {
    console.log("AG Manager is ready.");

    client.application.commands.set([
        {
            name: "character",
            description: "manage the list of Genshin Impact characters",
            type: ApplicationCommandType.ChatInput,
            default_member_permissions: "0",
            dm_permission: false,
            options: [
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "list",
                    description:
                        "list the registered Genshin Impact characters",
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "add",
                    description: "register a new Genshin Impact character",
                    options: [
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "id",
                            description:
                                "their character ID (used for associating servers with a character)",
                            required: true,
                            max_length: 32,
                        },
                        {
                            type: ApplicationCommandOptionType.Boolean,
                            name: "released",
                            description:
                                "whether or not this character is released",
                            required: true,
                        },
                    ],
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "edit",
                    description:
                        "edit a registered Genshin Impact character's data",
                    options: [
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "id",
                            description: "their character ID",
                            required: true,
                            autocomplete: true,
                            max_length: 32,
                        },
                        {
                            type: ApplicationCommandOptionType.Boolean,
                            name: "released",
                            description:
                                "whether or not this character is released",
                            required: true,
                        },
                    ],
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "delete",
                    description: "remove a registered Genshin Impact character",
                    options: [
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "id",
                            description: "their character ID",
                            required: true,
                            autocomplete: true,
                            max_length: 32,
                        },
                    ],
                },
            ],
        },
        {
            name: "server",
            description: "manage the Adventurer's Guild server list",
            type: ApplicationCommandType.ChatInput,
            default_member_permissions: "0",
            dm_permission: false,
            options: [
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "list",
                    description: "list all AG servers",
                },
                {
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    name: "add",
                    description: "add a new AG server",
                    options: [
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: "character",
                            description: "add a character mains server",
                            options: [
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "invite",
                                    description: "an invite to the server",
                                    required: true,
                                },
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "character",
                                    description: "the character to associate",
                                    required: true,
                                    autocomplete: true,
                                    max_length: 32,
                                },
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "name-override",
                                    description:
                                        "the name override; otherwise, uses the server name",
                                    max_length: 100,
                                },
                            ],
                        },
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: "other",
                            description: "add a non-character mains server",
                            options: [
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "invite",
                                    description: "an invite to the server",
                                    required: true,
                                },
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "types",
                                    description:
                                        "the type or types to associate",
                                    required: false,
                                    max_length: 32,
                                },
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "name-override",
                                    description:
                                        "the name override; otherwise, uses the server name",
                                    max_length: 100,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    name: "convert",
                    description: "change the type of an AG server",
                    options: [
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: "character",
                            description: "convert to a character mains server",
                            options: [
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "invite",
                                    description: "an invite to the server",
                                    required: true,
                                    autocomplete: true,
                                },
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "character",
                                    description: "the character to associate",
                                    required: true,
                                    autocomplete: true,
                                    max_length: 32,
                                },
                            ],
                        },
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: "other",
                            description:
                                "convert to a non-character mains server",
                            options: [
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "invite",
                                    description: "an invite to the server",
                                    required: true,
                                },
                                {
                                    type: ApplicationCommandOptionType.String,
                                    name: "types",
                                    description:
                                        "the type or types to associate",
                                    required: false,
                                    max_length: 32,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "set-name",
                    description: "set or remove the name override for a server",
                    options: [
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "invite",
                            description: "an invite to the server",
                            required: true,
                            autocomplete: true,
                        },
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "name-override",
                            description:
                                "the name override; otherwise, uses the server name",
                            max_length: 100,
                        },
                    ],
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "replace-url",
                    description: "replace a dead link",
                    options: [
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "old-invite",
                            description: "the dead invite",
                            required: true,
                            autocomplete: true,
                        },
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "new-invite",
                            description: "the new invite",
                            required: true,
                        },
                    ],
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "delete",
                    description: "remove a server from the AG",
                    options: [
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "invite",
                            description: "the invite link to the server",
                            required: true,
                            autocomplete: true,
                        },
                    ],
                },
            ],
        },
        {
            name: "generate",
            description: "generate the AG board",
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "format",
                    description: "the format to use",
                    required: true,
                    choices: [
                        {
                            name: "json",
                            value: "JSON (useful for loading into discohook)",
                        },
                        {
                            name: "embeds",
                            value: "show the embeds themselves",
                        },
                    ],
                },
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: "public",
                    description: "whether or not to show the output publicly",
                    required: false,
                },
            ],
        },
    ]);
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.type == InteractionType.ApplicationCommand) {
    } else if (
        interaction.type == InteractionType.ApplicationCommandAutocomplete
    ) {
    }
});

await client.login(config.discord_token);
