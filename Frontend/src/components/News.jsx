import "../styles/News.css"
import news1 from "../../public/news1.jpg"
import news2 from "../../public/news2.jpg"
import news3 from "../../public/news1.jpg"
const News = () => {
    return (
        <section className="news">
        <h2>Tin mới nhất</h2>

        <div className="news-list">
            <div className="news-card">
                <img src={news1} alt="Tin 1" />
                <h4> 🧧🧧🧧 Thông báo đăng ký giữ chỗ vé xe tết Bính Ngọ 2026 🧧🧧🧧
                </h4>
                <p>Nhà xe Chín Nghĩa thông báo lịch nghỉ Tết...</p>
            </div>

            <div className="news-card">
                <img src={news2} alt="Tin 2" />
                <h4>
                    🧧🧧🧧 Khai xuân như ý đón lộc đầu năm 🧧🧧🧧
                </h4>
                <p>Khách hàng đặt vé online được giảm giá...</p>
            </div>

            <div className="news-card">
                <img src={news3} alt="Tin 3" />
                <h4>Thông báo nâng cấp dòng xe LIMOSINE 24 phòng</h4>
                <p>Nhà xe mở thêm tuyến Quảng Ngãi – Đà Nẵng...</p>
            </div>
        </div>
        </section>
    )
}

export default News
