import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("anime", "routes/anime.tsx"),
    route("cartoon", "routes/cartoon.tsx"),
    route("ranking", "routes/ranking.tsx"),
    route("upload", "routes/upload.tsx"),
] satisfies RouteConfig;
