import { baseURL } from "@/api";

export function FullPath(path: string) {
  if (path) {
    return baseURL + path;
  } else {
    return "/assets/images/placeholder-design.png";
  }
}
