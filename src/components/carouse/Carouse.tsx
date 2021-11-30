import React from 'react';
import Slider from 'react-slick';

function Carouse() {
    const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

    return (
		<div>
			<div>2</div>
			<Slider {...settings}>
				<div>
					<img src={'./logo192.png'} />
				</div>
				<div>
					<img src={'./logo512.png'} />
				</div>
			</Slider>
		</div>
	);
}

export default Carouse;
