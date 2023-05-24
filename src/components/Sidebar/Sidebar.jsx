import {SidebarFooter} from "./SidebarFooter";
import {SidebarConversations} from "./SidebarConversations";
import {SidebarHeader} from "./SidebarHeader";
import "./sidebarStyles.css";

export const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <SidebarHeader />

      <SidebarConversations />

      <SidebarFooter />
    </div>
  );
};
