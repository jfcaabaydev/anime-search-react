import { useContext } from "react";
import { WatchListContext } from "./WatchListContext";


export function useWatchList() {
  return useContext(WatchListContext);
}