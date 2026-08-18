export const USER_ROLES = Object.freeze({
  FOUNDER: "founder",
  INVESTOR: "investor",
  MENTOR: "mentor",
  STUDENT: "student",
});

export const USER_ROLE_VALUES = Object.freeze(Object.values(USER_ROLES));

export const USER_ROLE_LABELS = Object.freeze({
  [USER_ROLES.FOUNDER]: "Founder",
  [USER_ROLES.INVESTOR]: "Investor",
  [USER_ROLES.MENTOR]: "Mentor",
  [USER_ROLES.STUDENT]: "Student",
});

export const USER_ROLE_BADGES = Object.freeze({
  [USER_ROLES.FOUNDER]: "🚀 Founder",
  [USER_ROLES.INVESTOR]: "💼 Investor",
  [USER_ROLES.MENTOR]: "💡 Mentor",
  [USER_ROLES.STUDENT]: "🎓 Student",
});

export const DEMO_AUTH_ACCOUNTS = Object.freeze([
  {
    id: "user_demo_founder",
    name: "Sarah Chen",
    email: "founder@nexventure.com",
    password: "password123",
    role: USER_ROLES.FOUNDER,
  },
  {
    id: "user_demo_investor",
    name: "Marcus Vance",
    email: "investor@nexventure.com",
    password: "password123",
    role: USER_ROLES.INVESTOR,
  },
  {
    id: "user_demo_mentor",
    name: "Dr. Aris Thorne",
    email: "mentor@nexventure.com",
    password: "password123",
    role: USER_ROLES.MENTOR,
  },
  {
    id: "user_demo_student",
    name: "Elena Rostova",
    email: "student@nexventure.com",
    password: "password123",
    role: USER_ROLES.STUDENT,
  },
]);
