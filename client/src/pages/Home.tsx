import { useMemo, useState } from "react";
import { syllabusTasks } from "@/data/syllabus";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Coffee,
  Filter,
  Flag,
  Hash,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Send,
  Settings2,
  Sparkles,
  Timer,
  Users,
  X,
} from "lucide-react";

type Student = "Tejas" | "Crystal";
type View = "home" | "chat" | "syllabus" | "progress";
type TaskStatus = "Completed" | "In progress" | "Pending";

type Task = {
  id: string;
  subject: string;
  number: string;
  name: string;
  owner: Student;
  target: string;
  day: number;
  status: TaskStatus;
  tejas: boolean;
  crystal: boolean;
  note?: string;
};

type ChatMessage = {
  sender: Student;
  message: string;
  time: string;
};

const initialTasks: Task[] = syllabusTasks;

const subjectColors: Record<string, string> = {
  Mathematics: "subject-math",
  Science: "subject-science",
  English: "subject-english",
  "Social Science": "subject-social",
  Hindi: "subject-hindi",
  "Hindi Course A": "subject-hindi",
  "English Language and Literature": "subject-english",
  "Information Technology": "subject-it",
};

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "syllabus", label: "Syllabus", icon: BookOpen },
  { id: "progress", label: "My progress", icon: Flag },
];

const formatDate = (day: number) => day === 1 ? "Sprint start" : day === 2 ? "Next day" : `Sprint day ${day}`;

function Avatar({ student, small = false }: { student: Student; small?: boolean }) {
  return <div className={`avatar avatar-${student.toLowerCase()} ${small ? "avatar-small" : ""}`}>{student === "Tejas" ? "T" : "C"}</div>;
}

function ProgressRing({ value, color = "#f2c9cf", size = 78 }: { value: number; color?: string; size?: number }) {
  return (
    <div className="progress-ring" style={{ width: size, height: size, background: `conic-gradient(${color} ${value * 3.6}deg, #eadfd8 0deg)` }}>
      <div className="progress-ring-inner"><strong>{value}%</strong></div>
    </div>
  );
}

function StatusPill({ status }: { status: TaskStatus }) {
  const className = status === "Completed" ? "status-complete" : status === "In progress" ? "status-progress" : "status-pending";
  return <span className={`status-pill ${className}`}><span className="status-dot" />{status}</span>;
}

