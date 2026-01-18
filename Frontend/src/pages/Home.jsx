import Banner from '../../public/banner_coluy.jpg'
import AnimeBanner from '../../public/animebanner.jpg'
import Advantages from '../components/Advantages'
import Header from '../components/Header'
import News from '../components/News'
import Promotion from '../components/Promotion'
import Services from '../components/Services'
import "../styles/Home.css"

const Home = () => {
    return (
        <>
            <section className="home-banner">
                <img src={AnimeBanner} alt="Banner" />

                <div className="banner-overlay">
                <h1>MUA VÉ XE TRỰC TUYẾN</h1>
                <p>Nhanh chóng, đơn giản, tiết kiệm thời gian</p>

                {/* booking box */}
                <div className="booking-box">
                    <div className="booking-form">
                    <div className="booking-field">
                        <label>Điểm đi</label>
                        <select>
                        <option>Quảng Ngãi</option>
                        </select>
                    </div>

                    <div className="booking-field">
                        <label>Điểm đến</label>
                        <select>
                        <option>Hồ Chí Minh</option>
                        </select>
                    </div>

                    <div className="booking-field">
                        <label>Ngày khởi hành</label>
                        <input type="date" />
                    </div>

                    <button className="booking-btn">Tìm vé</button>
                    </div>
                </div>
                </div>
            </section>
            <Advantages />
            <Promotion />
            <Services />
            <News />
        </>
    )
}

export default Home
