import { useState, useEffect } from 'react'
import styles from './PopUp.module.scss'
import redbutton from '/src/assets/images/redbutton.png'
import popupbox from '/src/assets/images/popupbox.png'
import envelope from '/src/assets/images/envelope.png'
import languages from '/src/languages.json'
import classnames from 'classnames'

const PopupBox = ({ contentData }) => {
    const contentDataArray = Object.keys(contentData)

    return (
        <div className={styles.popupBox}>
            <img className={styles.titleImage} src={redbutton} alt="" />
            <img src={popupbox} alt="" />
            <div className={styles.title}>{contentData?.title}</div>
            <div className={styles.content}>
                {contentDataArray.map(
                    (contentDataArr, index) =>
                        index !== 0 && (
                            <div key={index}>{contentData[contentDataArr]}</div>
                        )
                )}
            </div>
        </div>
    )
}

const PopUp = ({
    show = false,
    content = '',
    callback = () => null,
    restartInitialize = () => null,
    activeLang = '',
}) => {
    const openbutton = `/src/assets/images/${activeLang}/openbutton.png`
    const okbutton = `/src/assets/images/${activeLang}/okbutton.png`
    const queryString = window.location.search

    const [activeContent, setActiveContent] = useState(content)
    const [isWin, setIsWin] = useState(false)
    const [playerLife, setPlayerLife] = useState(3)
    let datas = languages[activeLang][isWin ? 'win' : 'loss']
    let howToPlayData = languages[activeLang].howToPlay
    let howToClaimData = languages[activeLang].howToClaim
    let prizePoolData = languages[activeLang].prizePool
    let howToJoinData = languages[activeLang].howToJoin
    let luckyDrawData = languages[activeLang].luckyDraw

    const initialContent = content

    useEffect(() => {
        setActiveContent(content)
    }, [content])

    const handleButtonOpen = () => {
        const gameResult = playerLife < 2 ? 1 : Math.floor(Math.random() * 2)
        setIsWin(gameResult)
        setPlayerLife((prev) => prev - 1)
        setActiveContent('result')
        callback(gameResult)
    }

    const handleRedirect = () => {
        location.href = `${datas.moneySite}/${queryString}`
    }

    useEffect(() => {
        !show && setActiveContent(initialContent)
    }, [show])

    return (
        <>
            {show ? (
                <div className={styles.popUp}>
                    {activeContent === 'howtoplay' ? (
                        <PopupBox contentData={howToPlayData} />
                    ) : activeContent === 'howtoClaim' ? (
                        <PopupBox contentData={howToClaimData} />
                    ) : activeContent === 'prizePool' ? (
                        <PopupBox contentData={prizePoolData} />
                    ) : activeContent === 'howToJoin' ? (
                        <PopupBox contentData={howToJoinData} />
                    ) : activeContent === 'luckyDraw' ? (
                        <PopupBox contentData={luckyDrawData} />
                    ) : activeContent === 'envelope' ? (
                        <div className={styles.envelopeContainer}>
                            <img src={envelope} alt="" />
                            <img
                                className={styles.openButton}
                                src={require(openbutton)}
                                onClick={handleButtonOpen}
                            />
                        </div>
                    ) : activeContent === 'result' ? (
                        <div
                            className={classnames([
                                styles.prizesResultContainer,
                                !isWin && styles.lossContent,
                            ])}
                        >
                            <img
                                className={styles.titleImage}
                                src={redbutton}
                                alt=""
                            />
                            {isWin ? (
                                <img
                                    className={styles.notWin}
                                    src={popupbox}
                                    alt=""
                                />
                            ) : (
                                <div className={styles.lossContainer}></div>
                            )}
                            <div className={styles.title}>{datas?.title}</div>
                            <div className={styles.content}>
                                <div
                                    className={classnames([
                                        styles.subTitle,
                                        isWin ? styles.win : styles.loss,
                                    ])}
                                >
                                    {datas?.subTitle}
                                </div>
                                <div className={styles.message}>
                                    {datas?.message.replace('#', playerLife)}
                                </div>
                            </div>
                            <div>
                                <img
                                    className={styles.okButton}
                                    src={require(okbutton)}
                                    onClick={
                                        isWin
                                            ? handleRedirect
                                            : restartInitialize
                                    }
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    )
}

export default PopUp
