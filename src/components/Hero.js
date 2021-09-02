import React from 'react'
import '../style/hero.css'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { hotFilm } from './data.js'
import HeroFilm from './HeroFilm.js'

import film1 from '../img/film1.jpg'
import film2 from '../img/film2.jpg'
import film3 from '../img/film3.jpg'
import film4 from '../img/film4.jpg'
import film5 from '../img/film5.jpg'
import film6 from '../img/film6.jpg'
import film7 from '../img/film7.jpg'
import film8 from '../img/film8.jpg'

let filmBgImg = [
    film1,
    film2,
    film3,
    film4,
    film5,
    film6,
    film7,
    film8
]

class Hero extends React.Component {
    constructor() {
        super()
        this.state = {
            filmIndex: 0,
            mount: true
        }
    }

    slideAuto = () => {
        if (window.location.pathname !== '/react-tubi-tv') {
            return
        }
        let filmIndex = this.state.filmIndex
        let length = hotFilm.length

        let film1 = document.querySelectorAll('.hero .film-img')[0]
        let film2 = document.querySelectorAll('.hero .film-img')[1]
        let film3 = document.querySelectorAll('.hero .film-img')[2]

        let hideLeft = document.createElement('div')
        hideLeft.classList.add('hide-left', 'film-img')
        hideLeft.innerHTML = `<img src=${hotFilm[filmIndex >= 7 ? filmIndex - 7 : length - 7 + filmIndex].url}
                                alt="" />`

        let hideRight = document.createElement('div')
        hideRight.classList.add('hide-right', 'film-img')
        hideRight.innerHTML = `<img src=${hotFilm[filmIndex >= 5 ? filmIndex - 5 : length - 5 + filmIndex].url}
                        alt="" />`

        let row = document.querySelector('.hero .current-film .row')
        let slideRight = document.querySelector('.hero .slide-right .right-content')

        row.appendChild(hideLeft)
        slideRight.appendChild(hideRight)

        film1.style.marginLeft = -65 + 'px'
        film3.style.marginBottom = -80 + 'px'
        film3.style.marginLeft = -65 + "px"


        hideLeft.classList.add('active')
        film2.classList.remove('active')

        setTimeout(() => {
            film1.remove()
            film3.remove()
            if (filmIndex >= hotFilm.length - 1) {
                filmIndex = 0
                this.setState({ filmIndex: filmIndex }, () => null)
                return
            }
            filmIndex += 1
            this.setState({ filmIndex: filmIndex }, () => null)
        }, 1000)
    }

    heroContentHandleClick = (target) => {
        target.classList.value && this.props.history.push('/movies/' + hotFilm[this.state.filmIndex].id)
    }

    render() {
        let length = hotFilm.length
        let filmIndex = this.state.filmIndex
        let bgImage = { backgroundImage: `linear-gradient(rgba(38, 38, 45, 0), rgb(38, 38, 45)), url('${filmBgImg[filmIndex]}')` }
        return (
            <section id="hero" className="hero" style={bgImage}>
                <div className="hero-wrap">
                    <div className="hero-content" onClick={(e) => this.heroContentHandleClick(e.target)}>
                        <div className="name-film flex">
                            <div className="play flex"><i className="fas fa-play"></i></div>
                            <Link to={`movies/${hotFilm[filmIndex].id}`} >
                                <h1>{hotFilm[filmIndex].name}</h1>
                            </Link>
                        </div>
                        <div className="slide-film flex">
                            <div className="slide-left flex">
                                <div className="current-film flex">
                                    <div className="row flex">
                                        <HeroFilm film={hotFilm[length - 1]} />
                                        <HeroFilm film={hotFilm[0]} active={'active'} />
                                    </div>
                                    <div className="film-info flex">
                                        <div className="left">
                                            <h6>{hotFilm[filmIndex].type}</h6>
                                            <p>{hotFilm[filmIndex].time}</p>
                                        </div>
                                        <Link to="/react-tubi-tv">TV-PG</Link>
                                    </div>
                                </div>

                            </div>
                            <div
                                className="watch-now"
                            >
                                <div className="link-wrap">
                                    <Link
                                    to={`/movies/${hotFilm[filmIndex].id}`}
                                    >Watch Now <span>FREE</span></Link>
                                </div>
                            </div>
                            <div className="slide-right flex">
                                <div className="right-content flex">
                                    <HeroFilm film={hotFilm[1]} />
                                    <HeroFilm film={hotFilm[2]} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
    componentDidMount() {
        let id = setInterval(() => {
            this.slideAuto()
            window.location.pathname !== '/react-tubi-tv' && clearInterval(id)
        }, 3000)
    }

}

export default withRouter(Hero)

