import { User } from "./User"

export interface Comment {
created: Date
id: string
text: string
selectionId: string
user?: User
}