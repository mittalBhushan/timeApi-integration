import { ISPQuizItem } from "./ISpQuizItem";

export default interface IService {
  // validateResponse(): Promise<JSON>;
  submitResponse(body: ISPQuizItem): Promise<void>;
}
