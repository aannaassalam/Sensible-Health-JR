import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TocIcon from "@mui/icons-material/Toc";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArchiveIcon from "@mui/icons-material/Archive";
import FolderIcon from "@mui/icons-material/Folder";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SegmentIcon from "@mui/icons-material/Segment";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import UpdateIcon from "@mui/icons-material/Update";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { getRole } from "@/lib/functions/_helpers.lib";

export interface NavItem {
  title: string;
  path: string | null;
  icon: React.ElementType | null; // Use React.ElementType to represent the type of the icon
  children: NavItem[];
  hasChild: boolean;
}

const role = getRole();

const navConfig: NavItem[] =
  role === "ROLE_CARER"
    ? [
        {
          title: "Roster",
          path: "/staff-roster",
          icon: DashboardIcon,
          children: [],
          hasChild: false
        }
      ]
    : [
        {
          title: "Roster",
          path: "/",
          icon: DashboardIcon,
          children: [],
          hasChild: false
        },
        {
          title: "Staff",
          path: "/staff/list",
          icon: PersonIcon,
          children: [
            {
              title: "List",
              path: "/staff/list",
              icon: TocIcon,
              children: [],
              hasChild: false
            },
            // {
            //   title: "Teams",
            //   path: "/staff/teams",
            //   icon: GroupsIcon,
            //   children: [],
            //   hasChild: false
            // },
            {
              title: "Archived ",
              path: "/staff/archived",
              icon: ArchiveIcon,
              children: [],
              hasChild: false
            },
            // {
            //   title: "Document Hub",
            //   path: "/staff/document-hub",
            //   icon: FolderIcon,
            //   children: [],
            //   hasChild: false
            // },
            {
              title: "New",
              path: "/staff/new",
              icon: PersonAddIcon,
              children: [],
              hasChild: false
            }
          ],
          hasChild: true
        },
        {
          title: "Participant",
          path: "/participants/list",
          icon: PeopleAltIcon,
          children: [
            {
              title: "List",
              path: "/participants/list",
              icon: TocIcon,
              children: [],
              hasChild: false
            },
            {
              title: "Archived",
              path: "/participants/archived",
              icon: ArchiveIcon,
              children: [],
              hasChild: false
            },
            {
              title: "Expired Documents",
              path: "/participants/expired-documents",
              icon: RuleFolderIcon,
              children: [],
              hasChild: false
            },
            {
              title: "New",
              path: "/participants/new",
              icon: PersonAddIcon,
              children: [],
              hasChild: false
            }
          ],
          hasChild: true
        },
        {
          title: "Documents",
          path: "/documents",
          icon: FolderIcon,
          hasChild: false,
          children: [
            {
              title: "List",
              path: "/invoices/list",
              icon: TocIcon,
              children: [],
              hasChild: false
            },
            {
              title: "List void",
              path: "/invoices/list-void",
              icon: SegmentIcon,
              children: [],
              hasChild: false
            },
            {
              title: "Generate",
              path: "/invoices/generate",
              icon: PlaylistAddIcon,
              children: [],
              hasChild: false
            }
          ]
        },
        // {
        //   title: "Shift Notes",
        //   path: "/shift-notes",
        //   icon: ManageAccountsIcon,
        //   children: [
        //     {
        //       title: "Settings",
        //       path: "/shift-notes/settings",
        //       icon: SettingsIcon,
        //       children: [],
        //       hasChild: false
        //     },
        //     {
        //       title: "Invoice Settings",
        //       path: "/shift-notes/invoice-settings",
        //       icon: ContentPasteGoIcon,
        //       children: [],
        //       hasChild: false
        //     },
        //     {
        //       title: "Prices",
        //       path: "/shift-notes/prices",
        //       icon: AttachMoneyIcon,
        //       children: [],
        //       hasChild: false
        //     },
        //     {
        //       title: "Pay Items",
        //       path: "/shift-notes/pay-items",
        //       icon: RequestQuoteIcon,
        //       children: [],
        //       hasChild: false
        //     },
        //     {
        //       title: "Reminders",
        //       path: "/shift-notes/reminders",
        //       icon: UpdateIcon,
        //       children: [],
        //       hasChild: false
        //     },
        //     {
        //       title: "Subscription",
        //       path: "/shift-notes/subscription",
        //       icon: SubscriptionsIcon,
        //       children: [],
        //       hasChild: false
        //     }
        //   ],
        //   hasChild: false
        // },
        {
          title: "Shift Notes",
          path: "/shift-notes",
          icon: TocIcon,
          children: [],
          hasChild: false
        }
      ];

export default navConfig;
