import { Congregation } from "../masters/congregation";
import { Publisher } from "../masters/publisher";


export interface CongregationPublisher {
  id: number;
  congregation_id: number;
  publisher_id: number;
  active: string;
  starts: string;
  ends: string;
  notes: string;
  publisher: Publisher;
  congregation: Congregation;
}
