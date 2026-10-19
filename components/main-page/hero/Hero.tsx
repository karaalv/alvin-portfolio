/** Portfolio introduction and the presentational hero chat controls. */
import ChatInput from '@components/chat/input/ChatInput';
import ChatPrompt from '@components/chat/input/ChatPrompt';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/main-page/hero/hero.module.css';

const PROMPTS = [
    'Projects',
    'Experience',
    'Current work',
    'Mindset',
];

/** Compose the name, quote, input and suggested prompt labels. */
export default function Hero() {
    return (
        <section
            aria-labelledby="hero-heading"
            className={styles.container}
        >
            <div className={styles.introduction}>
                <h1
                    id="hero-heading"
                    className={styles.name}
                >
                    <span>Alvin</span>
                    <span>Karanja.</span>
                </h1>
                <p className={styles.quote}>
                    “A nation grows great when old men plant
                    trees in whose shade they will never
                    sit.” So I plan to plant a lot of
                    trees.
                </p>
            </div>
            <div className={styles.chat}>
                <h2
                    className={`${typography.heading} ${typography.medium} ${styles.chat_heading}`}
                >
                    Ask about my work
                </h2>
                <ChatInput variant="hero" />
                <div
                    className={styles.prompts}
                    role="group"
                    aria-label="Suggested questions"
                >
                    {PROMPTS.map((label) => (
                        <ChatPrompt
                            key={label}
                            label={label}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
