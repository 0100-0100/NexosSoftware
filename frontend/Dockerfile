FROM node:slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ENV PATH /frontend/node_modules/.bin:$PATH

RUN mkdir /frontend
WORKDIR /frontend

COPY . ./

RUN pnpm fetch --prod
RUN pnpm install
RUN pnpm update
RUN pnpm audit
RUN pnpm audit --fix
RUN pnpm install
RUN pnpm tailwindcss -i ./src/index.css -o ./src/tailwind.css
RUN pnpm run build --outdir=build

# Second stage: Nginx
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /frontend/build /usr/share/nginx/html

RUN nginx -t
CMD ["nginx", "-g", "daemon off;"]
