export const supervisorHeaderConfig = {
  "/supervisor": {
    title: "Dashboard",
    subtitle: "Hello ",
  },
  "/supervisor/myinterns": {
    title: "My Interns",
    subtitle: "Manage and monitor your assigned interns",
  },
  "/supervisor/attendance": {
    title: "Attendance",
    subtitle: "Monitor and review intern DTRs",
  },
  "/supervisor/tasks": {
    title: "Tasks",
    subtitle: "Assign and monitor intern tasks",
  },
  "/supervisor/tasks/:internId": {
    getTitle: ({ params, usersDb }) => {
      return usersDb[params.internId]?.name || "Intern Name";
    },
    getSubtitle: ({ params, usersDb }) => {
      const internName = usersDb[params.internId]?.name || "Intern Name";
      return `Task Management > ${internName} > Tasks`;
    },
    showBack: true,
    backTo: "/supervisor/tasks",
  },

  "/supervisor/documents": {
    title: "Documents",
    subtitle: "View and comply with intern requests",
  },
  "/supervisor/evaluations": {
    title: "Evaluations",
    subtitle: "Assess intern performance",
  },
  "/supervisor/settings": {
    title: "Settings",
    subtitle: "Manage your preferences",
  },
  "/supervisor/notifications": {
    title: "Notifications",
    subtitle: "All Notifications",
  },
};
