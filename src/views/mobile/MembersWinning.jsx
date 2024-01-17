import styles from './MembersWinning.module.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const MembersWinning = ({ activeLang = '' }) => {
    const testimonialbg = `/src/assets/images/${activeLang}testimonialbg.png`
    const testimonial1 = `/src/assets/images/${activeLang}testimonial1.png`
    const testimonial2 = `/src/assets/images/${activeLang}testimonial2.png`
    const testimonial3 = `/src/assets/images/${activeLang}testimonial3.png`

    return (
        <div className={styles.membersWinning}>
            <img className={styles.testimonialBg} src={require(testimonialbg)} alt="" />
            <Carousel
                swipeable
                infiniteLoop
                showThumbs={false}
                renderArrowPrev={() => false}
                renderArrowNext={() => false}
                showStatus={false}
                autoPlay={true}
            >
                <div>
                    <img src={require(testimonial1)} />
                </div>
                <div>
                    <img src={require(testimonial2)} />
                </div>
                <div>
                    <img src={require(testimonial3)} />
                </div>
            </Carousel>
        </div>
    )
}

export default MembersWinning
