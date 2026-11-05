# Board Sprint outcomes

## 1. Responsive private study-room shell

- The website presents a calm coffee pastel visual style with pastel pink accents.
- The layout is responsive on desktop and mobile.
- Navigation exposes Home, Chat, Syllabus, and My progress.
- The shared room identifies exactly two students: Tejas and Crystal.

## 2. Sprint dashboard and shared progress

- The homepage shows a common 15-day study sprint with days remaining.
- The homepage shows overall syllabus completion, total completed chapters, total pending chapters, and individual progress for both students.
- The homepage includes a shortcut to today’s tasks.
- The dashboard distinguishes Tejas’s independent completion from Crystal’s independent completion and the overall shared sprint.

## 3. Syllabus search and filtering

- The syllabus view contains an organized Class 10 subject/chapter catalogue with subject, chapter number, chapter name, owner, target day, date, and completion status.
- Search supports partial matching across chapter name, subject, chapter number, and chapter ID.
- Filters support all chapters, pending chapters, Tejas’s pending chapters, Crystal’s pending chapters, overdue chapters, today’s targets, and unassigned chapters.
- Completing a chapter updates the visible progress immediately without a full-page refresh.

## 4. Two-person completion interaction

- Each student has an independent completion status per chapter.
- A chapter only counts as fully complete when both students complete it.
- The interface uses clear status language for completed, in progress, pending, and shared completion.
- Marking a task complete updates the dashboard and the individual progress indicators.

## 5. Private chat surface

- The chat view keeps the two students in one in-app conversation.
- Messages show sender identity and time.
- The chat view includes unread/activity affordances and an empty composer that can send a new message.
- The activity feed can show chapter completion context alongside conversation.

## 6. 15-day planner / remaining work

- The dashboard includes a day-by-day sprint strip and a “What is left?” pending-task list.
- Today’s target chapters are visually distinguished from future and overdue work.
- The pending list exposes the owner and target day so unfinished work is actionable.
