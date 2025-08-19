import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
    return (
        <div className={styles.page}>
            <Link href={'/a'}> A 로이동</Link>
        </div>
    );
}
