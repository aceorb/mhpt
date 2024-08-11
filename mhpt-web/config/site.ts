export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Mental Health Progress Tracker",
  description: "Allows patients to log daily mental health statuses \n" +
      "and view trends over time.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Daily",
      href: "/daily",
    },
    {
      label: "Track",
      href: "/track",
    },
  ],
  navMenuItems: [
    {
      label: "Daily",
      href: "/daily",
    },
    {
      label: "Track",
      href: "/track",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
