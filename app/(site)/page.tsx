/** Homepage content within the shared site layout. */
import Hero from '@components/main-page/hero/Hero';
import Experience from '@components/main-page/experience/Experience';
import styles from '@styles/pages/MainPage.module.css';

/** Render the portfolio sections currently being rebuilt. */
export default function MainPage() {
    return (
        <div className={styles.container}>
            <Hero />
            <Experience />
        </div>
    );
}
