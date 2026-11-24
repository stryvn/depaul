import { spawn } from 'node:child_process';

const args = process.argv.slice(2).filter(arg => arg !== '--strictPort');
const translated = args.map(arg => arg === '--host' ? '--hostname' : arg);
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', ...translated], { stdio: 'inherit' });
child.on('exit', code => process.exit(code ?? 1));
