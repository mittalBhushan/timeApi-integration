import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWelcomeProps {
  onScreenChange: (screen: number) => void;
}

export interface IResultsProps {
  onScreenChange: (screen: number) => void;
}

export interface IQuestionsProps {
  onScreenChange: (screen: number) => void;
  context: WebPartContext;
}
