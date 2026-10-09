import type { SchemaTypeDefinition } from "sanity"
import { blockContent } from "./blockContent"
import { post } from "./post"
import { project } from "./project"
import { galleryPhoto, gallerySettings, homePage, pageHero } from "./pages"
import { socialPost } from "./socialPost"
import { siteSettings } from "./siteSettings"
import { copySlot, imageSlot } from "./slots"

export const schemaTypes: SchemaTypeDefinition[] = [post, project, homePage, pageHero, galleryPhoto, gallerySettings, socialPost, siteSettings, copySlot, imageSlot, blockContent]
