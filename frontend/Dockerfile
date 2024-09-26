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
RUN pnpm audit
RUN pnpm audit --fix
RUN pnpm install
RUN pnpm update
RUN pnpm run build --outdir=build
# RUN pnpm install -g serve
# CMD ["serve", "-s", "build"]

FROM nginx:latest
COPY --from=build /frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-server /etc/nginx/sites-available
RUN ln -s /etc/nginx/sites-available/nginx-server /etc/nginx/sites-enabled
