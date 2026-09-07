export interface User {
  id: string;
  name: string;
  email: string;
  handle: string;
  avatar: string;
  bio: string;
  role: 'Author' | 'Editor' | 'Reader';
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  coverImage: string;
  category: 'Engineering' | 'AI & Systems' | 'Design Engineering' | 'Culture' | 'Essays';
  tags: string[];
  readTime: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  claps: number;
  featured?: boolean;
  comments: Comment[];
  status: 'published' | 'draft';
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
  status: 'active' | 'unsubscribed';
}

export function getCategoryBadgeClasses(category: string): { bg: string; text: string; border: string; pill: string } {
  switch (category) {
    case 'Engineering':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-200 dark:border-emerald-800/60',
        pill: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700/50'
      };
    case 'AI & Systems':
      return {
        bg: 'bg-sky-50 dark:bg-sky-950/40',
        text: 'text-sky-700 dark:text-sky-300',
        border: 'border-sky-200 dark:border-sky-800/60',
        pill: 'bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-700/50'
      };
    case 'Design Engineering':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-800 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-800/60',
        pill: 'bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-700/50'
      };
    case 'Culture':
      return {
        bg: 'bg-purple-50 dark:bg-purple-950/40',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-200 dark:border-purple-800/60',
        pill: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700/50'
      };
    case 'Essays':
    default:
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-700 dark:text-rose-300',
        border: 'border-rose-200 dark:border-rose-800/60',
        pill: 'bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-700/50'
      };
  }
}

