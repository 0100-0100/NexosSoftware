pnpm fetch --prod &&
pnpm install &&
pnpm update &&
pnpm audit &&
pnpm audit --fix &&
pnpm install &&
pnpm run build --outdir=build &&
pnpm install -g serve &&
serve -s build
