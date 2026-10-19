/** Temporary conversation for inspecting message styles and scrolling. */
import type { ChatMessage } from '@/types/components/chat/messages';

export const PLACEHOLDER_MESSAGES: readonly ChatMessage[] =
    [
        {
            id: 'preview-user-1',
            role: 'user',
            content: 'What can I ask you about?',
        },
        {
            id: 'preview-agent-1',
            role: 'assistant',
            content: `## Get to know Alvin

You can ask about his **projects**, technical background and approach to building products.

This is a placeholder conversation for checking the chat layout. The responses here are sample content, not live answers.`,
        },
        {
            id: 'preview-user-2',
            role: 'user',
            content:
                'Give me a few examples of questions I could ask about his projects and how he approaches technical decisions.',
        },
        {
            id: 'preview-agent-2',
            role: 'assistant',
            content: `A few useful starting points:

- What problem was the project trying to solve?
- Which parts did Alvin build himself?
- Why did he choose that architecture?
- What would he change if he built it again?

You can also browse the [featured work](/#featured) and then ask about something specific.`,
        },
        {
            id: 'preview-user-3',
            role: 'user',
            content:
                'How would you break down a technical project?',
        },
        {
            id: 'preview-agent-3',
            role: 'assistant',
            content: `### Start with the problem

Explain who needs the product and what they are trying to achieve. That gives the technical decisions some context.

### Follow the data

Trace a request from the interface to the backend, through storage and back to the user. This makes the responsibilities of each part easier to understand.

### Discuss the trade-offs

Describe what the design makes easier, what it makes harder and which assumptions would need revisiting as usage grows.`,
        },
        {
            id: 'preview-user-4',
            role: 'user',
            content:
                'Can you show a short code example as well?',
        },
        {
            id: 'preview-agent-4',
            role: 'assistant',
            content: `Here is a small example for checking fenced code formatting:

\`\`\`python
async def answer_question(user_id: str, question: str):
    context = await fetch_context(question)
    return await create_answer(user_id, question, context)
\`\`\`

The inline names \`fetch_context\` and \`create_answer\` should also be easy to distinguish from the surrounding text.`,
        },
        {
            id: 'preview-user-5',
            role: 'user',
            content:
                'What should a good project explanation include?',
        },
        {
            id: 'preview-agent-5',
            role: 'assistant',
            content: `1. The original problem and intended user.
2. The main constraints, such as time, cost or available data.
3. The implementation and the reasoning behind it.
4. What worked, what failed and what came next.

> A useful explanation connects technical choices to the problem they were meant to solve.

The details should help someone understand the work without needing to read every file in the repository.`,
        },
        {
            id: 'preview-user-6',
            role: 'user',
            content:
                'This is a longer visitor message to check how the bubble wraps across several lines, especially on mobile where there is much less horizontal space available for a conversation.',
        },
        {
            id: 'preview-agent-6',
            role: 'assistant',
            content: `That gives us a mix of short questions, longer visitor messages and structured assistant responses to inspect.

The conversation should scroll independently while the input remains available at the bottom. On desktop, the sidebar should remain visible throughout. On mobile, opening it should blur the conversation behind it.

You can scroll back to the first message to check the top spacing, then return here to inspect the last response and its distance from the input.`,
        },
    ];
