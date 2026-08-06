# Codex Multi-Agent Workflow

一个可安装的 Codex Skill：根据任务复杂度协调 Sol 主代理、可选的 Terra/Luna 执行代理与可选的 ChatGPT Pro 外部复核。

## 安装

最简单的方式是在 Codex 对话中说：

> 从 GitHub 仓库 `Monanom/codex-multi-agent-workflow` 安装路径 `skill/codex-multi-agent-workflow` 的 Skill。

也可以在终端运行 Codex 内置安装器：

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo Monanom/codex-multi-agent-workflow \
  --path skill/codex-multi-agent-workflow
```

安装后请在**新对话**中使用。直接提出工程任务即可，也可以明确说“使用 `$codex-multi-agent-workflow`”。

## 可选配置

只安装 Skill 就能使用，默认由主代理完成所有工作。

如果想把范围明确、但需要一定工程判断的模块任务交给 Terra，将 `skill/codex-multi-agent-workflow/templates/terra-worker.toml` 复制到 `~/.codex/agents/terra-worker.toml`。如果想把规则明确的执行任务交给 Luna，将 `skill/codex-multi-agent-workflow/templates/luna-worker.toml` 复制到 `~/.codex/agents/luna-worker.toml`。如果想让复杂任务得到外部复核，在 Codex 内置浏览器登录自己的 ChatGPT Pro，并在协作前确认 Intelligence 为 Extra High。

本仓库的安装过程**不自动修改**主模型、速度、全局 `AGENTS.md` 或任何代理配置；模板仅供自行选择和审阅后使用。

## 工作方式

- 简单或局部任务：主代理直接处理。
- 范围明确、需要一定判断但限定在一个模块内的任务：可交给 Terra。
- 规则明确、重复或偏执行的任务：可交给 Luna。
- 跨模块、架构、疑难 Bug、安全或性能问题：可请求 ChatGPT Pro 独立研究或审查。
- ChatGPT Pro 不可用时：记录“外部复核未执行”，由主代理继续完成和验收。

Sol 始终负责整合和最终验收；不会让多个代理重复修改同一问题。外部建议始终需要在本地独立审查和测试。

## 隐私与权限

默认传递最小文本上下文；如必须打包，也应先排除 `.env`、密钥、Cookie、浏览器状态、`.git`、依赖和构建产物。未经你的明确授权，Skill 不应提交、推送、部署、迁移数据库或操作线上数据。

## 验证

```bash
node tests/validate-skill.mjs
```

## 许可

[MIT](LICENSE)
