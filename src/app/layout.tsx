"use client";
import AuthProvider from "@/common/contexts/AuthContext";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
import {
  faUser,
  faChevronDown,
  faClipboard,
  faInfoCircle,
  faTimes,
  faPlus,
  faHand,
  faMagic,
  faTrash,
  faPlay,
  faChevronRight,
  faChevronLeft,
  faStop,
  faFlagCheckered,
  faRepeat,
  fas,
  faPuzzlePiece,
  faRocket,
  faThumbsUp,
  faClock,
  faChartBar,
  faShuffle,
  faGear,
  faShare,
  faEquals,
  faPenRuler,
  faBook,
  faEllipsisVertical,
  faDoorOpen,
  faSave,
  faEnvelope,
  faBars,
  faCheck,
  faPen,
  faMagnifyingGlass,
  faHeart,
  faComment,
  faRightFromBracket,
  faShirt,
  faGamepad,
  faMobile,
  faBookmark,
  faFilter,
  faList,
  faStar,
  faSliders,
  faCrown,
  faFlag,
  faCamera,
  faPaperPlane,
  faPaperclip,
  faGrip,
  faRotate,
  faWifi,
  faLock,
  faPhone,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const { library } = require("@fortawesome/fontawesome-svg-core");

library.add(
  faUser,
  faChevronDown,
  faClipboard,
  faInfoCircle,
  faTimes,
  faPlus,
  faHand,
  faMagic,
  faTrash,
  faPlay,
  faChevronRight,
  faChevronLeft,
  faStop,
  fas,
  faFlagCheckered,
  faRepeat,
  faPuzzlePiece,
  faRocket,
  faThumbsUp,
  faClock,
  faChartBar,
  faShuffle,
  faGear,
  faShare,
  faEquals,
  faPenRuler,
  faBook,
  faEllipsisVertical,
  faDoorOpen,
  faSave,
  faEnvelope,
  faBars,
  faCheck,
  faPen,
  faChevronDown,
  faMagnifyingGlass,
  faChevronRight,
  faChevronLeft,
  faComment,
  faRightFromBracket,
  faHeart,
  faShirt,
  faGamepad,
  faMobile,
  faBookmark,
  faFilter,
  faList,
  faStar,
  faSliders,
  faCrown,
  faFlag,
  faCamera,
  faPaperPlane,
  faPaperclip,
  faGrip,
  faRotate,
  faWifi,
  faLock,
  faPhone,
  faQuestion,
  faInfoCircle,
);

import { QueryClientProvider, QueryClient } from "react-query";
import InstitutionProvider from "@/common/contexts/InstitutionContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// export const metadata = {
//   title: "Create T3 App",
//   description: "Generated by create-t3-app",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InstitutionProvider>
          <html lang="cs">
            <head>
              <link
                href="https://fonts.googleapis.com/css2?family=Geologica:wght@300;400;700&display=swap"
                rel="stylesheet"
              />
            </head>
            <body className="bg-bg font-geologica">
              <Toaster position="top-center" />
              {children}
            </body>
          </html>
        </InstitutionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}