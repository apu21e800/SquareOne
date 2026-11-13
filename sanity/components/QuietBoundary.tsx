import { Component, type ReactNode } from "react"

/**
 * Keeps the form working when one of our Studio panels fails (a Studio
 * upgrade, an odd document): the panel gives way to `fallback` (nothing, or a
 * plain line) and the error goes to the console. The office must always be
 * able to edit, so every panel of ours sits inside one, with Sanity's own
 * fields outside it (12 Nov 2026, as hubss.com's; the Edit on the page card
 * had its own since 23 Oct).
 */
export default class QuietBoundary extends Component<{ children: ReactNode; fallback?: ReactNode; name: string }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.error(`[studio] ${this.props.name} failed; the form is unaffected`, err)
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children
  }
}
