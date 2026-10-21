/**
 * Mirror the agent's text cleaning before local display and
 * sending.
 */
const MAX_INPUT_LENGTH = 2000;
const MAX_SINGLE_INPUT_TOKEN_LENGTH = 100;
const LONG_TOKEN = new RegExp(
    `\\S{${MAX_SINGLE_INPUT_TOKEN_LENGTH + 1},}`,
    'gu',
);

/**
 * Preserve readable Unicode, URLs and line breaks; remove
 * obvious noise.
 */
export function sanitiseInput(value: string): string {
    let text = value
        .normalize('NFKC')
        .replace(/\r\n?/g, '\n');
    text = text.replace(/\p{C}/gu, (character) =>
        ['\n', '\t', '\u200c', '\u200d'].includes(character)
            ? character
            : '',
    );
    text = text
        .replace(LONG_TOKEN, '')
        .replace(/(.)\1{19,}/gu, '')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    const compact = text.replace(/\s/gu, '');
    if (
        Array.from(compact).length > 20 &&
        !/[\p{L}\p{N}]/u.test(compact)
    )
        return '';
    return Array.from(text)
        .slice(0, MAX_INPUT_LENGTH)
        .join('')
        .trim();
}
