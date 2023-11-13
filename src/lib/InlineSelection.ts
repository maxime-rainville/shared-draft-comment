import { DomMeta } from "web-highlighter/dist/types";

export interface InlineSelection {
    startMeta: DomMeta,
    endMeta: DomMeta,
    text: string,
    id: string,
}