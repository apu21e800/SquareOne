import { permanentRedirect } from "next/navigation"

/* Vapour blasting is an extra service and lives inside the services
   architecture. The next.config redirect handles this path in production;
   this stub keeps local dev and any direct render consistent with it. */
export default function VaporBlastingRedirect() {
  permanentRedirect("/services/vapor-blasting")
}
