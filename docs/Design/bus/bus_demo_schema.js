
// Sample Bus Company
const sampleCompany = {
  companyId: "COMP001",
  name: "Phương Trang",
  email: "info@phuongtrang.vn",
  address: "123 ABC Street, TP.HCM",
  hotline: "1900-6067",
  taxCode: "0123456789",
  licenseNo: "GPLX-001",
  status: "active",
  info: {
    foundedYear: 2010,
    totalBuses: 150,
    activeBuses: 145,
    rating: 4.5,
    description: "Công ty vận tải hành khách uy tín"
  }
};

// Sample Seat Layout
const sampleLayout = {
  layoutId: "LAYOUT_40_SLEEPER",
  name: "40 Giường Nằm 2 Tầng",
  column: 3,
  row: 14,
  floors: 2,
  totalSeats: 40,
  layoutVersion: "v1.0",
  templates: [
    {
      seatNumber: "A1",
      floor: 1,
      positionRow: 1,
      positionColumn: 1,
      status: "active",
      seatType: "sleeper"
    },
    {
      seatNumber: "A2",
      floor: 1,
      positionRow: 1,
      positionColumn: 2,
      status: "active",
      seatType: "sleeper"
    },
    {
      seatNumber: "A3",
      floor: 1,
      positionRow: 1,
      positionColumn: 3,
      status: "active",
      seatType: "sleeper"
    },
    {
      seatNumber: "B1",
      floor: 2,
      positionRow: 1,
      positionColumn: 1,
      status: "active",
      seatType: "sleeper"
    }
    // ... 36 ghế khác
  ],
  info: {
    description: "Layout 2 tầng cho xe giường nằm cao cấp",
    recommended: true,
    popularity: 85,
    imageUrl: "/uploads/layouts/layout_40_sleeper.png"
  }
};

// Sample Bus
const sampleBus = {
  busId: "BUS001",
  license: "29A-12345",
  type: "sleeper",
  status: "active",
  model: "Hyundai Universe",
  manufactureYear: 2023,
  miles: 15000,
  regisDate: new Date("2023-01-15"),
  
  // Reference
  companyId: "COMP001",
  companyCache: {
    name: "Phương Trang",
    hotline: "1900-6067"
  },
  
  seatLayoutId: "LAYOUT_40_SLEEPER",
  seatInfo: {
    totalSeats: 40,
    floors: 2,
    layoutName: "40 Giường Nằm"
  },
  
  // Embedded documents
  documents: [
    {
      docType: "registration",
      docName: "Đăng kiểm",
      issueDate: new Date("2023-01-10"),
      expiryDate: new Date("2024-01-10"),
      status: "valid"
    },
    {
      docType: "insurance",
      docName: "Bảo hiểm xe",
      issueDate: new Date("2023-01-15"),
      expiryDate: new Date("2024-01-15"),
      status: "valid"
    }
  ],
  
  maintenanceHistory: [
    {
      maintainDate: new Date("2023-12-01"),
      completedDate: new Date("2023-12-02"),
      maintainType: "periodic",
      cost: 5000000,
      status: "completed",
      performBy: "Garage A",
      notes: "Bảo dưỡng định kỳ 10,000km",
      items: [
        { name: "Thay dầu máy", cost: 500000, description: "Dầu Castrol 5W-30" },
        { name: "Kiểm tra phanh", cost: 200000, description: "Kiểm tra hệ thống phanh ABS" },
        { name: "Bảo dưỡng động cơ", cost: 4300000, description: "Vệ sinh kim phun, làm mát động cơ" }
      ]
    },
    {
      maintainDate: new Date("2024-01-15"),
      completedDate: null,
      maintainType: "repair",
      cost: 2000000,
      status: "in_progress",
      performBy: "Garage B",
      notes: "Sửa hệ thống điều hòa",
      items: [
        { name: "Thay gas điều hòa", cost: 1500000, description: "Gas R134a" },
        { name: "Kiểm tra compressor", cost: 500000 }
      ]
    }
  ],
  
  info: {
    features: ["AC", "WiFi", "USB Charging", "Entertainment", "Reclining Seats"],
    color: "Trắng",
    lastInspection: new Date("2023-12-01"),
    nextInspection: new Date("2024-06-01"),
    averageRating: 4.7,
    totalTrips: 250,
  }
};
