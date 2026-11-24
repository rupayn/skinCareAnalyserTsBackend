import { execSync } from "node:child_process";
import { input as textInput } from "@inquirer/prompts";

const run = (command) => {
  execSync(command, {
    stdio: "inherit",
  });
};

const hasGitChanges = () => {
  const status = execSync("git status --porcelain", {
    encoding: "utf8",
  }).trim();

  return status.length > 0;
};

try {
  // Only continue with Git operations if there are changes.
  if (!hasGitChanges()) {
    console.log("\nNo Git changes detected. Nothing to commit or push.");
    process.exit(0);
  }

  console.log("\nChanges detected.");

  // Run all project checks.
  console.log("\nRunning full checks...\n");

  run("pnpm run full-check");

  console.log("\n✓ All checks passed.");

  // Get commit message.
  const message = await textInput({
    message: "Commit message:",
  });

  if (!message.trim()) {
    console.error("Commit message cannot be empty.");
    process.exit(1);
  }

  console.log("\nStaging changes...");
  run("git add .");

  console.log("\nCommitting...");
  run(`git commit -m "${message.replace(/"/g, '\\"')}"`);

  console.log("\nPushing...");
  run("git push");

  console.log("\n✓ Successfully committed and pushed.");
} catch (err) {
  if (err?.name === "ExitPromptError") {
    console.log("\nCancelled.");
    process.exit(0);
  }

  console.error("\n✗ Operation failed.");
  process.exit(1);
}