export const DEMO_USERS: User[] = [
  {
    id: 'usr_1',
    name: 'Alex Rivera',
    email: 'alex@press.dev',
    handle: '@alexrivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Staff Product Engineer & Design Architect. Writing on Svelte 5, distributed edge systems, and sub-second web performance.',
    role: 'Editor'
  },
  {
    id: 'usr_2',
    name: 'Elena Rostova',
    email: 'elena@press.dev',
    handle: '@erostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    bio: 'Lead AI Researcher exploring autonomous multi-agent pipelines, canvas architectures, and neural interfaces.',
    role: 'Author'
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post_1',
    slug: 'the-death-of-bloated-frontends-2026',
    title: 'The Death of Bloated Frontends: Why We Switched to Zero-Runtime Architecture',
    subtitle: 'How stripping 400KB of client-side JavaScript cut our cold start times by 78% and revived native web speed.',
    content: `
      <h2>The JavaScript Inflation Crisis</h2>
      <p>Over the last decade, modern web applications fell into an unsustainable trap. Simple content delivery platforms ballooned into 5MB hydration bundles, requiring complex client-side reconciliation before a user could even click a link or read an article.</p>
      
      <blockquote>"Fast software is not a luxury. It is the baseline courtesy we owe our readers and users."</blockquote>

      <h2>The Shift to Edge-First Runes and Signals</h2>
      <p>In 2026, the industry reached a definitive inflection point. By moving reactive state boundaries to fine-grained signals and compile-time primitives, we achieved true 60fps responsiveness with zero layout shift.</p>

      <h3>Key Architectural Wins:</h3>
      <ul>
        <li><strong>Sub-20ms Time to Interactive:</strong> Pure HTML delivered from the nearest edge CDN node.</li>
        <li><strong>Microscopic Bundle Footprint:</strong> 42KB total runtime footprint including fonts and telemetry.</li>
        <li><strong>Strict Type Safety:</strong> Zero runtime schema mismatches across all API boundaries.</li>
      </ul>

      <h2>Looking Ahead</h2>
      <p>When you eliminate the extraneous layers between your written word and the reader's screen, the web feels electric again. Write with intention, publish with precision.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'Engineering',
    tags: ['Architecture', 'Performance', 'Web Vitals', 'TypeScript'],
    readTime: '6 min read',
    author: {
      name: 'Alex Rivera',
      handle: '@alexrivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Staff Product Engineer & Design Architect.'
    },
    publishedAt: 'Sep 06, 2026',
    claps: 342,
    featured: true,
    status: 'published',
    comments: [
      {
        id: 'c_1',
        userName: 'Marcus Vance',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        content: 'This matches our exact experience after migrating our SaaS dashboard to fine-grained reactivity. Excellent breakdown!',
        createdAt: '2 hours ago'
      },
      {
        id: 'c_2',
        userName: 'Sarah Jennings',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        content: 'The section on edge-first HTML delivery should be mandatory reading for every engineering team in 2026.',
        createdAt: '5 hours ago'
      }
    ]
  },
  {
    id: 'post_2',
    slug: 'autonomous-ai-agents-canvas-design',
    title: 'Designing Infinite Canvas Interfaces for Autonomous AI Pipelines',
    subtitle: 'Principles for constructing low-latency visual graph environments where human designers collaborate with agentic models.',
    content: `
      <h2>The Canvas as the New Terminal</h2>
      <p>Command-line prompts and linear chat streams were only the first wave of generative computing. Today's complex agent pipelines require multi-dimensional visual spatial environments.</p>

      <h2>Handling Realtime Telemetry Streams</h2>
      <p>When fifteen autonomous subagents run concurrently, visualizing token velocity, latency bottlenecks, and output branches requires dedicated WebGL rendering and non-blocking state queues.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    category: 'AI & Systems',
    tags: ['AI Agents', 'UI Canvas', 'Telemetry', 'WebGL'],
    readTime: '8 min read',
    author: {
      name: 'Elena Rostova',
      handle: '@erostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      bio: 'Lead AI Researcher & Systems Architect.'
    },
    publishedAt: 'Sep 05, 2026',
    claps: 189,
    featured: false,
    status: 'published',
    comments: []
  },
  {
    id: 'post_3',
    slug: 'swiss-minimalism-high-contrast-typography',
    title: 'The Discipline of Pure Black & White: High Contrast Web Aesthetics',
    subtitle: 'Why eliminating washed-out grays and rainbow gradients creates an unmatched editorial reading experience.',
    content: `
      <h2>The Tyranny of Low Contrast</h2>
      <p>For years, digital design suffered from faint gray text on off-white backgrounds, causing eye strain and reducing information density. By embracing pure deep black (#000000) and crisp white (#FFFFFF), content gains monumental presence.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'Design Engineering',
    tags: ['Typography', 'Minimalism', 'Swiss Grid', 'Accessibility'],
    readTime: '4 min read',
    author: {
      name: 'Alex Rivera',
      handle: '@alexrivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Staff Product Engineer & Design Architect.'
    },
    publishedAt: 'Sep 04, 2026',
    claps: 412,
    featured: false,
    status: 'published',
    comments: []
  },
  {
    id: 'post_4',
    slug: 'the-independent-writer-stack-2026',
    title: 'The Independent Writer Stack: Owning Your Audience and Code in 2026',
    subtitle: 'How modern creators bypass rent-seeking platforms with self-hosted publishing and markdown interoperability.',
    content: `
      <h2>Sovereignty Over Your Words</h2>
      <p>Relying on closed algorithm feeds means building on rented land. A clean, independent newsletter and blog engine guarantees direct, unfettered connection to your readership.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    category: 'Culture',
    tags: ['Publishing', 'Newsletters', 'Open Source', 'Substack'],
    readTime: '5 min read',
    author: {
      name: 'Elena Rostova',
      handle: '@erostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      bio: 'Lead AI Researcher & Systems Architect.'
    },
    publishedAt: 'Sep 02, 2026',
    claps: 275,
    featured: false,
    status: 'published',
    comments: []
  }
];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: 'sub_1', email: 'sarah.j@hyperflow.io', subscribedAt: '01 Sep 2026', source: 'Home Hero Subscribe', status: 'active' },
  { id: 'sub_2', email: 'marcus.v@synthesis.ai', subscribedAt: '03 Sep 2026', source: 'Blog Reader Footer', status: 'active' },
  { id: 'sub_3', email: 'david.k@vortex.dev', subscribedAt: '04 Sep 2026', source: 'Writer Profile', status: 'active' },
  { id: 'sub_4', email: 'clara.m@stanford.edu', subscribedAt: '06 Sep 2026', source: 'Home Hero Subscribe', status: 'active' }
];

// Helper to get initial state from localStorage if available
export function getStoredPosts(): BlogPost[] {
  if (typeof window === 'undefined') return INITIAL_POSTS;
  const stored = localStorage.getItem('ink_press_posts');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_POSTS;
    }
  }
  return INITIAL_POSTS;
}

export function saveStoredPosts(posts: BlogPost[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ink_press_posts', JSON.stringify(posts));
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return DEMO_USERS[0];
  const stored = localStorage.getItem('ink_press_user');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEMO_USERS[0];
    }
  }
  return DEMO_USERS[0];
}

export function saveStoredUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('ink_press_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('ink_press_user');
  }
}

export function getStoredSubscribers(): Subscriber[] {
  if (typeof window === 'undefined') return INITIAL_SUBSCRIBERS;
  const stored = localStorage.getItem('ink_press_subscribers');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_SUBSCRIBERS;
    }
  }
  return INITIAL_SUBSCRIBERS;
}

export function saveStoredSubscribers(subs: Subscriber[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ink_press_subscribers', JSON.stringify(subs));
}
