import { useEffect, useState } from 'react'
import styles from './RollingPopup.module.scss'
import languages from '/src/languages.json'

const RollingPopup = () => {
    const activeLang = languages.activeLang
    const names = languages[activeLang].rollingPopup
    const namesLength = names.length
    const [displayedIndex, setDisplayedIndex] = useState([])
    const [activeIndex, setActiveIndex] = useState()

    const generateRandomIndex = () => {
        let randomIndex = Math.floor(Math.random() * namesLength)

        while (
            displayedIndex.includes(randomIndex) &&
            displayedIndex.length !== namesLength
        ) {
            randomIndex = Math.floor(Math.random() * namesLength)
        }
        return randomIndex
    }

    const setNewActiveIndex = () => {
        const randomIndex = generateRandomIndex()

        if (
            displayedIndex.length === namesLength &&
            displayedIndex.length !== 0
        ) {
            setDisplayedIndex([randomIndex])
        } else {
            setDisplayedIndex([...displayedIndex, randomIndex])
        }

        setActiveIndex(randomIndex)
    }

    let displayInterval = null

    useEffect(() => {
        displayedIndex.length === 0 && setNewActiveIndex()
        displayInterval = setTimeout(() => {
            setNewActiveIndex()
        }, 5000)

        return () => clearTimeout(displayInterval)
    }, [displayedIndex])

    return (
        <div className={styles.rollingPopup}>
            <span key={names[activeIndex]} className={styles.activeName}>
                {names[activeIndex]}
            </span>
        </div>
    )
}

export default RollingPopup
