import "../styles/Advantages.css"

const Advantages = () => {
    return (
        <section className="advantages">
        <div className="advantages-list">

            <div className="adv-card">
            <div className="adv-icon">⚡</div>
            <h4>Dịch vụ tốt nhất</h4>
            <p>
                Phương châm: Tất cả vì khách hàng, chúng tôi
                luôn cố gắng đem đến trải nghiệm tuyệt vời nhất
            </p>
            </div>

            <div className="adv-card">
            <div className="adv-icon">🌍</div>
            <h4>Đi đến mọi miền tổ quốc</h4>
            <p>
                Với hơn 70 đầu xe, xuất bến linh hoạt
                đảm bảo mọi nhu cầu của Quý khách
            </p>
            </div>

            <div className="adv-card">
            <div className="adv-icon">💬</div>
            <h4>Hỗ trợ tận tình</h4>
            <p>
                Luôn lấy khách hàng làm gốc trong
                tất cả các khiếu nại
            </p>
            </div>

        </div>
        </section>
    )
}

export default Advantages
