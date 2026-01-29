const api_keys = {
    api_key_id: "jadhahasads...",
    company_id: "kjusauais",
    api_key_hash: "djahdaadsh...",
    status: "enabled",      // enabled | disabled | revoked
    scopes: ["read", "create", "update", "delete"],

    limits: {
        rate_limit_per_minute: 1000,
        daily_quota: 100000
    },

    last_used_at: "2025-06-20T10:15:30Z",
    createdAt: "2025-01-15T08:00:00Z"
}

const info_company = {
    company_id: "kjusauais",
    brand_name: "Phương Trang",
    legal_entity_{               // Thông tin pháp lý
        full_name: "Công ty TNHH Vận Tải Phương Trang"
        address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
        tax_code: "0101234567",
    }
}

const service_config = {
    subdomain: "phuongtrang",   //phuongtrang.busbooking.vn
    api_key_hash: "djahdaadsh...",
    api_status: "enabled",      // enabled | disabled | revoked
    allowed_ips: ["1.2.3.4", "5.6.7.8"],   // chỉ những ip được đăng kí mới có quyền gọi API 
    webhook_url: "https://api.thuanthao.vn/callback"
}

const subscription = {
    plan_id: "pro",               // basic | pro 
    status: "active",             // active | past_due | trialing | suspended
    expires_at: "2026-12-31T23:59:59Z",
    quotas: {                     // giới hạn sử dụng 
        max_buses: 50,            // quản lý tối đa 50 xe
        max_routes: 20,           // quản lý tối đa 20 tuyến
        api_calls_per_month: 100000
    }
}

const settings = {
    timezone: "Asia/Ho_Chi_Minh",
    currency: "VND",
    supported_bus_types: ["sleeper", "seater", "limousine"],
    features_enabled: ["sms_notifications", "e_wallet_payments", "seat_selection"]

    createdAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-06-20T14:30:00Z"
}


const apiKey_log = {
    log_id: "adsads...",
    company_id: "kjusauais", // Link tới nhà xe
    api_key_id: "djahdaadsh...", // Link tới chìa khóa đã dùng
    endpoint: "/api/v1/bus-search",
    method: "GET",
    status_code: 200,
    ip_address: "1.2.3.4",
    response_time: 120, // (ms) 
    created_at: "2025-06-20T10:20:30Z"
}

models.export = {
    api_keys,
    info_company,
    service_config,
    subscription,
    settings,
    apiKey_log
}

