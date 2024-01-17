import { useState, useEffect } from 'react'
import styles from './Mobile.module.scss'
import titlebar from '/src/assets/images/titlebar.png'
import firstsectionbackground from '/src/assets/images/firstsectionbackground.png'
import cloud from '/src/assets/images/cloud.png'

import depositbutton from '/src/assets/images/depositbutton.png'
import goldbutton from '/src/assets/images/goldbutton.png'
import redbutton from '/src/assets/images/redbutton.png'
import betslipicon from '/src/assets/images/betslipicon.svg'
import liveicon from '/src/assets/images/liveicon.svg'
import instagram from '/src/assets/images/instagram.png'
import x from '/src/assets/images/x.png'
import telegram from '/src/assets/images/telegram.png'
import facebook from '/src/assets/images/facebook.png'
import payment1 from '/src/assets/images/payment1.png'
import payment2 from '/src/assets/images/payment2.png'
import payment3 from '/src/assets/images/payment3.png'
import payment4 from '/src/assets/images/payment4.png'
import payment5 from '/src/assets/images/payment5.png'
import payment6 from '/src/assets/images/payment6.png'
import payment7 from '/src/assets/images/payment7.png'
import goldentree from '/src/assets/images/goldentree.png'
import handclicking from '/src/assets/images/handclicking.png'
import PopUp from './mobile/PopUp'
import classnames from 'classnames'
import languages from '/src/languages.json'
import { Menu } from 'react-float-menu'
import 'react-float-menu/dist/react-float-menu.css'
import { Link, animateScroll as scroll } from 'react-scroll'
import MembersWinning from './mobile/MembersWinning'
import RollingPopup from './mobile/RollingPopup'

