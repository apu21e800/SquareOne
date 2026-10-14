/**
 * The automation's own records in Sanity. An id with a dot is private: Sanity
 * keeps it from unauthenticated reads, so these never show through the
 * public dataset.
 */

/** A drafted project is written down here, so it is never drafted twice: `automation.draftlog.<project slug>`. */
export const DRAFT_LOG_PREFIX = "automation.draftlog."
