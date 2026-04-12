# Implementation Plan: TypeScript Migration

## Overview

Two-phase migration: (1) delete legacy `.js` backend files and verify `tsc` compiles cleanly, then (2) convert all frontend `.jsx`/`.js` files to `.tsx`/`.ts` with proper types, add tooling, and delete the originals.

## Tasks

- [x] 1. Delete legacy backend `.js` files
  - For each `.js` file that has a `.ts` counterpart, delete the `.js` file
  - Files to delete: `backend/server.js`, `backend/swagger.js`, `backend/config/db.js`, `backend/controller/commentController.js`, `backend/controller/issueController.js`, `backend/controller/notificationController.js`, `backend/controller/userController.js`, `backend/middleWares/auth.js`, `backend/models/Issue.js`, `backend/models/Notification.js`, `backend/models/User.js`, `backend/models/coments.js`, `backend/route/commentRouter.js`, `backend/route/issueRouter.js`, `backend/route/notificationRouter.js`, `backend/route/userRoute.js`
  - Do NOT delete any `.js` file that has no `.ts` counterpart
  - _Requirements: 1.1, 1.2, 1.3, 10.1_

- [x] 2. Verify and fix backend TypeScript compilation
  - [x] 2.1 Fix any type errors in backend `.ts` files so `tsc --noEmit` passes with zero errors
    - Ensure all Express route handlers have explicit return type annotations (e.g., `void`, `Promise<void>`)
    - Ensure all Mongoose schemas use typed generics (e.g., `new Schema<IModel>(...)`)
    - Replace any explicit `: any` with specific types or `unknown`
    - Ensure `req.user` is declared via module augmentation in `middleWares/auth.ts` or a `types/express.d.ts`
    - Ensure `process.env` accesses use `!` assertion or explicit undefined checks
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 2.2 Write property test: no `.js` files remain in backend
    - **Property 1: No legacy .js files remain in backend**
    - **Validates: Requirements 1.1, 10.1**

- [x] 3. Checkpoint — backend clean
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Add frontend TypeScript tooling
  - [x] 4.1 Create `frontend/tsconfig.json` with `jsx: "react-jsx"`, `strict: true`, `moduleResolution: "Bundler"`, `noEmit: true`, `allowImportingTsExtensions: true`
    - _Requirements: 4.4, 5.1_

  - [x] 4.2 Add `typescript` and `@types/leaflet` to `frontend/package.json` devDependencies
    - Add `"typescript": "^5.0.0"` (or latest stable) to devDependencies
    - Add `"@types/leaflet": "^1.9.0"` to devDependencies
    - _Requirements: 5.3, 7.1, 7.3_

- [x] 5. Convert non-component frontend files to TypeScript
  - [x] 5.1 Convert `frontend/src/images/image.js` → `image.ts`
    - No type changes needed; just rename and verify exports
    - _Requirements: 4.2_

  - [x] 5.2 Convert `frontend/src/style.js` → `style.ts`
    - Add explicit type annotation: `export const style: Record<string, string> = { ... }`
    - _Requirements: 4.2_

- [x] 6. Convert `StoreContext` to TypeScript
  - [x] 6.1 Create `frontend/src/context/store.tsx` with full `StoreContextValue` interface
    - Define `Issue`, `NotificationItem`, `User` interfaces
    - Define `StoreContextValue` interface covering all 28 context keys (url, token, role, showLogin, setShowLogin, updateTime, id, notifications, getNotification, getReport, deleteNotification, deleteIssue, getAllReports, markAsRead, report, allReports, getUser, user, logout, setToken, userName, setUserName, setId, setRole, showSidebar, setShowSidebar, theme, setTheme)
    - Type `createContext` with `createContext<StoreContextValue>({} as StoreContextValue)`
    - Type all `useState` hooks with explicit generics
    - Type `StoreContextProvider` props as `{ children: React.ReactNode }`
    - _Requirements: 6.2, 6.3, 9.3_

  - [ ]* 6.2 Write property test: StoreContext value shape is preserved
    - **Property 9: StoreContext value shape is preserved after migration**
    - **Validates: Requirements 9.3**

