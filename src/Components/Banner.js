import { Slide } from 'react-slideshow-image'

function Banner() {

    const slideImages = [
        'https://pccfw.org/wp-content/uploads/beach-volleyball-web-banner.jpg',
        'https://www.freewebheaders.com/wp-content/gallery/chess/chess-recreation-header-6614-1024x300.jpg',
        'https://www.freewebheaders.com/wp-content/gallery/football/black-white-foot-ball-on-green-grass-background-header.jpg'
    ]

    const slides = slideImages.map(imageUrl => {
        return (
            <div className='banner-image'>
                <div style={{'backgroundImage': `url(${imageUrl})`, height: '20vw'}}>
                    <span> Get Started By Signing Up! </span>
                </div>
            </div>
        )
    })

    return (
        <div id='slideshow' style={{margin: 'auto', height: '20vw'}}>
            <Slide>
                {slides}
            </Slide>
        </div>
        
    );
}
 
export default Banner;
