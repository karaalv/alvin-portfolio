/** Homepage content within the shared site layout. */
import Experience from '@components/main-page/experience/Experience';
import styles from '@styles/pages/MainPage.module.css';

/** Render the portfolio sections currently being rebuilt. */
export default function MainPage() {
    return (
        <div className={styles.container}>
            <Experience />
        </div>
    );
}
