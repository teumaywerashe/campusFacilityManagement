# Requirements Document

## Introduction

This feature completes the full TypeScript migration of a Node.js/Express backend and a React/Vite frontend. The backend is partially migrated — every module already has a paired `.ts` file alongside its original `.js` file. The frontend is entirely in `.jsx` and needs to be converted to `.tsx`. The goal is to remove all `.js`/`.jsx` source files, ensure strict TypeScript compilation passes, and keep the project fully functional after migration.

## Glossary

- **Backend**: The Node.js/Express server located in `/backend`, using MongoDB via Mongoose.
- **Frontend**: The React + Vite + Tailwind CSS application located in `/frontend`.
- **Migration_Tool**: The automated process (scripts, manual edits, or tooling) responsible for converting source files.
- **TS_Compiler**: The TypeScript compiler (`tsc`) used to type-check and compile `.ts`/`.tsx` files.
- **Vite**: The frontend build tool that bundles and serves the React application.
- **StoreContext**: The React context object that provides global application state to the frontend component tree.
- **Mongoose_Model**: A Mongoose schema-based model used to interact with MongoDB collections.
- **Legacy_File**: Any `.js` or `.jsx` source file that has been superseded by a `.ts` or `.tsx` equivalent.

---

## Requirements

### Requirement 1: Remove Legacy Backend Files

**User Story:** As a developer, I want all legacy `.js` backend source files removed, so that the codebase has a single authoritative TypeScript source for each module.

#### Acceptance Criteria

1. THE Migration_Tool SHALL delete every `.js` file in `/backend` that has a corresponding `.ts` file with equivalent content (including `server.js`, `swagger.js`, all files under `config/`, `controller/`, `middleWares/`, `models/`, and `route/`).
2. WHEN a `.js` file is deleted, THE Migration_Tool SHALL verify that a `.ts` counterpart exists before deletion.
3. IF a `.js` file has no `.ts` counterpart, THEN THE Migration_Tool SHALL leave the `.js` file in place and report it as requiring manual migration.

---

### Requirement 2: Backend TypeScript Compilation

**User Story:** As a developer, I want the backend to compile cleanly with `tsc`, so that type errors are caught at build time rather than at runtime.

#### Acceptance Criteria

1. WHEN `tsc --noEmit` is run in `/backend`, THE TS_Compiler SHALL report zero errors.
2. THE TS_Compiler SHALL enforce `strict: true` as defined in `backend/tsconfig.json`.
3. WHEN `tsc` is run in `/backend`, THE TS_Compiler SHALL emit compiled output to the `dist/` directory without errors.
4. THE Backend SHALL use `moduleResolution: NodeNext` and `module: NodeNext` consistent with the existing `tsconfig.json`.

---

### Requirement 3: Backend Type Annotations

**User Story:** As a developer, I want all backend modules to have explicit TypeScript types, so that the codebase is maintainable and self-documenting.

#### Acceptance Criteria

1. THE Migration_Tool SHALL add explicit return type annotations to all Express route handler functions.
2. THE Migration_Tool SHALL type all Mongoose model schemas using `mongoose.Schema` generic types or equivalent interface definitions.
3. THE Migration_Tool SHALL replace all `any` types with specific types or `unknown` where the type cannot be determined statically.
4. WHEN a middleware function accesses `req.user` or other custom properties on the Express `Request` object, THE Migration_Tool SHALL declare those properties via module augmentation of `express-serve-static-core`.
5. THE Migration_Tool SHALL type all environment variables accessed via `process.env` with explicit string or undefined checks.

---

### Requirement 4: Frontend JSX-to-TSX Conversion

**User Story:** As a developer, I want all frontend `.jsx` files converted to `.tsx`, so that the React component tree benefits from TypeScript's type checking.

#### Acceptance Criteria

1. THE Migration_Tool SHALL rename every `.jsx` file under `/frontend/src` to `.tsx`, including `App.jsx`, `main.jsx`, all files under `components/`, `context/`, and `pages/`.
2. THE Migration_Tool SHALL rename `frontend/src/images/image.js` to `image.ts` and `frontend/src/style.js` to `style.ts`.
3. WHEN a `.jsx` file is renamed to `.tsx`, THE Migration_Tool SHALL update all import statements that reference the old `.jsx` extension to reference `.tsx` or omit the extension.
4. THE Migration_Tool SHALL add a `tsconfig.json` to `/frontend` configured for React with `jsx: "react-jsx"`, `strict: true`, and `moduleResolution: Bundler`.
5. THE Migration_Tool SHALL update `frontend/vite.config.js` to `vite.config.ts` with equivalent configuration.
6. THE Migration_Tool SHALL update `frontend/eslint.config.js` to use TypeScript-aware ESLint rules.

