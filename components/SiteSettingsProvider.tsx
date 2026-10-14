"use client"

import { createContext, useContext, type ReactNode } from "react"
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-settings"

/**
 * Site Settings for client components (the menu, the phone bar, the quote
 * form). app/layout.tsx reads them once per page from the Studio
 * (getSiteSettings) and hands them down here, so a phone number changed in
 * the Studio changes everywhere at once. Server components call
 * getSiteSettings() themselves.
 */
const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS)

export function SiteSettingsProvider({ settings, children }: { settings: SiteSettings; children: ReactNode }) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
}

/** The merged Site Settings; the code's copy outside a provider. */
export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext)
}
