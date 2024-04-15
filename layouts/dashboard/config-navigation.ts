import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TocIcon from "@mui/icons-material/Toc";

export interface NavItem {
  title: string;
  path: string | null;
  icon: React.ElementType | null; // Use React.ElementType to represent the type of the icon
  children: NavItem[];
  hasChild: boolean;
}

const navConfig: NavItem[] = [
  {
    title: "Scheduler",
    path: "/scheduler",
    icon: DashboardIcon,
    children: [],
    hasChild: false
  },
  {
    title: "Staff",
    path: "",
    icon: TocIcon,
    children: [
      {
        title: "List",
        path: "/staff/list",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Teams",
        path: "/staff/teams",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Archived ",
        path: "/staff/archived",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Document Hub",
        path: "/staff/document-hub",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "New",
        path: "/staff/new",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      }
    ],
    hasChild: true
  },
  {
    title: "Clients",
    path: "/clients/list/",
    icon: TocIcon,
    children: [
      {
        title: "List",
        path: "/clients/list",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Archived",
        path: "/clients/archived",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Expired Documents",
        path: "/clients/expired-documents",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "New",
        path: "/clients/new",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      }
    ],
    hasChild: true
  },
  {
    title: "Invoices",
    path: "/invoices/list/",
    icon: TocIcon,
    children: [
      {
        title: "List",
        path: "/invoices/list",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "List void",
        path: "/invoices/list-void",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Generate",
        path: "/invoices/generate",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      }
    ],
    hasChild: true
  },
  {
    title: "Reports",
    path: "/reports/activity/",
    icon: TocIcon,
    children: [
      {
        title: "Activity",
        path: "/reports/activity",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Billing",
        path: "/reports/billing",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Fund Balances",
        path: "/reports/fund-balances",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Geolocation",
        path: "/reports/geolocation",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Performance",
        path: "/reports/performances",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Exception report",
        path: "/reports/exception-reports",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Timesheet",
        path: "/reports/timesheet",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "KPI",
        path: "/reports/kpi",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Competency",
        path: "/reports/competency",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Compliance",
        path: "/reports/compliance",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Qualification",
        path: "/reports/qualification",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Events",
        path: "/reports/events",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      }
    ],
    hasChild: true
  },
  {
    title: "Account",
    path: "/account/settings/",
    icon: TocIcon,
    children: [
      {
        title: "Settings",
        path: "/account/settings",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Invoice Settings",
        path: "/account/invoice-settings",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Prices",
        path: "/account/prices",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Pay Items",
        path: "/account/pay-items",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Reminders",
        path: "/account/reminders",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      },
      {
        title: "Subscription",
        path: "/account/subscription",
        icon: SettingsIcon,
        children: [],
        hasChild: false
      }
    ],
    hasChild: true
  }
];

export default navConfig;
