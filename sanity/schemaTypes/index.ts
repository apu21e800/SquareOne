import type { SchemaTypeDefinition } from "sanity"
import { blockContent } from "./blockContent"
import { post } from "./post"
import { project } from "./project"
import { galleryPhoto, gallerySettings, homePage, pageHero } from "./pages"
import { socialPost } from "./socialPost"
import { siteSettings } from "./siteSettings"
import { copySlot, imageSlot } from "./slots"
import { service } from "./service"
import { storyIdea } from "./storyIdea"
import { aboutPage, contactPage, drivewaysPage } from "./words"

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  project,
  storyIdea,
  homePage,
  aboutPage,
  contactPage,
  drivewaysPage,
  pageHero,
  galleryPhoto,
  gallerySettings,
  socialPost,
  service,
  siteSettings,
  copySlot,
  imageSlot,
  blockContent,
]
