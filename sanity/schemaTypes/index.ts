import type { SchemaTypeDefinition } from "sanity"
import { blockContent } from "./blockContent"
import { post } from "./post"
import { project } from "./project"
import { socialPost } from "./socialPost"
import { siteSettings } from "./siteSettings"
import { copySlot, imageSlot } from "./slots"

export const schemaTypes: SchemaTypeDefinition[] = [post, project, socialPost, siteSettings, copySlot, imageSlot, blockContent]
