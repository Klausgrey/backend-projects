# Employee Management System — Requirements & API Spec (v2)

> Changelog from v1: Manager role removed — only **Admin** and **Employee** remain.
> Admin absorbs everything Manager used to do (approvals, department oversight).
> Added `isAdmin` flag on Employee to drive role assignment at registration.
> Registration is a two-step flow: Admin creates the Employee record first,
> then a User account is linked to it separately via email match.

## 1. Core Entities

- **User** — login credentials only (email, password hash, role). One-to-one with Employee.
- **Employee** — the actual HR record (name, job info, salary, department, `isAdmin` flag)
- **Department** — just a name; no manager field
- **Role** (`admin`, `employee`) — stored on User, derived server-side from `Employee.isAdmin`
- **Attendance** — daily clock-in/out records
- **LeaveRequest** — leave applications + approval status (approved/rejected by Admin only)
- **Payroll** (stretch) — salary records per pay period

---

## 2. Functional Requirements

Numbered so they're easy to reference against endpoints/tests later.

### Auth
- FR-1: The system must allow an Admin to create an Employee record (no login credentials yet).
- FR-2: The system must allow a person to register a User account by providing an email that matches an existing Employee record, plus a password.
- FR-3: The system must reject registration if no Employee record exists with the given email.
- FR-4: The system must reject registration if a User account already exists for that Employee.
- FR-5: The system must derive the new User's role from `Employee.isAdmin` — never from client-supplied input.
- FR-6: The system must allow a registered User to log in with email + password.
- FR-7: The system must allow a logged-in User to log out (invalidate refresh token).
- FR-8: The system must allow a logged-in User to fetch their own profile (`/auth/me`).

### Employee Management
- FR-9: Admin can create an employee.
- FR-10: Admin can update an employee.
- FR-11: Admin can delete (soft-delete/deactivate) an employee.
- FR-12: Admin can view all employees.
- FR-13: Employee can view their own profile only.
- FR-14: Employee can view their own payroll only.

### Department Management
- FR-15: Admin can create a department.
- FR-16: Admin can update a department.
- FR-17: Admin can delete a department.
- FR-18: Employee must be assigned to a department.

### Attendance
- FR-19: Employee can clock in.
- FR-20: Employee can clock out.
- FR-21: Employee can view their own attendance history.
- FR-22: Admin can view attendance records for any/all employees.

### Leave Management
- FR-23: Employee can submit a leave request (type, start date, end date, reason).
- FR-24: Employee can view their own leave request history/status.
- FR-25: Employee can cancel their own leave request while it's still pending.
- FR-26: Admin can view all leave requests.
- FR-27: Admin can approve or reject a leave request.
- FR-28: The system must reject a status change on a leave request that has already been reviewed (no re-approving/re-rejecting).

### Payroll (stretch)
- FR-29: Admin can generate payroll for a period.
- FR-30: Employee can view their own payslips only.

### System Bootstrap
- FR-31: A seed script must create exactly one default Admin (Employee + User) if no admin exists yet, to solve the first-login chicken-and-egg problem.
- FR-32: The seed script must skip creation if an admin already exists (no duplicates on re-run).

---

## 3. Informational Requirements (data each entity must hold)

- **User**: email, passwordHash, role (`admin`/`employee`), refreshToken, employeeId (ref, unique)
- **Employee**: firstName, lastName, email (unique), phone, dob, address, hireDate, jobTitle, salary, isActive, isAdmin, department (ref)
- **Department**: name (unique) — no manager field
- **Attendance**: employee (ref), date, clockIn, clockOut
- **LeaveRequest**: employee (ref), type, startDate, endDate, reason, status — no `reviewedBy` (no reviewer role to track against; revisit if audit trail is ever required)
- **Payroll**: employee (ref), periodStart, periodEnd, baseSalary, deductions, netPay

---

