import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

export default function Memories() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    const images = ["/home/r.jpg", "/home/n.jpg", "/home/m.jpg", "/google.png", "/home/r.jpg", "/home/r.jpg", "/home/r.jpg"]

    return (
        <div className="py-12">
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2 className="text-3xl font-semibold text-center mb-6">Memories with Alumni</h2>
            <br />
            <br />
            <br />
            <div className="max-w-3xl mx-auto">
                <Slider {...settings}>
                    {images.map((a, index) => (
                        <div key={index} className="px-2">
                            <img
                                src={a}
                                alt={`Memory ${index + 1}`}
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}
