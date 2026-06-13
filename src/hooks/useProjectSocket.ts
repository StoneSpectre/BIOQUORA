/**
 * hooks/useProjectSocket.ts
 *
 * Connects to /ws/projects/{projectId} and dispatches typed events
 * to subscribers in the component tree.
 *
 * Usage:
 *   const { lastMessage, send } = useProjectSocket(projectId);
 */
import { useCallback, useEffect, useRef, useState } from "react";

export type WSEventType =
  | "comment_created"
  | "comment_deleted"
  | "paper_assigned"
  | "paper_saved"
  | "note_updated"
  | "member_joined"
  | "member_removed";

export interface WSMessage {
  type: WSEventType;
  project_id: string;
  actor_id?: string;
  payload: Record<string, unknown>;
}

interface Options {
  onMessage?: (msg: WSMessage) => void;
  enabled?: boolean;
}

const WS_BASE =
  typeof window !== "undefined"
    ? `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}`
    : "";

export function useProjectSocket(projectId: string | undefined, opts: Options = {}) {
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCount = useRef(0);

  const connect = useCallback(() => {
    if (!projectId || opts.enabled === false) return;

    const url = `${WS_BASE}/ws/projects/${projectId}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      retryCount.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const msg: WSMessage = JSON.parse(event.data);
        setLastMessage(msg);
        opts.onMessage?.(msg);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      setConnected(false);
      wsRef.current = null;
      // Exponential backoff: 1s, 2s, 4s … max 30s
      const delay = Math.min(1000 * 2 ** retryCount.current, 30_000);
      retryCount.current += 1;
      retryTimerRef.current = setTimeout(connect, delay);
    };

    ws.onerror = () => ws.close();
  }, [projectId, opts.enabled]);

  useEffect(() => {
    connect();
    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  const send = useCallback((data: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { lastMessage, connected, send };
}
