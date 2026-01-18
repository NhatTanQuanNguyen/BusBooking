import "../styles/Services.css"
import Service1 from "../../public/service1.jpg"
import Service2 from "../../public/service2.jpg"
import Service3 from "../../public/service3.jpg"

const Services = () => {
    return (
        <section className="services">
        <h2 className="section-title">Dịch vụ</h2>

        <div className="services-list">
            <div className="service-card">
            <img src={Service1} alt="Vận tải hàng hóa" />
            <span>Vận tải hàng hóa</span>
            </div>

            <div className="service-card">
            <img src={Service2} alt="Vận tải đường biển" />
            <span>Vận tải đường biển</span>
            </div>

            <div className="service-card">
            <img src={Service3} alt="Dịch vụ xe hợp đồng" />
            <span>Dịch vụ xe hợp đồng</span>
            </div>
        </div>
        </section>
    )
}

export default Services
