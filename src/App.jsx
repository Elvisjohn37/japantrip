import styles from './App.module.scss'
import Desktop from './views/Desktop'
import Mobile from './views/Mobile'

const App = () => {
    const activeLang = 'mycn'

    return (
        <div className={styles.app}>
            <div className={styles.desktop}>
                <Desktop />
            </div>
            <div className={styles.mobile}>
                <Mobile />
            </div>
        </div>
    )
}

export default App
