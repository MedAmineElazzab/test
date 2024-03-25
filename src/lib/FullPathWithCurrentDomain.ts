import { IsSSR } from "@/_v1/lib/utils";

export function FullPathWithCurrentDomain(path: string) {
    const currentDomain =
      typeof window != undefined && !IsSSR() ? window?.location?.origin : "";
    if (currentDomain) {
      return currentDomain + path;
    }
    else {
      return  ""
    }
  }