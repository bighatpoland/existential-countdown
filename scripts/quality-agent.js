#!/usr/bin/env node

const { spawnSync } = require('node:child_process');

const steps = [
  {
    name: 'TypeScript typecheck',
    command: 'npx',
    args: ['tsc', '--noEmit'],
  },
  {
    name: 'Unit tests',
    command: 'npm',
    args: ['test', '--', '--runInBand'],
  },
];

const results = [];

for (const step of steps) {
  process.stdout.write(`\n[quality-agent] ${step.name}...\n`);
  const result = spawnSync(step.command, step.args, {
    stdio: 'inherit',
    env: process.env,
  });

  const ok = result.status === 0;
  results.push({ name: step.name, ok });

  if (!ok) {
    process.stdout.write(`\n[quality-agent] Failed: ${step.name}\n`);
    process.exit(result.status ?? 1);
  }
}

process.stdout.write('\n[quality-agent] All checks passed.\n');
