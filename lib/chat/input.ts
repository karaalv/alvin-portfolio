/**
 * Approved placeholder questions and editable prompt
 * suggestions.
 */
export const CHAT_PLACEHOLDERS = [
    'What does Alvin do?',
    'What kind of work does Alvin focus on?',
    "Which of Alvin's projects should I look at first?",
    'What technical skills does Alvin use?',
    'What should I know about Alvin?',
] as const;

export const CHAT_PROMPTS = [
    {
        label: 'Projects',
        message:
            'What projects has Alvin worked on, and what was his role in each?',
    },
    {
        label: 'Experience',
        message:
            'Where has Alvin worked, and what did he do there?',
    },
    {
        label: 'Current work',
        message: 'What is Alvin working on right now?',
    },
    {
        label: 'Mindset',
        message:
            "What mindset guides Alvin's work and how he approaches new projects?",
    },
] as const;
