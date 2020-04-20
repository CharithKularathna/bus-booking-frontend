import React from 'react'
import classes from './Slider.css'
import { NavLink } from 'react-router-dom'

const slider = () => {
    return(
        <div id="carouselIndicators" className={"carousel slide " + classes.Carousel}
        data-ride="carousel" data-interval="5000">
            <ol className="carousel-indicators">
                <li data-target="#carouselIndicators" data-slide-to='0'
                className='active'></li>
                <li data-target="#carouselIndicators" data-slide-to='1'
                className=''></li>
                {/*<li data-target="#carouselIndicators" data-slide-to='2'
                className=''></li>   */} 
            </ol>
            <div className="carousel-inner">
                <div className={"carousel-item active "+ classes.SliderItem1 + ' ' + classes.CarouselItem}>
                    <div className={"carousel-caption text-center "+ classes.Caption}>
                        <h1>Reserve Your Seat For the Long Ride</h1>
                        <h3>Create an Account for free and reserve seats by paying online</h3>
                        <NavLink to='/signin' className="btn btn-outline-light btn-lg">Get Started</NavLink>
                    </div>
                </div>
                <div className={"carousel-item "+ classes.SliderItem2 + ' ' + classes.CarouselItem}>
                    <div className={"carousel-caption text-center "+ classes.Caption}>
                    <h1>Standing in a Bus without a Seat?</h1>
                    <h3>Why miss a seat when you can book one beforhand?</h3>
                    <NavLink to='/signin' className="btn btn-outline-light btn-lg">Get Started</NavLink>
                    </div>
                </div>
                {/*<div className={"carousel-item "+ classes.SliderItem3 + ' ' + classes.CarouselItem}></div>*/}
            </div>
        </div>
    )

}

export default slider;