---

### Requirement 5: Frontend TypeScript Compilation

**User Story:** As a developer, I want the frontend to compile cleanly through Vite's TypeScript pipeline, so that type errors are surfaced before deployment.

#### Acceptance Criteria

1. WHEN `tsc --noEmit` is run in `/frontend`, THE TS_Compiler SHALL report zero errors.
2. WHEN `vite build` is run in `/frontend`, THE Vite SHALL complete the build without TypeScript errors.
3. THE Frontend SHALL install `typescript` as a dev dependency if not already present.

---

### Requirement 6: Frontend Component Type Annotations

**User Story:** As a developer, I want all React components to have typed props and state, so that component interfaces are explicit and misuse is caught at compile time.

#### Acceptance Criteria

1. THE Migration_Tool SHALL define a `Props` interface or type alias for every React component that accepts props.
2. WHEN a component uses `useContext(StoreContext)`, THE Migration_Tool SHALL type the `StoreContext` value with an explicit interface describing all provided values.
3. THE Migration_Tool SHALL type all `useState` hooks with explicit generic type parameters where the initial value does not unambiguously infer the type.
4. THE Migration_Tool SHALL type all `axios` response data using interfaces that match the expected API response shapes.
5. WHEN a component receives an event handler prop (e.g., `onClick`, `onChange`), THE Migration_Tool SHALL use the appropriate React synthetic event type (e.g., `React.MouseEvent`, `React.ChangeEvent<HTMLInputElement>`).

---

### Requirement 7: Frontend Package Dependencies

**User Story:** As a developer, I want the frontend `package.json` to include all necessary TypeScript and type-definition packages, so that the project installs and builds correctly in a clean environment.

#### Acceptance Criteria

1. THE Frontend SHALL include `typescript` in `devDependencies`.
2. THE Frontend SHALL include `@types/react` and `@types/react-dom` in `devDependencies` (already present; SHALL remain).
3. WHERE `react-leaflet` is used, THE Frontend SHALL include `@types/leaflet` in `devDependencies`.
4. THE Frontend SHALL NOT retain `eslint.config.js` without TypeScript parser support; the ESLint config SHALL reference `typescript-eslint`.

---

### Requirement 8: Backend Runtime Compatibility

**User Story:** As a developer, I want the migrated backend to start and serve requests correctly, so that the migration does not introduce runtime regressions.

#### Acceptance Criteria

1. WHEN the backend is started with `npm start` (using `ts-node/esm`), THE Backend SHALL connect to MongoDB and listen on the configured port without errors.
2. WHEN a request is made to any existing API route after migration, THE Backend SHALL return the same response shape as before migration.
3. THE Backend SHALL retain the `swagger.ts` Swagger documentation setup and serve it at `/api-docs`.

---

### Requirement 9: Frontend Runtime Compatibility

**User Story:** As a developer, I want the migrated frontend to run correctly in the browser, so that the migration does not break any user-facing functionality.

#### Acceptance Criteria

1. WHEN `vite dev` is run after migration, THE Frontend SHALL start the development server without errors.
2. WHEN the application is loaded in a browser after migration, THE Frontend SHALL render the correct view based on the user's authentication state and role.
3. THE StoreContext SHALL expose the same context value shape after migration as before, so that all consuming components continue to function correctly.

---

### Requirement 10: No Orphaned Legacy Files

**User Story:** As a developer, I want the repository to contain no orphaned `.js` or `.jsx` source files after migration, so that there is no ambiguity about which files are authoritative.

#### Acceptance Criteria

1. WHEN migration is complete, THE Migration_Tool SHALL verify that no `.js` files remain under `/backend` (excluding `node_modules` and `dist`).
2. WHEN migration is complete, THE Migration_Tool SHALL verify that no `.jsx` files remain under `/frontend/src`.
3. IF any `.js` or `.jsx` file cannot be safely removed (e.g., no `.ts`/`.tsx` counterpart exists), THEN THE Migration_Tool SHALL produce a report listing each such file with the reason it was retained.
