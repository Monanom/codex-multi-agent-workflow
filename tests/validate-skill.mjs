import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const skillDir = path.join(root, "skill", "codex-multi-agent-workflow");
const requiredFiles = [
  "README.md",
  ".gitignore",
  "skill/codex-multi-agent-workflow/SKILL.md",
  "skill/codex-multi-agent-workflow/agents/openai.yaml",
  "skill/codex-multi-agent-workflow/templates/terra-worker.toml",
  "skill/codex-multi-agent-workflow/templates/luna-worker.toml",
  "skill/codex-multi-agent-workflow/templates/AGENTS.md.snippet",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const skill = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
if (!/^---\nname: codex-multi-agent-workflow\ndescription: Use when .+\n---\n/m.test(skill)) {
  throw new Error("SKILL.md must have valid, trigger-focused frontmatter");
}
for (const text of ["Sol", "terra-worker", "luna-worker", "ChatGPT Pro", "外部复核未执行"]) {
  if (!skill.includes(text)) throw new Error(`SKILL.md is missing: ${text}`);
}

const metadata = fs.readFileSync(path.join(skillDir, "agents", "openai.yaml"), "utf8");
for (const text of ["display_name:", "short_description:", "default_prompt:", "$codex-multi-agent-workflow"]) {
  if (!metadata.includes(text)) throw new Error(`agents/openai.yaml is missing: ${text}`);
}

const luna = fs.readFileSync(path.join(skillDir, "templates", "luna-worker.toml"), "utf8");
for (const text of ['model = "gpt-5.6-luna"', 'reasoning_effort = "max"', "developer_instructions ="]) {
  if (!luna.includes(text)) throw new Error(`luna template is missing: ${text}`);
}

const terra = fs.readFileSync(path.join(skillDir, "templates", "terra-worker.toml"), "utf8");
for (const text of ['model = "gpt-5.6-terra"', 'reasoning_effort = "medium"', "developer_instructions ="]) {
  if (!terra.includes(text)) throw new Error(`terra template is missing: ${text}`);
}

const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
for (const text of ["install-skill-from-github.py", "不自动修改", "新对话"]) {
  if (!readme.includes(text)) throw new Error(`README.md is missing: ${text}`);
}

for (const file of requiredFiles) {
  const contents = fs.readFileSync(path.join(root, file), "utf8");
  if (/\/Users\/|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY|ghp_[A-Za-z0-9]/.test(contents)) {
    throw new Error(`Potential personal or secret content found in: ${file}`);
  }
}

console.log("Skill package validation passed.");
