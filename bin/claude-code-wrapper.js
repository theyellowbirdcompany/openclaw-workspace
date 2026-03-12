#!/usr/bin/env node

/**
 * Claude Code Wrapper for OpenClaw
 * Routes workflow orchestration through local Claude Code (zero token cost)
 * Used by Lobster pipelines for deterministic, cost-free routing
 */

const { execSync } = require('child_process');
const fs = require('fs');

class ClaudeCodeWrapper {
  constructor() {
    this.claudePath = '/home/clawd/.local/bin/claude';
    this.validateInstallation();
  }

  validateInstallation() {
    try {
      const version = execSync(`${this.claudePath} --version`, { encoding: 'utf-8' }).trim();
      console.error(`✅ Claude Code available: ${version}`);
    } catch (err) {
      throw new Error(`Claude Code not found at ${this.claudePath}`);
    }
  }

  /**
   * Execute a prompt through Claude Code in print mode
   * Returns parsed JSON response if available, or raw text
   */
  execute(prompt, options = {}) {
    const args = ['-p'];
    
    // Add options if provided
    if (options.model) args.push('--agent', options.model);
    if (options.addDir) args.push('--add-dir', options.addDir);
    if (options.allowedTools) args.push('--allowed-tools', options.allowedTools);
    
    args.push(prompt);

    try {
      const result = execSync(`${this.claudePath} ${args.map(a => `"${a}"`).join(' ')}`, {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024 // 10MB buffer for large outputs
      });

      // Try to parse as JSON if it looks like JSON
      if (result.trim().startsWith('{') || result.trim().startsWith('[')) {
        try {
          return JSON.parse(result);
        } catch (e) {
          return result;
        }
      }

      return result;
    } catch (err) {
      throw new Error(`Claude Code execution failed: ${err.message}`);
    }
  }

  /**
   * Run a workflow task (for Lobster pipelines)
   * Returns structured result for pipeline consumption
   */
  executeWorkflowTask(taskName, input, context = {}) {
    const prompt = `
You are a workflow orchestration engine. Execute this task and return ONLY valid JSON.

Task: ${taskName}
Input: ${JSON.stringify(input, null, 2)}
Context: ${JSON.stringify(context, null, 2)}

Return JSON with this structure:
{
  "task": "${taskName}",
  "status": "completed|failed",
  "output": <task-specific-output>,
  "errors": [<any-errors>]
}
`;

    const result = this.execute(prompt, { model: 'reasoning' });
    
    return typeof result === 'object' ? result : { 
      task: taskName, 
      status: 'completed', 
      output: result 
    };
  }

  /**
   * For Lobster: spawn a design sub-agent task
   * Zero token cost - orchestration only
   */
  spawnDesignSubagent(agentType, task, context = {}) {
    const prompt = `
You are a design workflow sub-agent (${agentType}).

Task: ${task}

Context:
${JSON.stringify(context, null, 2)}

Return ONLY valid JSON:
{
  "agent": "${agentType}",
  "task": "<task>",
  "status": "completed|failed",
  "result": <task-result>,
  "next_step": "<what-to-do-next-or-null>"
}
`;

    return this.executeWorkflowTask(`design-subagent-${agentType}`, { task, context });
  }
}

// CLI usage for Lobster
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: claude-code-wrapper.js <task-type> [input-json]');
    console.error('');
    console.error('Task types:');
    console.error('  workflow <task-name> <input-json>');
    console.error('  subagent <agent-type> <task-json>');
    console.error('  prompt <prompt-text>');
    process.exit(1);
  }

  const wrapper = new ClaudeCodeWrapper();
  const taskType = args[0];

  try {
    let result;

    switch (taskType) {
      case 'prompt':
        result = wrapper.execute(args.slice(1).join(' '));
        break;

      case 'workflow':
        const taskName = args[1];
        const input = JSON.parse(args[2] || '{}');
        result = wrapper.executeWorkflowTask(taskName, input);
        break;

      case 'subagent':
        const agentType = args[1];
        const taskJson = JSON.parse(args[2] || '{}');
        result = wrapper.spawnDesignSubagent(agentType, taskJson.task, taskJson.context);
        break;

      default:
        console.error(`Unknown task type: ${taskType}`);
        process.exit(1);
    }

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(JSON.stringify({
      error: err.message,
      status: 'failed'
    }, null, 2));
    process.exit(1);
  }
}

module.exports = ClaudeCodeWrapper;
