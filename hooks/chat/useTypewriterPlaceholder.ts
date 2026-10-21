'use client';

/**
 * Animate placeholder copy without modifying the visitor's
 * draft.
 */
import {
    useEffect,
    useState,
    useSyncExternalStore,
} from 'react';
import { CHAT_PLACEHOLDERS } from '@/lib/chat/input';

const REDUCED_MOTION_QUERY =
    '(prefers-reduced-motion: reduce)';

/** Track changes to the browser's motion preference. */
function subscribeToMotion(onChange: () => void) {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    query.addEventListener('change', onChange);
    return () =>
        query.removeEventListener('change', onChange);
}

function prefersReducedMotion() {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Keep server rendering static until browser preferences are
 * available.
 */
function serverMotionPreference() {
    return true;
}

/**
 * Pause on focus, existing input or agent activity; resume from
 * that point.
 */
export function useTypewriterPlaceholder(
    paused: boolean,
): string {
    const reducedMotion = useSyncExternalStore(
        subscribeToMotion,
        prefersReducedMotion,
        serverMotionPreference,
    );
    const [frame, setFrame] = useState({
        sentence: 0,
        length: CHAT_PLACEHOLDERS[0].length,
        deleting: false,
    });
    const sentence = CHAT_PLACEHOLDERS[frame.sentence];

    useEffect(() => {
        if (paused || reducedMotion) return;
        const complete = frame.length === sentence.length;
        const empty = frame.length === 0;
        const delay = frame.deleting
            ? empty
                ? 300
                : 25
            : complete
              ? 2400
              : 55;
        const timer = window.setTimeout(() => {
            if (frame.deleting && empty) {
                setFrame({
                    sentence:
                        (frame.sentence + 1) %
                        CHAT_PLACEHOLDERS.length,
                    length: 0,
                    deleting: false,
                });
            } else if (!frame.deleting && complete) {
                setFrame({ ...frame, deleting: true });
            } else {
                setFrame({
                    ...frame,
                    length:
                        frame.length +
                        (frame.deleting ? -1 : 1),
                });
            }
        }, delay);
        return () => window.clearTimeout(timer);
    }, [frame, paused, reducedMotion, sentence]);

    return reducedMotion
        ? CHAT_PLACEHOLDERS[0]
        : sentence.slice(0, frame.length);
}
