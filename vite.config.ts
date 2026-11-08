/// <reference types="node" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";

/* Rebuilds the design skill (skill/) whenever anything in src/ changes while the dev server runs. */
function designSkill(): Plugin {
  const root = fileURLToPath(new URL(".", import.meta.url));
  let timer: ReturnType<typeof setTimeout> | undefined;
  const run = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      execFile(process.execPath, ["scripts/skill.ts", "-q"], { cwd: root }, (err, _out, stderr) => {
        if (err || stderr) console.error(stderr || err);
      });
    }, 200);
  };
  return {
    name: "design-skill",
    configureServer(server) {
      run();
      server.watcher.on("all", (_event, file) => file.startsWith(root + "src/") && run());
    },
  };
}

export default defineConfig({
  plugins: [react(), designSkill()],
  server: { port: 5180 },
});
