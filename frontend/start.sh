RUN pnpm fetch --prod &&
RUN pnpm install &&
RUN pnpm audit &&
RUN pnpm audit --fix &&
RUN pnpm install &&
RUN pnpm update &&
RUN pnpm run build --outdir=build &&
pnpm install -g serve &&
serve -s build
