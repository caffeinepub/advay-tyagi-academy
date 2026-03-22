import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Ebooks from "./pages/Ebooks";
import Geopolitics from "./pages/Geopolitics";
import Home from "./pages/Home";
import Masterclasses from "./pages/Masterclasses";
import Payment from "./pages/Payment";
import ZoomMeetings from "./pages/ZoomMeetings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.14 0.028 243)" }}
    >
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const masterclassesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/masterclasses",
  component: Masterclasses,
});
const geopoliticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/geopolitics",
  component: Geopolitics,
});
const ebooksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ebooks",
  component: Ebooks,
});
const zoomMeetingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zoom-meetings",
  component: ZoomMeetings,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: Payment,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  masterclassesRoute,
  geopoliticsRoute,
  ebooksRoute,
  zoomMeetingsRoute,
  adminRoute,
  paymentRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
