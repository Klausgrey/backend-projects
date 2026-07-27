# Employee Management System — Requirements & API Spec

## 1. Core Entities

- **User** — login credentials, tied to an Employee, has a role
- **Employee** — personal + employment info
- **Department**
- **Role** (admin, hr, manager, employee)
- **Attendance** — daily clock-in/out records
- **LeaveRequest** — leave applications + approval status
- **Payroll** (optional/stretch) — salary records per pay period

---

## 2. Functional Requirements

### Auth & Access Control
- Users register/login via email + password (JWT-based, access + refresh tokens)
- Role-based access control (RBAC): Admin > Manager > Employee
- Admin can create/manage all employees, departments, and roles
- Manager can view/manage employees within their own department only
- Employee can view/edit only their own profile, attendance, and leave requests

### Employee Management
- CRUD for employee records (name, email, phone, DOB, address, hire date, job title, salary, department, manager)
- Soft-delete employees (deactivate, not hard delete) to preserve history

### Department Management
- CRUD for departments
- Assign a manager to a department
- List employees per department

### Attendance
- Employee clocks in/out (timestamped)
- Manager/Admin can view attendance logs, filter by employee/date range
- Auto-flag late arrivals or missed clock-outs (stretch)

### Leave Management
- Employee submits leave request (type: sick/annual/casual, start date, end date, reason)
- Manager/Admin approves or rejects
- Track leave balance per employee (stretch)

### Payroll (stretch goal)
- Generate monthly payroll based on salary, deductions, attendance
- Employee can view their own payslips

---

## 3. Non-Functional Requirements
- Passwords hashed (bcrypt)
- Input validation (Zod recommended, given your stack)
- Pagination on all list endpoints
- Consistent error response shape: `{ success, message, errors? }`
- Rate limiting on auth endpoints
- Audit logging on sensitive actions (optional, good resume flex)

---

## 4. API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Admin only (or open, your call) | Create user + linked employee |
| POST | `/api/auth/login` | Public | Returns access + refresh token |
| POST | `/api/auth/refresh` | Public (valid refresh token) | Issue new access token |
| POST | `/api/auth/logout` | Authenticated | Invalidate refresh token |
| GET | `/api/auth/me` | Authenticated | Return current logged-in user + profile |

### Employees
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/employees` | Admin, Manager (scoped) | List employees (paginated, filterable by department) |
| GET | `/api/employees/:id` | Admin, Manager (scoped), Self | Get single employee |
| POST | `/api/employees` | Admin | Create employee |
| PATCH | `/api/employees/:id` | Admin, Self (limited fields) | Update employee |
| DELETE | `/api/employees/:id` | Admin | Deactivate (soft delete) |

### Departments
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/departments` | Authenticated | List all departments |
| GET | `/api/departments/:id` | Authenticated | Get department + its employees |
| POST | `/api/departments` | Admin | Create department |
| PATCH | `/api/departments/:id` | Admin | Update department (name, manager) |
| DELETE | `/api/departments/:id` | Admin | Delete department |

### Attendance
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/attendance/clock-in` | Employee | Record clock-in |
| POST | `/api/attendance/clock-out` | Employee | Record clock-out |
| GET | `/api/attendance/me` | Employee | View own attendance history |
| GET | `/api/attendance` | Admin, Manager (scoped) | View all/team attendance, filter by date/employee |

### Leave Requests
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/leave` | Employee | Submit leave request |
| GET | `/api/leave/me` | Employee | View own leave requests |
| GET | `/api/leave` | Admin, Manager (scoped) | View team/all leave requests |
| PATCH | `/api/leave/:id/status` | Admin, Manager (scoped) | Approve/reject |
| DELETE | `/api/leave/:id` | Employee (own, if still pending) | Cancel request |

### Payroll (stretch)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/payroll/me` | Employee | View own payslips |
| GET | `/api/payroll` | Admin | View all payroll records |
| POST | `/api/payroll/generate` | Admin | Trigger payroll run for a period |

---

## 5. Suggested Data Model (Prisma-style, quick reference)

```
User        { id, email, passwordHash, role, employeeId, refreshToken? }
Employee    { id, firstName, lastName, phone, dob, address, hireDate,
              jobTitle, salary, isActive, departmentId, managerId }
Department  { id, name, managerId }
Attendance  { id, employeeId, clockIn, clockOut, date }
LeaveRequest{ id, employeeId, type, startDate, endDate, reason, status, reviewedBy }
```

---

## 6. Build Order Suggestion
1. Auth (register/login/refresh) + RBAC middleware
2. Employee CRUD + Department CRUD
3. Attendance
4. Leave requests
5. Payroll (if time permits)

This order lets you have a demoable slice (auth + employees) early, which matters for a cohort/portfolio project.