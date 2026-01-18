import "../styles/Promotion.css"
import PromoImg from "../../public/promo.png" // đổi tên ảnh theo bạn

const Promotion = () => {
  return (
    <section className="promotion">
      <img src={PromoImg} alt="Tổng đài đặt vé" />
    </section>
  )
}

export default Promotion
