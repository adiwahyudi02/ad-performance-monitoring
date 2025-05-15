import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserToolbar } from ".";
import { useToast } from "@/contexts/toast.context";

// Mock the Toast Context
jest.mock("@/contexts/toast.context", () => ({
  useToast: jest.fn(),
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("UserToolbar", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      showToast: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("opens the menu when avatar is clicked", async () => {
    render(<UserToolbar />);

    // Click on the IconButton (Avatar)
    const avatarButton = screen.getByRole("button", {
      name: /Adi Wahyudi/i,
    });
    fireEvent.click(avatarButton);

    // Check if menu items are visible
    await waitFor(() => {
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });

  it("closes the menu when an item is clicked", async () => {
    render(<UserToolbar />);

    // Open the menu
    const avatarButton = screen.getByRole("button", {
      name: /Adi Wahyudi/i,
    });
    fireEvent.click(avatarButton);

    // Click on the Profile item
    const profileItem = await screen.findByText("Profile");
    fireEvent.click(profileItem);

    // Check that the menu is closed
    await waitFor(() => {
      expect(screen.queryByText("Profile")).not.toBeInTheDocument();
      expect(screen.queryByText("Settings")).not.toBeInTheDocument();
      expect(screen.queryByText("Logout")).not.toBeInTheDocument();
    });
  });
});
