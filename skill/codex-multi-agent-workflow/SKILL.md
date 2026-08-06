---
name: codex-multi-agent-workflow
description: Use when Codex needs to decide whether a software task should stay with the primary agent, be delegated as a bounded task, or receive optional independent external review for complex engineering work.
---

# Codex 多代理工程协作

主代理始终掌握方向、边界、代码整合和最终验收。执行代理与外部复核都是辅助角色，不是并列负责人。

## 任务路由

| 情况 | 负责人 |
| --- | --- |
| 简单、局部或无需独立复核 | 主代理 |
| 范围明确、可独立验证、可并行 | `luna-worker` |
| 跨模块、架构/重大重构、疑难 Bug、安全或性能 | 主代理 + 可选 ChatGPT Pro |

不要让 `luna-worker` 与 ChatGPT Pro 修改同一问题。没有已配置的 `luna-worker` 时，主代理自行完成；不要自动写入用户的代理配置。

## 使用外部复核

仅在路由表的复杂情形或用户明确要求时，使用已登录的 ChatGPT Pro。发送前确认 Intelligence 为 Extra High；任务单必须包含目标、相关上下文、不可破坏边界、非目标、验收标准和禁止操作。

要求外部交付分析、完整补丁或完整文件、修改清单、依赖、建议测试和未验证风险。主代理必须独立审查并在本地运行相关检查和测试。

Extra High 不可用、ChatGPT Pro 限额不足或外部协作失败时，记录“外部复核未执行”，停止重复尝试，由主代理继续；只有用户要求必须外部验收，或风险无法用本地证据确认时才暂停。

## 安全边界

开始前读取适用项目说明并保护已有改动。优先传递最小文本上下文；只有不足时才准备脱敏压缩包，排除密钥、Cookie、`.env`、浏览器状态、依赖、构建产物和 `.git`。未经明确授权，不提交、推送、部署、迁移数据库或操作线上数据。

## 报告

说明任务路由、实际委派、外部复核是否执行、修改内容、独立测试结果和未验证风险。
