import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/configs/theme.config";
import { ToastProvider } from "@/contexts/toast.context";
import { DasboardLayout } from "@/components/layouts/dashboard-layout";
import { ReactQueryProvider } from "@/providers/react-query.provider";
import { APP_NAME } from "@/constants/app.constants";

export const metadata: Metadata = {
  title: `${APP_NAME} | Adi Wahyudi`,
  description:
    "Track and analyze the performance of your advertising ads with detailed insights on key metrics such as CTR, impressions, and more. Stay on top of your advertising goals and optimize for success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReactQueryProvider>
              <ToastProvider>
                <DasboardLayout>{children}</DasboardLayout>
              </ToastProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
