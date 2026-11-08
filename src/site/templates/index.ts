import { Article } from "./Article";
import { Chat } from "./Chat";
import { Canvas } from "./Canvas";
import { Dashboard } from "./Dashboard";
import { Settings } from "./Settings";
import { Landing } from "./Landing";

export const templatePages: Record<string, () => React.JSX.Element> = {
  "t/chat": Chat,
  "t/dashboard": Dashboard,
  "t/settings": Settings,
  "t/canvas": Canvas,
  "t/article": Article,
  "t/landing": Landing,
};
