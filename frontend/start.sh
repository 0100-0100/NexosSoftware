pnpm fetch --prod &&
pnpm install &&
pnpm update &&
pnpm audit &&
pnpm audit --fix &&
pnpm install &&
pnpm tailwindcss -i ./src/index.css -o ./src/tailwind.css &&
pnpm start
# pnpm run build --outdir=build &&
# pnpm install -g serve &&
# serve -s build