## 4. Non-Functional Requirements
- Passwords hashed with bcrypt — never stored or logged in plain text
- Input validation via Zod on every write endpoint
- Pagination on all list endpoints
- Consistent error response shape: `{ success, message, errors? }`
- Rate limiting on auth endpoints
- `role` is never accepted from client input on register — always derived server-side

---

## 5. API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public (email must match existing Employee) | Create User linked to an existing Employee |
| POST | `/api/auth/login` | Public | Returns access token |
| POST | `/api/auth/logout` | Authenticated | Invalidate refresh token |
| GET | `/api/auth/me` | Authenticated | Return current logged-in user + profile |

### Employees
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/employees` | Admin | List employees (paginated) |
| GET | `/api/employees/:id` | Admin, Self | Get single employee |
| POST | `/api/employees` | Admin | Create employee |
| PATCH | `/api/employees/:id` | Admin, Self (limited fields) | Update employee |
| DELETE | `/api/employees/:id` | Admin | Deactivate (soft delete) |

### Departments
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/departments` | Authenticated | List all departments |
| GET | `/api/departments/:id` | Authenticated | Get department + its employees |
| POST | `/api/departments` | Admin | Create department |
| PATCH | `/api/departments/:id` | Admin | Update department name |
| DELETE | `/api/departments/:id` | Admin | Delete department |

### Attendance
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/attendance/clock-in` | Employee | Record clock-in |
| POST | `/api/attendance/clock-out` | Employee | Record clock-out |
| GET | `/api/attendance/me` | Employee | View own attendance history |
| GET | `/api/attendance` | Admin | View all attendance, filter by date/employee |

### Leave Requests
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/leave` | Employee | Submit leave request |
| GET | `/api/leave/me` | Employee | View own leave requests |
| GET | `/api/leave` | Admin | View all leave requests |
| PATCH | `/api/leave/:id/status` | Admin | Approve/reject (only if still pending) |
| DELETE | `/api/leave/:id` | Employee (own, if still pending) | Cancel request |

### Payroll (stretch)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/payroll/me` | Employee | View own payslips |
| GET | `/api/payroll` | Admin | View all payroll records |
| POST | `/api/payroll/generate` | Admin | Trigger payroll run for a period |

---

## 6. Data Model (Mongoose, quick reference)

```
User         { id, email, passwordHash, role[admin|employee], employeeId (ref, unique), refreshToken }
Employee     { id, firstName, lastName, email (unique), phone, dob, address, hireDate,
               jobTitle, salary, isActive, isAdmin, department (ref) }
Department   { id, name (unique) }
Attendance   { id, employee (ref), date, clockIn, clockOut }
LeaveRequest { id, employee (ref), type, startDate, endDate, reason, status }
Payroll      { id, employee (ref), periodStart, periodEnd, baseSalary, deductions, netPay }
```

---

## 7. Build Order

1. DB connection + all Mongoose models
2. Employee CRUD (built auth-less first, locked down once auth exists)
3. Auth: register (email-match) → login → validateToken/requireAdmin middleware
4. Seed script for default Admin (solves first-admin bootstrap problem)
5. Lock down Employee + Department routes with auth middleware
6. Department CRUD
7. Attendance
8. Leave requests
9. Payroll (if time permits)

---

## 8. Decisions Log (things settled during the build, so nobody re-litigates them)
- No Manager role — Admin handles all approvals and department oversight.
- Registration is two steps: Admin creates Employee → person registers a User linked to it by matching email. No open self-registration that creates a brand-new Employee.
- `isAdmin` lives on Employee, not on User — role is derived, not stored twice.
- First admin is created via a one-time seed script, not through the API, since no admin exists yet to create one via `/api/employees`.
- `LeaveRequest` has no `reviewedBy` field for now — there's only one reviewing role (Admin), so tracking *which* admin isn't required by current functional requirements. Revisit if an audit trail becomes a requirement.
- A leave request can only be reviewed once — status changes are blocked once it's no longer `pending`.