import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from "@features/dashboard";
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  PublicRoute,
} from "@features/auth";
import { DashboardLayout } from "@shared/components/layout/DashboardLayout";
import { DashboardSubPage } from "@features/dashboard/pages/DashboardSubPage";
import { AnalyticsPage } from "@features/analytics/pages/AnalyticsPage";
import { OrdersPage } from "@features/orders/pages/OrdersPage";
import { ProductsPage } from "@features/products/pages/ProductsPage";
import { CustomersPage } from "@features/customers/pages/CustomersPage";
import { FinancePage } from "@features/finance/pages/FinancePage";
import { ReportsPage } from "@features/reports/pages/ReportsPage";
import { SettingsPage } from "@features/settings/pages/SettingsPage";
import { HelpPage } from "@features/help/pages/HelpPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public auth routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            }
          />

          {/* Protected dashboard routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/*" element={<DashboardSubPage />} />

            {/* Feature Placeholders */}
            <Route path="/analytics/*" element={<AnalyticsPage />} />
            <Route path="/orders/*" element={<OrdersPage />} />
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="/customers/*" element={<CustomersPage />} />
            <Route path="/finance/*" element={<FinancePage />} />
            <Route path="/reports/*" element={<ReportsPage />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="/help/*" element={<HelpPage />} />
          </Route>

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
