import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, symlinkSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

// Keep the original server app intact. Export its public UI for Sites separately.
const root = process.cwd();
const stage = path.join(root, '.sites-runtime', 'public-export');
rmSync(stage, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
for (const name of ['app', 'components', 'db', 'lib', 'public', 'tsconfig.json', 'drizzle.config.ts', 'package.json']) {
  cpSync(path.join(root, name), path.join(stage, name), { recursive: true });
}
symlinkSync(path.join(root, 'node_modules'), path.join(stage, 'node_modules'), 'dir');
// Sites static assets must stay below its per-file upload limit.
const campusVideo = 'public/assets/campus_exterior/drone-shot.webm';
const compressed = path.join(stage, 'public/assets/campus_exterior/drone-shot-compressed.webm');
const encode = spawnSync('ffmpeg', ['-v', 'error', '-i', path.join(root, campusVideo), '-an', '-c:v', 'libvpx-vp9', '-b:v', '1800k', '-deadline', 'realtime', '-cpu-used', '6', '-vf', 'scale=1280:-2', '-y', compressed], { stdio: 'inherit' });
if (encode.status !== 0) process.exit(encode.status ?? 1);
rmSync(path.join(stage, campusVideo));
cpSync(compressed, path.join(stage, campusVideo));
rmSync(compressed);
for (const name of ['admin', 'api', 'actions']) rmSync(path.join(stage, 'app', name), { recursive: true, force: true });
mkdirSync(path.join(stage, 'app', 'actions'), { recursive: true });
function stripDynamicHints(dir) {
 for (const entry of readdirSync(dir, { withFileTypes: true })) {
  const dest = path.join(dir, entry.name);
  if (entry.isDirectory()) stripDynamicHints(dest);
  else if (/\.tsx?$/.test(entry.name)) writeFileSync(dest, readFileSync(dest, 'utf8').replace(/export const instant = false;\n/g, '').replace('import { connection } from "next/server";\n', '').replaceAll('  await connection();\n', ''));
 }
}
stripDynamicHints(path.join(stage, 'app'));
const alumniSource = readFileSync(path.join(root, 'app/actions/alumni.ts'), 'utf8');
const stateType = alumniSource.match(/export interface RegisterAlumniState \{[\s\S]*?\n\}/)[0];
writeFileSync(path.join(stage, 'app/actions/alumni.ts'), `${stateType}\nexport async function registerAlumniAction(_previous: RegisterAlumniState | undefined, _data: FormData): Promise<RegisterAlumniState> { return { error: 'This is a website preview. Alumni registration is not connected here; no details have been saved.' }; }\n`);
writeFileSync(path.join(stage, 'next.config.ts'), `import type { NextConfig } from 'next';
const config: NextConfig = {
 output: 'export', trailingSlash: true,
 images: { unoptimized: true },
 turbopack: { root: ${JSON.stringify(root)}, rules: { '*.css': { loaders: ['@tailwindcss/turbopack'], as: '*.css' } } },
};
export default config;
`);
const storyPage = path.join(stage, 'app/stories/[slug]/page.tsx');
writeFileSync(storyPage, readFileSync(storyPage, 'utf8') + `\nexport async function generateStaticParams() { const stories = await getLatestStories(1000); return stories.map(story => ({ slug: story.slug })); }\n`);
for (const file of ['robots.ts', 'sitemap.ts']) {
 const dest = path.join(stage, 'app', file);
 writeFileSync(dest, readFileSync(dest, 'utf8') + '\nexport const dynamic = "force-static";\n');
}
// Static downloads point straight to the documents supplied in the repository.
const docs = path.join(stage, 'components/docs/DocsDirectoryEditorial.tsx');
writeFileSync(docs, readFileSync(docs, 'utf8').replace('`/api/documents/${doc.slug}/download`', 'doc.fileUrl'));
const layout = path.join(stage, 'app/layout.tsx');
writeFileSync(layout, readFileSync(layout, 'utf8').replace('index: true', 'index: false').replace('follow: true', 'follow: false'));
function run(args) {
 const child = spawnSync(process.execPath, args, { cwd: stage, stdio: 'inherit', env: process.env });
 if (child.status !== 0) process.exit(child.status ?? 1);
}
run([path.join(root, 'node_modules/drizzle-kit/bin.cjs'), 'push']);
run(['--import', 'tsx', 'db/seed.ts']);
run([path.join(root, 'node_modules/next/dist/bin/next'), 'build']);
rmSync(path.join(root, 'out'), { recursive: true, force: true });
cpSync(path.join(stage, 'out'), path.join(root, 'out'), { recursive: true });
