const ItemBlog = ({ href, image, title, summary }) => {
return (
    <div className="col-lg-7">
        <div className="card border-0">
            {/* Thumbnail */}
            <a href={href} title={title} className="d-block position-relative overflow-hidden rounded">
            <img
                src={image}
                alt={title}
                className="img-fluid w-100"
                style={{ aspectRatio: "3 / 2", objectFit: "cover" }}
            />
            </a>

            {/* Content */}
            <div className="pt-3">
            <h3 className="fw-bold mb-2">
                <a
                href={href}
                title={title}
                className="text-decoration-none text-dark d-block text-truncate"
                style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
                >
                {title}
                </a>
            </h3>

            <p className="text-secondary text-start">
                {summary}
            </p>
            </div>
        </div>
        </div>
    );
};

export default ItemBlog;
