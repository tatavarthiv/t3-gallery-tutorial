"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

interface PostHogProviderProps {
  children: React.ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
      capture_exceptions: true, // capture exceptions via Error Tracking
      debug: process.env.NODE_ENV === "development",
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PHProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const userInfo = useUser();

  useEffect(() => {
    if (userInfo.user) {
      posthog.identify(userInfo?.user?.id, {
        email: userInfo?.user?.emailAddresses[0]?.emailAddress,
        name: userInfo?.user?.fullName,
      });
    } else if (!auth.isSignedIn) {
      posthog.reset();
    }
  }, [auth, userInfo]);

  return children;
}
