import { BlaxelMcpServerTransport, env } from "@blaxel/core";
import "@blaxel/telemetry";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

console.log(`MY_ENV_ONE: ${process.env.MY_ENV_ONE}`);
console.log(`MY_ENV_TWO: ${process.env.MY_ENV_TWO}`);
console.log(`MY_CUSTOM_MCP_ENV: ${process.env.MY_CUSTOM_MCP_ENV}`);

const server = new McpServer({
  name: "mcp-helloworld",
  version: "1.0.0",
  description: "",
});

server.tool(
  "hello_world",
  "Say hello to a person",
  {
    firstname: z.string(),
  },
  async ({ firstname }) => {
    console.info(`Hello world called`);
    return {
      content: [{ type: "text", text: `Hello ${firstname}` }],
    };
  }
);

function main() {
  let transport;
  if (env.BL_SERVER_PORT) {
    transport = new BlaxelMcpServerTransport();
  } else {
    transport = new StdioServerTransport();
  }
  server.connect(transport);
  console.info("Server started");
}

main();
