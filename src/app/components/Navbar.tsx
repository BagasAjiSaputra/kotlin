"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import {
  MdHome,
  MdSettings,
  MdHistory,
  MdAccountCircle,
  MdConstruction,
} from "react-icons/md";

export default function BottomBar() {
  const pathname = usePathname();

  const menus = [
    { name: "Home", icon: <MdHome size={24} />, href: "/" },
    { name: "History", icon: <MdHistory size={24} />, href: "/history" },
    { name: "Mode", icon: <MdConstruction size={24} />, href: "/mode" },
    { name: "Chart", icon: <MdSettings size={24} />, href: "/chart" },
    { name: "Account", icon: <MdAccountCircle size={24} />, href: "/account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-99">
      <div className="grid grid-cols-5 text-center py-3">
        {menus.map((menu) => {
          const active = pathname === menu.href;

          return (
            <Link key={menu.name} href={menu.href} className="flex justify-center">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`${
                    active ? "text-blue-600" : "text-gray-500"
                  } transition`}
                >
                  {menu.icon}
                </div>
                <p
                  className={`text-xs ${
                    active ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {menu.name}
                </p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
