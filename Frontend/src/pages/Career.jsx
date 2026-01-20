import ItemBlog from "../components/item-blog";
import "../styles/Career.css";
import CareerImage from "../../public/Career.jpg";

const Career = () => {
    return (
        <div className="container career">
        <div className="row g-4">
            {[...Array(4)].map((_, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                <ItemBlog
                href="/Tuyen-dung/tuyen-dung-tai-xe-bang-e-19.html"
                image={CareerImage}
                title="THÔNG BÁO TUYỂN DỤNG TÀI XẾ LÁI XE BẰNG E"
                summary="Nhằm đáp ứng nhu cầu mở rộng kinh doanh, Công ty TNHH Chín Nghĩa"
                />
            </div>
            ))}
        </div>
        </div>
    );
};

export default Career;
