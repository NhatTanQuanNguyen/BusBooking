
const Staff = {
    id: "staff_001",
    partnerId: "partner_01",
    branchId: "branch_01",

    role: "roleId",          // quyền
    status: "active",        // active | inactive

    detail: {},              // thông tin cá nhân
    info: {}                 // metadata
};


const Shift = {
    id: "shift_morning",
    timeStart: "06:00",
    timeEnd: "14:00",
    workTypes: ["driver", "receptionist", "loader"]
};


const ShiftPlan = {
    week: "2026-W05",
    staffId: Staff.id,

    registrations: [
        {
        date: "2026-02-02",
        shiftId: Shift.id,
        workType: "driver",
        status: "pending"    // pending | approved | rejected
        },
        {
        date: "2026-02-04",
        shiftId: Shift.id,
        workType: "driver",
        status: "approved"
        }
    ]
};

const Assignment = {
    id: "assign_1001",
    staffId: Staff.id,
    date: "2026-02-04",

    shiftId: Shift.id,
    workType: "driver",

    source: "self-register", // self-register | manual | auto
    isDeleted: false
};

const SalaryPolicy = {
    id: "salary_driver_shift",
    workType: "driver",
    unit: "perShift",        // perShift | perTrip | perMonth
    baseRate: 300000
};

const Payroll = {
    staffId: Staff.id,
    period: "2026-02",

    totalShift: 18,
    totalTrip: 12,
    totalAmount: 5400000
};


const AuditLog = {
    id: "audit_0001",

    actor: {
        id: "staff_001",        // ai thao tác
        type: "staff"           // staff | system
    },

    action: "UPDATE",         // CREATE | UPDATE | DELETE | APPROVE | REJECT

    target: {
        collection: "Assignment", // Staff | Shift | Assignment | Payroll | ...
        id: "assign_1001"
    },

    before: null,             // snapshot trước (optional)
    after: null,              // snapshot sau (optional)

    diff: {
        shiftId: {
        from: "shift_morning",
        to: "shift_night"
        }
    },

    reason: "swap shift",     // optional
    ipAddress: "127.0.0.1",   // optional
    userAgent: "Mozilla/5.0", // optional

    createdAt: "2026-02-04T09:00:00Z"
};


module.exports = {
    Staff,
    Shift,
    ShiftPlan,
    Assignment,
    SalaryPolicy,
    Payroll,
    AuditLog
};
