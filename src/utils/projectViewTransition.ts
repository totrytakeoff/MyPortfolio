import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

interface NativeViewTransition {
  finished: Promise<void>
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    update: () => void | Promise<void>,
  ) => NativeViewTransition
}

let activeProjectSlug: string | null = null
const listeners = new Set<() => void>()

function emitActiveProject(slug: string | null) {
  activeProjectSlug = slug
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return activeProjectSlug
}

export function useProjectViewTransitionSlug(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}

export function startProjectViewTransition(
  slug: string,
  update: () => void,
  motionEnabled: boolean,
  afterUpdate?: () => void,
) {
  const transitionDocument = document as ViewTransitionDocument

  if (!motionEnabled || !transitionDocument.startViewTransition) {
    update()
    afterUpdate?.()
    return
  }

  flushSync(() => emitActiveProject(slug))

  const transition = transitionDocument.startViewTransition(() => {
    flushSync(update)
    afterUpdate?.()
  })

  transition.finished
    .catch(() => undefined)
    .finally(() => emitActiveProject(null))
}