const Mobile = () => {
    const activeLang = languages.activeLang
    const copyline = `/src/assets/images/${activeLang}/copyline.png`
    const luckbutton = `/src/assets/images/${activeLang}/luckbutton.png`
    const japantriplogo = `/src/assets/images/${activeLang}/japantriplogo.png`
    const joinnow = `/src/assets/images/${activeLang}/joinnow.png`
    const [showHowToPlay, setShowHowToPlay] = useState(false)
    const [startShake, setStartShake] = useState(false)
    const [startInitialize, setStartInitialize] = useState(false)
    const [showHand, setShowHand] = useState(false)
    const [showShadow, setShowShadow] = useState(false)
    const [showEnvelope, setShowEnvelope] = useState(false)
    const [disableClickable, setDisableClickable] = useState(false)
    const [showFullShadow, setShowFullShadow] = useState(false)
    const [activeContent, setActiveContent] = useState('')

    let clickTimeout

    const scrollUp = () => {
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
        document.documentElement.style.overflow = 'hidden'
    }

    const initializeTreeClick = () => {
        setStartInitialize(true)
        setShowHand(true)
        setShowShadow(true)
        scrollUp()
    }

    const restartInitialize = () => {
        initializeTreeClick()
        setDisableClickable(false)
        setShowEnvelope(false)
        setShowFullShadow(false)
    }

    const stopGame = () => {
        document.documentElement.style.overflow = 'unset'
        setStartShake(false)
        setShowHand(false)
        setStartInitialize(false)
        setShowEnvelope(false)
    }

    useEffect(() => {
        startShake &&
            (clickTimeout = setTimeout(() => {
                setStartShake(false)
                setShowEnvelope(true)
                setShowFullShadow(true)
                setActiveContent('envelope')
            }, 2000))
        return () => clearTimeout(clickTimeout)
    }, [startShake])

    return (
        <div className={styles.mobile}>
            <div
                className={classnames([
                    styles.floatingIcon,
                    !startInitialize && styles.show,
                ])}
            >
                <Link
                    to="secondSection"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                >
                    <Menu
                        dimension={150}
                        shape="circle"
                        startPosition="top right"
                        width={30}
                    >
                        <img src={require(japantriplogo)} alt="" />
                    </Menu>
                </Link>
            </div>
            {showShadow && (
                <div
                    onClick={() => {
                        if (!disableClickable) {
                            setShowShadow(false)
                            showHowToPlay && setShowHowToPlay(false)
                            startInitialize && setStartInitialize(false)
                            stopGame()
                            setShowFullShadow(false)
                        }
                    }}
                    className={classnames([
                        styles.shadow,
                        showFullShadow && styles.fullShadow,
                    ])}
                ></div>
            )}
            <PopUp
                activeLang={activeLang}
                callback={(value) => setDisableClickable(value)}
                restartInitialize={restartInitialize}
                show={showHowToPlay || showEnvelope}
                content={activeContent}
            />
            <div className={styles.titleBar}>
                <img src={titlebar} />
            </div>
            <img
                className={styles.firstSectionBackground}
                src={firstsectionbackground}
            />
            <div className={styles.goldenTreeContainer}>
                <div
                    className={classnames([
                        styles.clicker,
                        startInitialize && styles.show,
                    ])}
                    onClick={() => {
                        setStartShake(true)
                        setShowHand(false)
                    }}
                >
                    <img
                        src={handclicking}
                        className={classnames([showHand && styles.show])}
                        alt=""
                    />
                </div>
                <img
                    className={classnames([
                        styles.goldenTree,
                        startShake && styles.shake,
                        startInitialize && styles.show,
                    ])}
                    src={goldentree}
                />
            </div>
            <div className={styles.cloudContainer}>
                <img
                    className={classnames([
                        styles.cloud,
                        startInitialize && styles.show,
                    ])}
                    src={cloud}
                />
            </div>
            <div className={styles.copylineContainer}>
                <img
                    className={classnames([
                        styles.copyline,
                        startInitialize && styles.show,
                    ])}
                    src={require(copyline)}
                />
            </div>
            <div
                className={styles.luckButtonContainer}
                onClick={() => initializeTreeClick(true)}
            >
                <img className={styles.luckButton} src={require(luckbutton)} />
            </div>

            <div className={styles.redButtonsContainer}>
                <div
                    className={styles.howToPlayContainer}
                    onClick={() => {
                        setShowHowToPlay(true)
                        setShowShadow(true)
                        setActiveContent('howtoplay')
                        scrollUp()
                    }}
                >
                    <img src={redbutton} />
                    <span>{languages[activeLang].howToPlay.title}</span>
                </div>
                <div
                    className={styles.howToClaimContainer}
                    onClick={() => {
                        setShowHowToPlay(true)
                        setShowShadow(true)
                        setActiveContent('howtoClaim')
                        scrollUp()
                    }}
                >
                    <img src={redbutton} />
                    <span>{languages[activeLang].howToClaim.title}</span>
                </div>
                <div
                    className={styles.prizePoolContainer}
                    onClick={() => {
                        setShowHowToPlay(true)
                        setShowShadow(true)
                        setActiveContent('prizePool')
                        scrollUp()
                    }}
                >
                    <img src={redbutton} />
                    <span>{languages[activeLang].prizePool.title}</span>
                </div>
            </div>
            <div id="secondSection"></div>
            <div id="japanTripSection" className={styles.japanTripContainer}>
                <img className={styles.japanTripLogo} src={japantriplogo} />
                <div className={styles.goldButtonContainer}>
                    <div className={styles.depositContainer}>
                        <img
                            className={styles.depositButton}
                            src={depositbutton}
                        />
                        <span>{languages[activeLang].luckyDraw.title}</span>
                    </div>
                    <div
                        className={styles.howToJoinButton}
                        onClick={() => {
                            setShowHowToPlay(true)
                            setShowShadow(true)
                            setActiveContent('howToJoin')
                            scrollUp()
                        }}
                    >
                        <img
                            className={styles.goldButton}
                            src={goldbutton}
                            alt=""
                        />
                        <img className={styles.icon} src={betslipicon} />
                        <span>{languages[activeLang].howToJoin.title}</span>
                    </div>
                    <div
                        className={styles.luckDrawButton}
                        onClick={() => {
                            setShowHowToPlay(true)
                            setShowShadow(true)
                            setActiveContent('luckyDraw')
                            scrollUp()
                        }}
                    >
                        <img
                            className={styles.goldButton}
                            src={goldbutton}
                            alt=""
                        />
                        <img className={styles.icon} src={liveicon} />
                        <span>{languages[activeLang].luckyDraw.title}</span>
                    </div>
                </div>
            </div>
            <div className={styles.membersWinningContainer}>
                {activeLang !== '' && (
                    <MembersWinning activeLang={activeLang} />
                )}
            </div>
            <RollingPopup />
            <footer>
                <div className={styles.socialMedia}>
                    <span>{languages[activeLang].followUsOn}</span>
                    <div className={styles.images}>
                        <a href="https://www.facebook.com/2upmalaysia">
                            <img src={facebook} />
                        </a>
                        <a href="https://www.instagram.com/2upmalaysia">
                            <img src={instagram} />
                        </a>
                        <a href="https://t.me/Malaysia2UP">
                            <img src={telegram} />
                        </a>
                        <a href="https://twitter.com/2UPMalaysia">
                            <img src={x} />
                        </a>
                    </div>
                </div>
                <div className={styles.paymentMethod}>
                    <span>{languages[activeLang].paymentMethod}</span>
                    <div className={styles.images}>
                        <img src={payment1} />
                        <img src={payment2} />
                        <img src={payment3} />
                        <img src={payment4} />
                        <img src={payment5} />
                        <img src={payment6} />
                        <img src={payment7} />
                    </div>
                </div>
            </footer>
            <div className={styles.ftdBonus}>
                <span>{languages[activeLang].ftdBonus}</span>
                <img src={require(joinnow)} alt="" />
            </div>
        </div>
    )
}

export default Mobile
