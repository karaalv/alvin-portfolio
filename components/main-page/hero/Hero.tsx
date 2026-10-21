/** Portfolio introduction with Alvin's name and quote. */
import styles from '@styles/components/main-page/hero/hero.module.css';

/** Display the name and quote without chat controls. */
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
                    sit.” So I plan to plant a lot of trees.
                </p>
            </div>
        </section>
    );
}
