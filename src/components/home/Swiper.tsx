import { Swiper as SwiperReact, SwiperSlide } from "swiper/react"; // Assurez-vous que Swiper est importé correctement
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SwiperProps {
    images: string[]; // Tableau d'URL des images
}

const Swiper = ({ images }: SwiperProps) => {
    return (
        <figure className="w-full">
            <SwiperReact
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation={{
                    nextEl: ".custom-swiper-button-next",
                    prevEl: ".custom-swiper-button-prev",
                }}
                className="w-full h-[350px]"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="w-full">
                        <div className="relative w-full h-full">
                            <img
                                src={`http://localhost:8080/images/${image}`}
                                alt={`Image ${index + 1}`}
                                className="rounded-2xl h-full w-full object-cover max-h-[350px]"
                            />
                        </div>
                    </SwiperSlide>
                ))}
                <div className="custom-swiper-button-next">
                    <FaChevronRight />
                </div>
                <div className="custom-swiper-button-prev">
                    <FaChevronLeft />
                </div>
            </SwiperReact>
        </figure>
    );
};

export default Swiper;
