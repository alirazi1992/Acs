# ✅ ASC Processes Tab – Development Progress (Frontend)

## 📅 Date: 2025-07-30
### 👨‍💻 Developer: Ali Razi
### 🔧 Tech Stack: Next.js (App Router), TypeScript, TailwindCSS, Headless UI, React Hook Form, Yup

---

## ✅ Features Completed

### ✅ 1. Processes Tab Base Structure
- Created new route: `/app/app/Home/process/processes/page.tsx`
- Integrated `MyCustomComponent` and maintained RTL layout
- Created `ProcessesContainer` to manage state and display logic

---

### ✅ 2. Modal-Based "ثبت فرآیند"
- Replaced inline form with a modal using Headless UI `<Dialog />`
- Modal appears when clicking top-right ➕ `افزودن فرآیند`
- Designed clean modal layout with RTL support
- Only one field included: `نام فرآیند`

---

### ✅ 3. API Integration with POST
- Connected form submission to `/api/process` (App Router API route)
- API receives `POST` request and returns `200 OK` if `name` is provided
- On `200` response:
  - Modal closes
  - New process is added to top of the table (index `0`)

---

### ✅ 4. Table Display with Search, Delete, Pagination
- Table only appears after valid processes exist
- Added search bar (top-left) with real-time filtering
- Added delete button in each row:
  - Deletes item from state (mocked for now)
  - Will later connect to API `DELETE /api/process/:id`
- Added pagination:
  - Syncs with search results
  - Navigation buttons below table

---

## ✅ Folder Structure Used

app/

└── app/

└── Home/

└── process/

└── processes/

├── page.tsx

└── _components/

├── ProcessesContainer.tsx

├── ProcessTable.tsx

├── ProcessModal.tsx

└── ModuleItem.tsx (legacy)

