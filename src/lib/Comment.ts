import { User } from "./User"

export interface Comment {
created: Date
id: string
content: string
selectionId: string
author?: User
}
