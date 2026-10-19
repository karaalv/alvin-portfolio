/** Homepage content within the shared site layout. */
import Hero from '@components/main-page/hero/Hero';
import FeaturedWork from '@components/main-page/featured-work/FeaturedWork';
import Experience from '@components/main-page/experience/Experience';
import styles from '@styles/pages/main-page.module.css';

/** Render the portfolio sections currently being rebuilt. */
export default function MainPage() {
    return (
        <div className={styles.container}>
            <Hero />
            <FeaturedWork />
            <Experience />
        </div>
    );
}
