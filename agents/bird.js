#!/usr/bin/env node
/**
 * Bird Agent - Bulletin Board Watcher
 * 
 * Monitors BULLETIN_BOARD.md for changes and signals Claw when tasks are posted.
 * Zero-cost when idle, instant notifications on changes.
 */

const fs = require('fs');
const path = require('path');

const BOARD = path.join(__dirname, '..', 'BULLETIN_BOARD.md');
const SIGNAL = path.join(__dirname, '..', '.bird-signal');

console.log(`[${new Date().toISOString()}] Bird agent starting...`);
console.log(`  Watching: ${BOARD}`);
console.log(`  Signal file: ${SIGNAL}`);

let lastContent = '';

// Initialize board if it doesn't exist
if (!fs.existsSync(BOARD)) {
  fs.writeFileSync(BOARD, `# Bulletin Board

## Active Tasks
(No tasks yet)

## Completed Tasks
(No completed tasks yet)
`);
  console.log('  Created initial BULLETIN_BOARD.md');
}

// Watch for changes
const watcher = fs.watch(BOARD, (eventType) => {
  if (eventType === 'change') {
    try {
      const content = fs.readFileSync(BOARD, 'utf8');
      
      // Only process if content actually changed
      if (content !== lastContent) {
        lastContent = content;
        
        // Parse for open tasks
        const lines = content.split('\n');
        const tasks = [];
        let currentTask = null;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          // Task header
          if (line.startsWith('### Task #')) {
            if (currentTask) tasks.push(currentTask);
            currentTask = {
              id: line.match(/Task #(\d+)/)?.[1],
              line: i + 1
            };
          }
          
          // Task metadata
          if (currentTask) {
            if (line.includes('**Status:**')) {
              currentTask.status = line.split('**Status:**')[1]?.trim();
            }
            if (line.includes('**Posted by:**')) {
              currentTask.postedBy = line.split('**Posted by:**')[1]?.trim();
            }
            if (line.includes('**Assigned to:**')) {
              currentTask.assignedTo = line.split('**Assigned to:**')[1]?.trim();
            }
            if (line.includes('**Priority:**')) {
              currentTask.priority = line.split('**Priority:**')[1]?.trim();
            }
          }
          
          // End of task (separator or new section)
          if (line === '---' && currentTask) {
            tasks.push(currentTask);
            currentTask = null;
          }
        }
        
        // Push last task if exists
        if (currentTask) tasks.push(currentTask);
        
        // Filter for OPEN tasks
        const openTasks = tasks.filter(t => t.status === 'OPEN');
        
        if (openTasks.length > 0) {
          // Signal Claw
          const signal = {
            timestamp: new Date().toISOString(),
            openTaskCount: openTasks.length,
            tasks: openTasks.map(t => ({
              id: t.id,
              assignedTo: t.assignedTo,
              priority: t.priority,
              postedBy: t.postedBy
            })),
            event: 'board_updated'
          };
          
          fs.writeFileSync(SIGNAL, JSON.stringify(signal, null, 2));
          
          console.log(`[${new Date().toISOString()}] 🐦 Board updated: ${openTasks.length} open task(s)`);
          openTasks.forEach(t => {
            console.log(`  - Task #${t.id}: ${t.assignedTo} (${t.priority})`);
          });
        }
      }
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Error processing board:`, err.message);
    }
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log(`\n[${new Date().toISOString()}] Bird agent shutting down...`);
  watcher.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(`\n[${new Date().toISOString()}] Bird agent shutting down...`);
  watcher.close();
  process.exit(0);
});

// Keep alive
console.log(`[${new Date().toISOString()}] 🐦 Bird agent ready. Watching for bulletin board updates...`);