- [x] 7. Convert `main.jsx` and `App.jsx` to TypeScript
  - [x] 7.1 Create `frontend/src/main.tsx`
    - Update import for `App` and `StoreContextProvider` to omit extension
    - Cast `document.getElementById("root")` with `!` non-null assertion
    - _Requirements: 4.1, 4.3_

  - [x] 7.2 Create `frontend/src/App.tsx`
    - Import `StoreContext` from `./context/store` (no extension)
    - Destructure `{ role, theme, token }` from typed context
    - _Requirements: 4.1, 4.3_

- [x] 8. Convert page components to TypeScript
  - [x] 8.1 Create `frontend/src/pages/Home.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

  - [x] 8.2 Create `frontend/src/pages/Admin.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

  - [x] 8.3 Create `frontend/src/pages/User.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

- [x] 9. Convert zero-prop components to TypeScript
  - [x] 9.1 Convert `AdminDashboard.jsx` → `AdminDashboard.tsx`
    - No props; use `React.FC`
    - Type `statusFilter` state as `string`, `selectedImage` as `string | null`
    - Type `getStatusConfig` return value with an inline interface `{ style: string; icon: React.ReactElement; label: string }`
    - _Requirements: 4.1, 6.1, 6.3_

  - [x] 9.2 Convert `AdminHome.jsx` → `AdminHome.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

  - [x] 9.3 Convert `AdminSetting.jsx` → `AdminSetting.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

  - [x] 9.4 Convert `AdminSidebaare.jsx` → `AdminSidebaare.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

  - [x] 9.5 Convert `AllReport.jsx` → `AllReport.tsx`
    - No props; use `React.FC`
    - Type `searchTerm` state as `string`
    - _Requirements: 4.1, 6.1, 6.3_

  - [x] 9.6 Convert `Dashboard.jsx` → `Dashboard.tsx`
    - No props; use `React.FC`
    - Type `status` state as `string`, `selectedImage` as `string | null`
    - _Requirements: 4.1, 6.1, 6.3_

  - [x] 9.7 Convert `LogIn.jsx` → `LogIn.tsx`
    - No props; use `React.FC`
    - Type `data` state with `interface LoginData { name: string; email: string; password: string }`
    - Type `status` state as `'Log in' | 'Sign up'`
    - _Requirements: 4.1, 6.1, 6.3_

  - [x] 9.8 Convert `Logo.jsx` → `Logo.tsx`
    - No props for `LandingPage`; add `interface FeatureProps { icon: React.ReactNode; title: string; desc: string }` for the `Feature` sub-component
    - _Requirements: 4.1, 6.1_

  - [x] 9.9 Convert `MyReport.jsx` → `MyReport.tsx`
    - No props; use `React.FC`
    - Type `selectedImage` state as `string | null`
    - _Requirements: 4.1, 6.1, 6.3_

  - [x] 9.10 Convert `Navbar.jsx` → `Navbar.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

  - [x] 9.11 Convert `NewReport.jsx` → `NewReport.tsx`
    - No props; use `React.FC`
    - Type `imageFile` state as `File | null`, `selectedImage` as `string | null`
    - Type `fileInputRef` as `React.RefObject<HTMLInputElement>`
    - Type event handlers with `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`
    - _Requirements: 4.1, 6.1, 6.3, 6.5_

  - [x] 9.12 Convert `Notifications.jsx` → `Notifications.tsx`
    - No props; use `React.FC`
    - Type `filter` state as `'all' | 'unread'`
    - _Requirements: 4.1, 6.1, 6.3_

  - [x] 9.13 Convert `ResetPassword.jsx` → `ResetPassword.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

  - [x] 9.14 Convert `Setting.jsx` → `Setting.tsx`
    - No props; use `React.FC`
    - Type `data` state with `interface SettingData { name: string; email: string; password: string }`
    - Type `fileInputRef` as `React.RefObject<HTMLInputElement>`
    - _Requirements: 4.1, 6.1, 6.3_

  - [x] 9.15 Convert `UserHome.jsx` → `UserHome.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

- [x] 10. Convert components with props to TypeScript
  - [x] 10.1 Convert `AdminDashBoardDisplay.jsx` → `AdminDashBoardDisplay.tsx`
    - Define `interface Props { rep: Issue; i: number; config: { style: string; icon: React.ReactElement; label: string }; setSelectedImage: React.Dispatch<React.SetStateAction<string | null>> }`
    - Type `optionRef` as `React.RefObject<HTMLDivElement>`
    - Type event handlers with appropriate React synthetic event types
    - _Requirements: 4.1, 6.1, 6.5_

  - [x] 10.2 Convert `AllReportDisplay.jsx` → `AllReportDisplay.tsx`
    - Define `interface Props { report: Issue }`
    - Type `menuRef` as `React.RefObject<HTMLDivElement>`
    - _Requirements: 4.1, 6.1_

  - [x] 10.3 Convert `DashboardDisplay.jsx` → `DashboardDisplay.tsx`
    - Define `interface Props { rep: Issue; id: string | null; setSelectedImage: React.Dispatch<React.SetStateAction<string | null>> }`
    - Remove the unused `key` prop from the interface (React handles `key` internally)
    - _Requirements: 4.1, 6.1_

  - [x] 10.4 Convert `ForgotPassword.jsx` → `ForgotPassword.tsx`
    - Define `interface Props { onClose: () => void; onBackToLogin: () => void }`
    - Type form submit handler as `React.FormEvent<HTMLFormElement>`
    - _Requirements: 4.1, 6.1, 6.5_

  - [x] 10.5 Convert `Notification.jsx` → `Notification.tsx`
    - Define `interface Props { noti: NotificationItem }`
    - Type `menuRef` as `React.RefObject<HTMLDivElement>`
    - _Requirements: 4.1, 6.1_

  - [x] 10.6 Convert `ReportComent.jsx` → `ReportComent.tsx`
    - Define `interface Props` matching the `rep` shape (Issue with comments)
    - _Requirements: 4.1, 6.1_

  - [x] 10.7 Convert `ShowImage.jsx` → `ShowImage.tsx`
    - Define `interface Props { showImage: boolean; report: Issue; setShowImage: React.Dispatch<React.SetStateAction<boolean>> }`
    - _Requirements: 4.1, 6.1_

  - [x] 10.8 Convert `Sidebar.jsx` → `Sidebar.tsx`
    - No props; use `React.FC`
    - _Requirements: 4.1, 6.1_

  - [ ]* 10.9 Write property test: no `.jsx` files remain in frontend/src
    - **Property 2: No legacy .jsx files remain in frontend/src**
    - **Validates: Requirements 4.1, 10.2**

  - [ ]* 10.10 Write property test: no `.jsx` extension imports in converted files
    - **Property 4: No .jsx extension imports remain in converted files**
    - **Validates: Requirements 4.3**

  - [ ]* 10.11 Write property test: all React components with props have a typed Props interface
    - **Property 8: All React components with props have a typed Props interface**
    - **Validates: Requirements 6.1**

- [x] 11. Update frontend config files
  - [x] 11.1 Create `frontend/vite.config.ts` (rename from `vite.config.js`, identical content)
    - _Requirements: 4.5_

  - [x] 11.2 Create `frontend/eslint.config.ts` with `typescript-eslint` support
    - Import `tseslint from 'typescript-eslint'`
    - Extend `...tseslint.configs.recommended`
    - Change `files` glob to `['**/*.{ts,tsx}']`
    - _Requirements: 4.6, 7.4_

- [x] 12. Delete all original frontend `.jsx` and `.js` source files
  - Delete `frontend/src/App.jsx`, `frontend/src/main.jsx`
  - Delete `frontend/src/images/image.js`, `frontend/src/style.js`
  - Delete `frontend/src/context/store.jsx`
  - Delete all 24 files under `frontend/src/components/*.jsx`
  - Delete `frontend/src/pages/Admin.jsx`, `Home.jsx`, `User.jsx`
  - Delete `frontend/vite.config.js`, `frontend/eslint.config.js`
  - _Requirements: 4.1, 4.2, 4.5, 4.6, 10.2_

- [x] 13. Checkpoint — verify frontend compiles cleanly
  - Run `tsc --noEmit` in `/frontend` and fix any remaining type errors
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 5.1_

  - [ ]* 13.1 Write property test: no explicit `any` types in migrated source files
    - **Property 7: No explicit `any` types in migrated source files**
    - **Validates: Requirements 3.3**

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The user instruction "after changing the js files to ts, remove the js files" is reflected in tasks 1 (backend) and 12 (frontend) — deletions happen after the TypeScript counterparts are confirmed to exist/compile
