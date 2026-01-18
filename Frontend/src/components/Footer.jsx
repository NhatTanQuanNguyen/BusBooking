import "../styles/Footer.css";
import LogoBoCongThuong from "../../public/bocongthuong.png"
const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-container">

            {/* FORM ĐĂNG KÝ */}
            <div className="footer-form">
            <h2>Đăng ký nhận thông tin mới nhất</h2>
            <p>Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn</p>

            <div className="footer-form-input">
                <input type="email" placeholder="Nhập địa chỉ email" />
                <button>Gửi thông tin</button>
            </div>
            </div>

            <hr />

            {/* THÔNG TIN */}
            <div className="footer-info">
            <div className="footer-col">
                <h4>THÔNG TIN LIÊN HỆ</h4>
                <p><strong>CÔNG TY TNHH THANHTAN</strong></p>
                <p>M.S.D.N: 4300339552</p>
                <p>Địa chỉ: Quảng Ngãi, Việt Nam</p>
                <p>Điện thoại: 0255.3820.820</p>
                <p>Email: dichvuthuexethanhtan@gmail.com</p>
                <p>Website: thanhtan.com.vn</p>
            </div>

            <div className="footer-col">
                <h4>Thông tin cần biết</h4>
                <ul>
                <li>Quy định chung</li>
                <li>Hướng dẫn mua vé</li>
                <li>Điều khoản thanh toán</li>
                <li>Chính sách bảo mật</li>
                </ul>
            </div>

            <div className="footer-col footer-cert">
                <img src={LogoBoCongThuong} alt="Bộ Công Thương" />
            </div>
            </div>

            <div className="footer-bottom">
            © Bản quyền thuộc về Thanh Tan – Tất cả vì khách hàng
            </div>

        </div>
        </footer>
    );
};

export default Footer;
