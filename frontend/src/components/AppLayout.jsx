import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ title, subtitle, children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title={title} subtitle={subtitle} />
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="page-content"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
