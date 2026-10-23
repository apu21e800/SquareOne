import type { ComponentType } from "react"
import { BookIcon } from "@sanity/icons/Book"
import { BulbOutlineIcon } from "@sanity/icons/BulbOutline"
import { ClipboardImageIcon } from "@sanity/icons/ClipboardImage"
import { CogIcon } from "@sanity/icons/Cog"
import { ControlsIcon } from "@sanity/icons/Controls"
import { EditIcon } from "@sanity/icons/Edit"
import { EnvelopeIcon } from "@sanity/icons/Envelope"
import { EyeClosedIcon } from "@sanity/icons/EyeClosed"
import { HomeIcon } from "@sanity/icons/Home"
import { ImageIcon } from "@sanity/icons/Image"
import { ImagesIcon } from "@sanity/icons/Images"
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline"
import { ProjectsIcon } from "@sanity/icons/Projects"
import { ShareIcon } from "@sanity/icons/Share"
import { TextIcon } from "@sanity/icons/Text"
import { ThLargeIcon } from "@sanity/icons/ThLarge"
import { TiersIcon } from "@sanity/icons/Tiers"
import { WrenchIcon } from "@sanity/icons/Wrench"

/**
 * One picture for each list and each kind of document (22 Oct 2026), as
 * hubss.com's Studio has them: the list reads at a glance instead of as a
 * column of folders, and "new document", search and links show the same
 * picture as the list. sanity/structure.ts and every document type in
 * sanity/schemaTypes take theirs from here.
 *
 * Sanity's own set (@sanity/icons, which the sanity package brings with it),
 * each from its own path: version 5 no longer exports them from the root.
 */
export const ICONS = {
  // The lists that hold other lists, and the guide.
  guide: BookIcon,
  websitePages: HomeIcon,
  advanced: ControlsIcon,
  // Website Pages.
  homePage: HomeIcon,
  aboutPage: InfoOutlineIcon,
  contactPage: EnvelopeIcon,
  drivewaysPage: TiersIcon,
  pageHero: ImageIcon,
  galleryPhoto: ImagesIcon,
  gallerySettings: EyeClosedIcon,
  socialPost: ThLargeIcon,
  // The rest of the list, in its order.
  service: WrenchIcon,
  project: ProjectsIcon,
  storyIdea: BulbOutlineIcon,
  post: EditIcon,
  fieldPost: ClipboardImageIcon,
  socialLog: ShareIcon,
  siteSettings: CogIcon,
  // Advanced.
  copySlot: TextIcon,
  imageSlot: ImageIcon,
} satisfies Record<string, ComponentType>
