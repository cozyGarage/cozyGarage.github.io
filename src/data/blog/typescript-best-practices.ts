/**
 * Blog Post: TypeScript Best Practices
 * Author: Trung Nguyen
 * Date: November 5, 2024
 * 
 * Patterns and practices for building scalable TypeScript applications.
 * Covers type safety, generics, utility types, and error handling.
 */

export const typescriptBestPracticesPost = {
  id: 'typescript-best-practices',
  title: 'TypeScript Best Practices for Large Applications',
  excerpt: 'Essential TypeScript patterns and practices for scalable, maintainable codebases in production applications.',
  date: '2024-11-05',
  tags: ['TypeScript', 'JavaScript', 'Best Practices'],
  readTime: 15,
  content: `
# TypeScript Best Practices for Large Applications

After working with TypeScript on several production projects, I've learned that the real value isn't just catching bugs—it's creating self-documenting code that scales with your team. Here are the patterns and practices that have made the biggest impact.

## 1. Strong Type Definitions

### Start with Your Data Models
Define your core types first, before writing any component code:

\`\`\`typescript
// src/types/models.ts

/**
 * Represents a project in the portfolio
 * @see {@link https://github.com/cozyGarage/portfolio/docs/data-models.md}
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  
  /** Display title */
  title: string;
  
  /** Short description (max 200 chars) */
  description: string;
  
  /** Detailed description for project page */
  longDescription: string;
  
  /** Project category for filtering */
  category: 'web' | 'ml' | 'game' | 'other';
  
  /** Technologies used (max 10) */
  technologies: string[];
  
  /** Whether to show on homepage */
  featured: boolean;
  
  /** Public URL for live demo (optional) */
  demoUrl?: string;
  
  /** GitHub repository URL (optional) */
  githubUrl?: string;
  
  /** Project image path relative to /public */
  image?: string;
}

/**
 * Blog post with markdown content
 */
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO 8601 format
  tags: string[];
  readTime: number; // minutes
}
\`\`\`

### Use Discriminated Unions for State
Better than boolean flags:

\`\`\`typescript
// ❌ Avoid: Ambiguous states
interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  data: User[] | null;
}

// ✅ Better: Explicit states
type DataState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Usage with type narrowing
function UserList({ state }: { state: DataState<User[]> }) {
  switch (state.status) {
    case 'idle':
      return <div>Click to load users</div>;
    case 'loading':
      return <Loading />;
    case 'success':
      // TypeScript knows state.data exists here
      return <List users={state.data} />;
    case 'error':
      // TypeScript knows state.error exists here
      return <Error message={state.error.message} />;
  }
}
\`\`\`

## 2. Leverage Utility Types

### Built-in Utility Types
TypeScript provides powerful utilities—use them:

\`\`\`typescript
// Partial: Make all properties optional
type PartialProject = Partial<Project>;
// Useful for update forms where not all fields are required

// Pick: Select specific properties
type ProjectPreview = Pick<Project, 'id' | 'title' | 'description' | 'image'>;
// Perfect for card components that don't need all data

// Omit: Exclude specific properties
type ProjectFormData = Omit<Project, 'id'>;
// For forms where ID is auto-generated

// Required: Make all properties required
type CompleteProject = Required<Project>;
// Ensure all optional fields are provided

// Record: Create object types with specific keys
type ProjectsByCategory = Record<Project['category'], Project[]>;
// { web: Project[], ml: Project[], game: Project[], other: Project[] }

// ReturnType: Extract return type of a function
const getProjects = () => projects.filter(p => p.featured);
type FeaturedProjects = ReturnType<typeof getProjects>;
// FeaturedProjects is Project[]
\`\`\`

### Custom Utility Types
Create reusable type helpers:

\`\`\`typescript
/**
 * Make specific properties required
 */
type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Example: Project must have demoUrl
type DemoProject = RequireFields<Project, 'demoUrl'>;

/**
 * Deep readonly for immutable data structures
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

/**
 * Extract value types from a const object
 */
const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  BLOG: '/blog',
  PLAY: '/play',
} as const;

type Route = typeof ROUTES[keyof typeof ROUTES];
// Route = '/' | '/projects' | '/blog' | '/play'
\`\`\`

## 3. Generic Components and Functions

### Type-Safe Component Props
Create reusable components with generics:

\`\`\`typescript
/**
 * Generic list component with type-safe render prop
 */
interface ListProps<T> {
  /** Array of items to render */
  items: T[];
  
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  
  /** Unique key extractor */
  keyExtractor: (item: T) => string | number;
  
  /** Optional empty state */
  emptyComponent?: React.ReactNode;
}

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor,
  emptyComponent 
}: ListProps<T>) {
  if (items.length === 0 && emptyComponent) {
    return <>{emptyComponent}</>;
  }
  
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor(item)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </>
  );
}

// Type-safe usage
<List
  items={projects}
  keyExtractor={(project) => project.id}
  renderItem={(project) => (
    <ProjectCard project={project} />
  )}
  emptyComponent={<p>No projects found</p>}
/>
\`\`\`

### Generic Hooks
Build type-safe custom hooks:

\`\`\`typescript
/**
 * Generic data fetching hook with caching
 */
function useData<T>(
  key: string,
  fetcher: () => Promise<T>
): DataState<T> {
  const [state, setState] = useState<DataState<T>>({ 
    status: 'idle' 
  });
  
  useEffect(() => {
    setState({ status: 'loading' });
    
    fetcher()
      .then(data => setState({ status: 'success', data }))
      .catch(error => setState({ status: 'error', error }));
  }, [key]);
  
  return state;
}

// Usage: TypeScript infers the data type
const projectsState = useData('projects', fetchProjects);
// projectsState: DataState<Project[]>

const userState = useData('user', fetchUser);
// userState: DataState<User>
\`\`\`

## 4. Strict Configuration

### Enable Strict Mode
Update your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    // Enable all strict type checking options
    "strict": true,
    
    // Additional checks
    "noUncheckedIndexedAccess": true,  // Arrays might be undefined
    "noImplicitReturns": true,          // All code paths must return
    "noFallthroughCasesInSwitch": true, // Switch cases must break
    "noUnusedLocals": true,             // Catch unused variables
    "noUnusedParameters": true,         // Catch unused parameters
    "noImplicitOverride": true,         // Explicit override keyword
    
    // Import resolution
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    
    // Output
    "declaration": true,                // Generate .d.ts files
    "sourceMap": true,                  // Generate source maps
    
    // Project structure
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/shared/components/*"],
      "@/utils/*": ["src/shared/utils/*"]
    }
  }
}
\`\`\`

## 5. Error Handling Patterns

### Type-Safe Error Handling
Create custom error types:

\`\`\`typescript
/**
 * Base error class for application errors
 */
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Validation error with field details
 */
class ValidationError extends AppError {
  constructor(
    message: string,
    public fields: Record<string, string>
  ) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

/**
 * Type guard for error checking
 */
function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

// Usage
try {
  await submitForm(data);
} catch (error) {
  if (isValidationError(error)) {
    // TypeScript knows error.fields exists
    displayFieldErrors(error.fields);
  } else if (error instanceof AppError) {
    showNotification(error.message);
  } else {
    // Unknown error
    logError(error);
  }
}
\`\`\`

### Result Type Pattern
Avoid throwing errors for expected failures:

\`\`\`typescript
/**
 * Result type for operations that can fail
 */
type Result<T, E = Error> =
  | { success: true; value: T }
  | { success: false; error: E };

/**
 * Type-safe validation function
 */
function validateEmail(email: string): Result<string, string> {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  
  if (!email) {
    return { success: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }
  
  return { success: true, value: email.toLowerCase() };
}

// Usage with type narrowing
const result = validateEmail(userInput);

if (result.success) {
  // TypeScript knows result.value exists
  sendEmail(result.value);
} else {
  // TypeScript knows result.error exists
  showError(result.error);
}
\`\`\`

## 6. Documentation with JSDoc

### Type Definitions with Documentation
JSDoc comments enhance IDE tooltips:

\`\`\`typescript
/**
 * Filters projects by category and search term
 * 
 * @param projects - Array of all projects
 * @param category - Category to filter by ('all' shows all categories)
 * @param searchTerm - Search string for title/description (case-insensitive)
 * @returns Filtered array of projects
 * 
 * @example
 * \`\`\`ts
 * const webProjects = filterProjects(allProjects, 'web', '');
 * const searchResults = filterProjects(allProjects, 'all', 'react');
 * \`\`\`
 */
export function filterProjects(
  projects: Project[],
  category: Project['category'] | 'all',
  searchTerm: string
): Project[] {
  return projects.filter(project => {
    const matchesCategory = category === 'all' || project.category === category;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
}
\`\`\`

## Common Pitfalls to Avoid

### 1. Type Assertions (as)
Avoid \`as\` unless absolutely necessary:

\`\`\`typescript
// ❌ Bad: Silences type errors
const user = data as User;

// ✅ Better: Validate and narrow type
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  );
}

if (isUser(data)) {
  // TypeScript knows data is User
  console.log(data.name);
}
\`\`\`

### 2. \`any\` Type
Replace \`any\` with \`unknown\` for better safety:

\`\`\`typescript
// ❌ Bad: Loses all type safety
function processData(data: any) {
  return data.value; // No error if data.value doesn't exist
}

// ✅ Better: Force type checking
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return data.value;
  }
  throw new Error('Invalid data format');
}
\`\`\`

### 3. Optional Chaining Overuse
Don't hide data structure problems:

\`\`\`typescript
// ❌ Bad: Hides missing required data
const userName = user?.profile?.name ?? 'Unknown';

// ✅ Better: Validate data structure
if (!user || !user.profile || !user.profile.name) {
  throw new Error('User profile incomplete');
}
const userName = user.profile.name;
\`\`\`

## Conclusion

TypeScript is most valuable when you embrace its type system fully. Start with strong type definitions, leverage utility types and generics, enable strict mode, and use proper error handling patterns.

The upfront investment in types pays dividends in:
- Fewer runtime errors
- Better IDE autocomplete
- Self-documenting code
- Easier refactoring
- Improved team collaboration

---

**Resources:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [My Portfolio TypeScript Setup](https://github.com/cozyGarage/portfolio)

*Questions or suggestions? Connect on [LinkedIn](https://linkedin.com) or [GitHub](https://github.com/cozyGarage)!*
`
};
