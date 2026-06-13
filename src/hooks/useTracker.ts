/**
 * hooks/useTracker.ts
 *
 * Lightweight event tracking hook for Step 8.
 * Wraps POST /api/v1/events/track with batching and session management.
 *
 * Usage:
 *   const { track, trackTimeOnPaper } = useTracker();
 *   track('paper_saved', { entityType: 'paper', entityId: paper.id, projectId, metadata: { pmid } });
 */
import { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export type EventType =
  | "search"
  | "paper_view"
  | "paper_saved"
  | "paper_removed"
  | "collection_created"
  | "collection_view"
  | "review_generated"
  | "time_on_paper"
  | "note_created"
  | "note_updated"
  | "comment_added"
  | "paper_assigned";

interface TrackOptions {
  entityType?: string;
  entityId?: string;
  projectId?: string;
  metadata?: Record<string, unknown>;
}

// Stable session ID for the browser tab (survives re-renders, lost on close)
const SESSION_ID = uuidv4();

async function postEvent(
  eventType: EventType,
  opts: TrackOptions
): Promise<void> {
  try {
    await fetch("/api/v1/events/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: eventType,
        entity_type: opts.entityType ?? null,
        entity_id: opts.entityId ?? null,
        project_id: opts.projectId ?? null,
        session_id: SESSION_ID,
        metadata: opts.metadata ?? {},
      }),
      // Non-blocking — we don't await the response in UI code
      keepalive: true,
    });
  } catch {
    // Silently swallow; tracking must never break the UX
  }
}

export function useTracker() {
  const track = useCallback(
    (eventType: EventType, opts: TrackOptions = {}) => {
      postEvent(eventType, opts);
    },
    []
  );

  /**
   * Call this when entering a paper detail view.
   * Returns a cleanup fn that records time-on-paper when the component unmounts.
   *
   * Usage inside a component:
   *   useEffect(() => trackTimeOnPaper(pmid, paperId, projectId), [pmid]);
   */
  const trackTimeOnPaper = useCallback(
    (pmid: string, paperId: string, projectId?: string) => {
      const startMs = Date.now();

      // Also track the page view
      track("paper_view", {
        entityType: "paper",
        entityId: paperId,
        projectId,
        metadata: { pmid },
      });

      const cleanup = () => {
        const seconds = Math.round((Date.now() - startMs) / 1000);
        if (seconds < 2) return; // ignore accidental visits

        fetch(
          `/api/v1/events/time-on-paper?paper_id=${paperId}&pmid=${pmid}&seconds=${seconds}${
            projectId ? `&project_id=${projectId}` : ""
          }`,
          { method: "POST", keepalive: true }
        ).catch(() => {});
      };

      // Record on visibility change (tab switch / close)
      const onVisibilityChange = () => {
        if (document.visibilityState === "hidden") cleanup();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", onVisibilityChange);
        cleanup();
      };
    },
    [track]
  );

  return { track, trackTimeOnPaper };
}
