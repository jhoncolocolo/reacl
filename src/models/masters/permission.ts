import { CommonMaster } from "./common-master";

export interface Permission extends CommonMaster {
  route: string,
  path: string,
}