export default function Home() {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(() => {
    try {
      const stored = sessionStorage.getItem("board-sprint-user");
      return stored === "Tejas" || stored === "Crystal" ? stored : null;
    } catch {
      return null;
    }
  });
  const [activeView, setActiveView] = useState<View>("home");
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All chapters");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [chatDraft, setChatDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "Crystal", message: "I finished Real Numbers. Want to compare notes later?", time: "9:12 AM" },
    { sender: "Tejas", message: "Yes! I’ll send the short tricks after lunch ☕", time: "9:18 AM" },
  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tejasCount = tasks.filter((task) => task.tejas).length;
  const crystalCount = tasks.filter((task) => task.crystal).length;
  const completedCount = tasks.filter((task) => task.tejas && task.crystal).length;
  const overallProgress = Math.round(((tejasCount + crystalCount) / (tasks.length * 2)) * 100);
  const pendingTasks = tasks.filter((task) => !(task.tejas && task.crystal));

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch = !query || [task.id, task.subject, task.number, task.name].some((value) => value.toLowerCase().includes(query));
      const matchesFilter = filter === "All chapters"
        || (filter === "All pending" && !(task.tejas && task.crystal))
        || (filter === "My pending" && !task.tejas)
        || (filter === "Friend’s pending" && !task.crystal)
        || (filter === "Today’s targets" && task.day === 1)
        || (filter === "Unassigned" && !task.owner);
      return matchesSearch && matchesFilter;
    });
  }, [filter, search, tasks]);

  const toggleStudentTask = (taskId: string, student: Student) => {
    setTasks((current) => current.map((task) => {
      if (task.id !== taskId) return task;
      const nextTejas = student === "Tejas" ? !task.tejas : task.tejas;
      const nextCrystal = student === "Crystal" ? !task.crystal : task.crystal;
      const nextStatus: TaskStatus = nextTejas && nextCrystal ? "Completed" : nextTejas || nextCrystal ? "In progress" : "Pending";
      return { ...task, tejas: nextTejas, crystal: nextCrystal, status: nextStatus };
    }));
  };

  const sendMessage = () => {
    if (!currentStudent || !chatDraft.trim()) return;
    setMessages((current) => [...current, { sender: currentStudent, message: chatDraft.trim(), time: "Just now" }]);
    setChatDraft("");
  };

  const goTo = (view: View) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const viewTitle = activeView === "home" ? `Good morning, ${currentStudent}` : activeView === "chat" ? "Study chat" : activeView === "syllabus" ? "The full syllabus" : "My progress";
  const viewSubtitle = activeView === "home" ? "Let’s make a little progress today." : activeView === "chat" ? "A private corner for both of you." : activeView === "syllabus" ? "Search, filter, and keep your lane moving." : "Your pace, your chapters, your sprint.";

  if (!currentStudent) {
    return <LoginScreen onLogin={(student) => {
      setCurrentStudent(student);
      try { sessionStorage.setItem("board-sprint-user", student); } catch { /* session storage can be unavailable */ }
    }} />;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup" onClick={() => goTo("home")} role="button" tabIndex={0}>
          <div className="brand-mark"><Coffee size={19} strokeWidth={2.2} /></div>
          <div><strong>board sprint</strong><span>two students · one finish line</span></div>
        </div>
        <div className="room-label">YOUR STUDY ROOM <span className="online-dot" /></div>
        <div className="room-card">
          <div className="room-card-head"><span>Room 05 · Private</span><MoreHorizontal size={16} /></div>
          <div className="room-students"><div className="avatar-stack"><Avatar student="Tejas" small /><Avatar student="Crystal" small /></div><div><strong>Tejas & Crystal</strong><span>2 members online</span></div></div>
          <button className="invite-link"><Plus size={14} /> Invite a friend</button>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <span className="nav-section-label">Workspace</span>
          {navItems.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${activeView === id ? "nav-active" : ""}`} onClick={() => goTo(id)}><Icon size={18} strokeWidth={activeView === id ? 2.4 : 1.9} /><span>{label}</span>{id === "chat" && <b className="unread-badge">2</b>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-motivation"><Sparkles size={15} /><span>Small steps still count.</span></div>
          <button className="nav-item"><Settings2 size={18} /><span>Room settings</span></button>
          <div className="profile-row"><Avatar student={currentStudent} small /><div><strong>{currentStudent}</strong><span>Class 10 · Member</span></div><ChevronDown size={15} /></div>
        </div>
      </aside>

      <main className="main-canvas">
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu">{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          <div className="breadcrumb"><span>Board Sprint</span><span>/</span><strong>{activeView === "home" ? "Home" : viewTitle}</strong></div>
          <div className="topbar-actions"><button className="icon-button" aria-label="Help"><CircleHelp size={18} /></button><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="topbar-avatar"><Avatar student={currentStudent} small /></div></div>
        </header>

        <div className="page-content">
          {activeView === "home" && <>
            <section className="welcome-row"><div><p className="eyebrow">CBSE CLASS 10 · 2026–27 SESSION</p><h1>{viewTitle}</h1><p className="lede">{viewSubtitle}</p></div><button className="outline-button" onClick={() => goTo("chat")}><MessageCircle size={16} /> Send a note <ArrowUpRight size={15} /></button></section>

            <section className="hero-grid">
              <div className="sprint-hero">
                <div className="hero-grain" />
                <div className="hero-topline"><span className="hero-kicker"><span className="live-pip" /> LIVE SPRINT</span><span className="hero-day">DAY 01 <span>/ 15</span></span></div>
                <div className="hero-copy"><h2>Let’s finish<br /><em>the syllabus.</em></h2><p>Two calm weeks. One shared finish line. Keep showing up for the next chapter.</p></div>
                <div className="hero-footer"><button className="pink-button" onClick={() => { setFilter("Today’s targets"); goTo("syllabus"); }}>Open today’s tasks <ArrowUpRight size={16} /></button><div className="hero-stamp"><span>15</span><small>DAYS<br />TO GO</small></div></div>
              </div>
              <div className="progress-card">
                <div className="card-heading"><div><p className="eyebrow">SHARED SYLLABUS</p><h3>How you’re moving</h3></div><button className="dots-button" aria-label="More options"><MoreHorizontal size={18} /></button></div>
                <div className="overall-progress"><ProgressRing value={overallProgress} size={118} /><div><strong>{overallProgress}%</strong><span>overall progress</span><small><span className="coffee-line" /> {completedCount} chapters completed by both</small></div></div>
                <div className="student-progress-list"><div className="student-progress-row"><Avatar student="Tejas" small /><div className="student-name"><strong>Tejas</strong><span>your chapters</span></div><div className="thin-progress"><i style={{ width: `${Math.round((tejasCount / tasks.length) * 100)}%` }} /></div><b>{Math.round((tejasCount / tasks.length) * 100)}%</b></div><div className="student-progress-row"><Avatar student="Crystal" small /><div className="student-name"><strong>Crystal</strong><span>friend’s chapters</span></div><div className="thin-progress blush"><i style={{ width: `${Math.round((crystalCount / tasks.length) * 100)}%` }} /></div><b>{Math.round((crystalCount / tasks.length) * 100)}%</b></div></div>
              </div>
            </section>

            <section className="dashboard-grid">
              <div className="surface-card today-card"><div className="card-heading"><div><p className="eyebrow">TODAY’S TO-DO</p><h3>Keep the streak warm</h3></div><span className="count-pill">{tasks.filter((task) => task.day === 1 && !(task.tejas && task.crystal)).length} tasks</span></div><div className="task-list">{tasks.filter((task) => task.day === 1).map((task) => <TaskRow key={task.id} task={task} student={currentStudent} onToggle={toggleStudentTask} />)}</div><button className="text-button" onClick={() => { setFilter("Today’s targets"); goTo("syllabus"); }}>See all today’s tasks <ArrowUpRight size={15} /></button></div>
              <div className="surface-card left-card"><div className="card-heading"><div><p className="eyebrow">WHAT IS LEFT?</p><h3>Pending chapters</h3></div><button className="dots-button" aria-label="More options"><MoreHorizontal size={18} /></button></div><div className="pending-summary"><div><strong>{pendingTasks.length}</strong><span>to work through</span></div><div className="pending-bar"><i style={{ width: `${Math.max(8, 100 - overallProgress)}%` }} /></div></div><div className="pending-list">{pendingTasks.slice(0, 3).map((task) => <div className="pending-row" key={task.id}><span className={`subject-dot ${subjectColors[task.subject]}`} /><div><strong>{task.name}</strong><span>{task.subject} · {task.target}</span></div><Avatar student={task.owner} small /></div>)}</div><button className="text-button" onClick={() => goTo("syllabus")}>Open remaining work <ArrowUpRight size={15} /></button></div>
            </section>

            <section className="lower-grid"><div className="surface-card week-card"><div className="card-heading"><div><p className="eyebrow">15-DAY PLAN</p><h3>Your sprint at a glance</h3></div><button className="outline-mini" onClick={() => goTo("progress")}>View planner <ArrowUpRight size={14} /></button></div><div className="days-row">{[1, 2, 3, 4, 5, 6, 7].map((day) => <div className={`day-cell ${day === 1 ? "day-current" : ""} ${day < 1 ? "day-done" : ""}`} key={day}><span>DAY {String(day).padStart(2, "0")}</span><strong>{formatDate(day)}</strong><i>{day === 1 ? "Today" : `${Math.max(2, day + 1)} tasks`}</i></div>)}</div></div><div className="surface-card activity-card"><div className="card-heading"><div><p className="eyebrow">FRIEND ACTIVITY</p><h3>Crystal’s desk</h3></div><span className="green-label"><span /> active</span></div><div className="activity-item"><Avatar student="Crystal" small /><div><strong>Crystal completed</strong><span>Mathematics · Real Numbers</span><time>18 min ago</time></div></div><div className="activity-item"><div className="activity-icon"><MessageCircle size={15} /></div><div><strong>Crystal sent a message</strong><span>“Want to swap notes later?”</span><time>54 min ago</time></div></div><button className="text-button" onClick={() => goTo("chat")}>Open chat <ArrowUpRight size={15} /></button></div></section>
          </>}

          {activeView === "chat" && <ChatView messages={messages} draft={chatDraft} setDraft={setChatDraft} onSend={sendMessage} currentStudent={currentStudent} />}
          {activeView === "syllabus" && <SyllabusView tasks={visibleTasks} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} currentStudent={currentStudent} onToggle={toggleStudentTask} />}
          {activeView === "progress" && <ProgressView tasks={tasks} tejasCount={tejasCount} crystalCount={crystalCount} overallProgress={overallProgress} currentStudent={currentStudent} onToggle={toggleStudentTask} />}
        </div>
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (student: Student) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const credentials = username.trim().toLowerCase();
    const match = credentials === "tejas" && password === "tejasv2411"
      ? "Tejas"
      : credentials === "aaradhya" && password === "crystal2411"
        ? "Crystal"
        : null;
    if (!match) {
      setError("That name and password do not match this room.");
      return;
    }
    onLogin(match);
  };

  return <div className="login-shell"><div className="login-card"><div className="login-brand"><div className="brand-mark"><Coffee size={19} strokeWidth={2.2} /></div><span>board sprint</span></div><p className="eyebrow">PRIVATE STUDY ROOM · 2 SEATS</p><h1>Come on in.</h1><p className="login-copy">Your shared 15-day sprint is waiting. Sign in with your room name to pick up where you left off.</p><form onSubmit={handleSubmit} className="login-form"><label>Room name<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" /></label><label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" /></label>{error && <p className="login-error">{error}</p>}<button className="pink-button" type="submit">Enter the study room <ArrowUpRight size={16} /></button></form><div className="login-footer"><span className="online-dot" /> This room is just for Tejas &amp; Crystal</div></div></div>;
}

function TaskRow({ task, student, onToggle }: { task: Task; student: Student; onToggle: (id: string, student: Student) => void }) {
  const isComplete = student === "Tejas" ? task.tejas : task.crystal;
  return <div className="task-row"><button className={`task-check ${isComplete ? "checked" : ""}`} onClick={() => onToggle(task.id, student)} aria-label={`Mark ${task.name} ${isComplete ? "incomplete" : "complete"}`}><Check size={14} /></button><div className="task-copy"><div><strong>{task.name}</strong>{task.status === "Completed" && <CheckCircle2 size={14} className="task-complete-icon" />}</div><span>{task.subject} · Ch. {task.number}</span></div><div className="task-owner"><Avatar student={task.owner} small /><span>{task.owner === student ? "You" : task.owner}</span></div><span className="task-time">{task.target}</span></div>;
}

function ChatView({ messages, draft, setDraft, onSend, currentStudent }: { messages: ChatMessage[]; draft: string; setDraft: (value: string) => void; onSend: () => void; currentStudent: Student }) {
  return <section className="view-section chat-section"><div className="section-intro"><div><p className="eyebrow">PRIVATE ROOM · 2 MEMBERS</p><h1>Study chat</h1><p className="lede">A quiet thread for little nudges, notes, and “you’ve got this” moments.</p></div><div className="chat-members"><Avatar student="Tejas" small /><Avatar student="Crystal" small /><span>Both online</span></div></div><div className="chat-layout"><div className="surface-card chat-card"><div className="chat-card-top"><div className="chat-partner"><div className="online-avatar"><Avatar student="Crystal" /><span /></div><div><strong>Crystal Mehta</strong><span>Usually replies in a few minutes</span></div></div><button className="dots-button"><MoreHorizontal size={18} /></button></div><div className="message-area"><div className="date-divider"><span>Current sprint</span></div>{messages.map((message, index) => <div className={`message-row ${message.sender === currentStudent ? "message-mine" : ""}`} key={`${message.time}-${index}`}><Avatar student={message.sender} small /><div><div className="message-bubble"><span>{message.message}</span></div><time>{message.sender} · {message.time}</time></div></div>)}<div className="activity-note"><CheckCircle2 size={15} /><span>Crystal completed <strong>Real Numbers</strong> · 18 min ago</span></div></div><div className="composer"><button className="composer-plus" aria-label="Add attachment"><Plus size={18} /></button><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") onSend(); }} aria-label="Write a note to Crystal" /><button className="send-button" onClick={onSend} aria-label="Send message"><Send size={16} /></button></div></div><div className="surface-card chat-side-card"><p className="eyebrow">ROOM PULSE</p><h3>Keep each other close to the finish line.</h3><div className="pulse-stat"><span className="pulse-icon"><Bell size={16} /></span><div><strong>2 unread updates</strong><span>Since your last visit</span></div></div><div className="pulse-stat"><span className="pulse-icon blush-icon"><CalendarDays size={16} /></span><div><strong>Day 01 of 15</strong><span>Today’s shared target</span></div></div><button className="text-button">Notification settings <ArrowUpRight size={15} /></button></div></div></section>;
}

function SyllabusView({ tasks, search, setSearch, filter, setFilter, isFilterOpen, setIsFilterOpen, currentStudent, onToggle }: { tasks: Task[]; search: string; setSearch: (value: string) => void; filter: string; setFilter: (value: string) => void; isFilterOpen: boolean; setIsFilterOpen: (value: boolean) => void; currentStudent: Student; onToggle: (id: string, student: Student) => void }) {
  const filters = ["All chapters", "All pending", "My pending", "Friend’s pending", "Today’s targets", "Unassigned"];
  return <section className="view-section"><div className="section-intro"><div><p className="eyebrow">CBSE CLASS 10 · 2026–27 · SUBJECTS 041 / 086 / 087 / 184 / 002 / 402</p><h1>The full syllabus</h1><p className="lede">One organized catalogue, with each chapter’s owner and pace in plain sight.</p></div></div><div className="syllabus-toolbar"><div className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search by chapter, subject, or ID" /></div><div className="filter-wrap"><button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}><Filter size={16} /> {filter}<ChevronDown size={15} /></button>{isFilterOpen && <div className="filter-menu">{filters.map((option) => <button key={option} className={filter === option ? "selected-filter" : ""} onClick={() => { setFilter(option); setIsFilterOpen(false); }}>{option}{filter === option && <Check size={14} />}</button>)}</div>}</div></div><div className="syllabus-stats"><span><strong>{tasks.length}</strong> showing</span><span><span className="tiny-key key-pink" /> Your lane</span><span><span className="tiny-key key-coffee" /> Friend’s lane</span></div><div className="surface-card syllabus-table-card"><div className="table-head"><span>CHAPTER</span><span>OWNER</span><span>TARGET</span><span>YOUR STATUS</span><span>FRIEND STATUS</span><span>OVERALL</span></div>{tasks.map((task) => <div className="table-row" key={task.id}><div className="chapter-cell"><span className={`subject-dot ${subjectColors[task.subject]}`} /><div><strong>{task.name}</strong><span>{task.subject} · Ch. {task.number} · <Hash size={11} /> {task.id}</span></div></div><div className="owner-cell"><Avatar student={task.owner} small /><span>{task.owner}</span></div><div className="target-cell"><CalendarDays size={14} /><span>{task.target}<small>{formatDate(task.day)}</small></span></div><div><button className={`table-check ${(currentStudent === "Tejas" ? task.tejas : task.crystal) ? "table-check-done" : ""}`} onClick={() => onToggle(task.id, currentStudent)}><span />{(currentStudent === "Tejas" ? task.tejas : task.crystal) ? "Completed" : "Mark complete"}</button></div><div><button className={`table-check ${(currentStudent === "Tejas" ? task.crystal : task.tejas) ? "table-check-done friend-check" : ""}`} onClick={() => onToggle(task.id, currentStudent === "Tejas" ? "Crystal" : "Tejas")}><span />{(currentStudent === "Tejas" ? task.crystal : task.tejas) ? "Completed" : "Pending"}</button></div><div><StatusPill status={task.status} /></div></div>)}{tasks.length === 0 && <div className="empty-state"><Search size={20} /><strong>No chapters found</strong><span>Try a different search or filter.</span></div>}</div></section>;
}

function ProgressView({ tasks, tejasCount, crystalCount, overallProgress, currentStudent, onToggle }: { tasks: Task[]; tejasCount: number; crystalCount: number; overallProgress: number; currentStudent: Student; onToggle: (id: string, student: Student) => void }) {
  const myCount = currentStudent === "Tejas" ? tejasCount : crystalCount;
  const friendCount = currentStudent === "Tejas" ? crystalCount : tejasCount;
  const friendName = currentStudent === "Tejas" ? "Crystal" : "Tejas";
  const myPending = tasks.filter((task) => currentStudent === "Tejas" ? !task.tejas : !task.crystal).slice(0, 3);

  return <section className="view-section"><div className="section-intro"><div><p className="eyebrow">YOUR LANE · {currentStudent.toUpperCase()}</p><h1>My progress</h1><p className="lede">Keep your own completion record honest, then celebrate the shared wins.</p></div><button className="outline-button"><Pencil size={15} /> Edit profile</button></div><div className="progress-overview-grid"><div className="surface-card progress-big-card"><div className="progress-big-copy"><p className="eyebrow">YOUR COMPLETION</p><h3>Steady looks good on you.</h3><p>You’ve completed {myCount} of {tasks.length} assigned chapters. {friendName}’s pace stays visible, but your lane is yours.</p><button className="text-button">Open my pending chapters <ArrowUpRight size={15} /></button></div><ProgressRing value={Math.round((myCount / tasks.length) * 100)} size={150} color="#c8848d" /></div><div className="surface-card progress-stats-card"><p className="eyebrow">THE ROOM, TOGETHER</p><div className="big-stat"><strong>{overallProgress}%</strong><span>shared completion</span></div><div className="split-stat"><div><Avatar student={currentStudent} small /><strong>{Math.round((myCount / tasks.length) * 100)}%</strong><span>{currentStudent}</span></div><div><Avatar student={friendName} small /><strong>{Math.round((friendCount / tasks.length) * 100)}%</strong><span>{friendName}</span></div></div></div></div><div className="surface-card planner-card"><div className="card-heading"><div><p className="eyebrow">THE 15-DAY PLANNER</p><h3>One day at a time</h3></div><span className="count-pill">Day 01 / 15</span></div><div className="planner-track">{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((day) => <div className={`planner-day ${day === 1 ? "planner-current" : ""}`} key={day}><span>{String(day).padStart(2, "0")}</span><i /></div>)}</div><div className="planner-footer"><div><Timer size={16} /><span>11 days to go</span></div><div><CheckCircle2 size={16} /><span>2 shared chapters done</span></div><div><Flag size={16} /><span>Keep the next step small</span></div></div></div><div className="surface-card next-up-card"><div className="card-heading"><div><p className="eyebrow">NEXT UP IN YOUR LANE</p><h3>Make the next mark</h3></div><span className="count-pill">{myPending.length} pending</span></div><div className="next-up-list">{myPending.map((task) => <div className="next-up-row" key={task.id}><button className="task-check" onClick={() => onToggle(task.id, currentStudent)}><Check size={14} /></button><div><strong>{task.name}</strong><span>{task.subject} · target {task.target}</span></div><span className="owner-tag">{task.owner === currentStudent ? "Yours" : `${task.owner}’s pick`}</span></div>)}</div></div></section>;
}
