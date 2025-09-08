import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface MentionUser {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}

interface MentionState {
  // 멘션 드롭다운 상태
  isDropdownOpen: boolean;
  filteredUsers: MentionUser[];
  selectedIndex: number;
  members: MentionUser[];

  // Actions
  setDropdownOpen: (open: boolean) => void;
  setMembers: (members: MentionUser[]) => void;
  setSelectedIndex: (index: number) => void;
  getFilteredUsers: () => MentionUser[];
  reset: () => void;
}

export const useMentionStore = create<MentionState>()(
  devtools((set, get) => ({
    isDropdownOpen: false,
    filteredUsers: [],
    selectedIndex: 0,
    members: [],

    setDropdownOpen: (open) => set({ isDropdownOpen: open }),

    setMembers: (members) => set({ members: members }),

    setSelectedIndex: (index) => {
      const { filteredUsers } = get();
      if (index >= 0 && index < filteredUsers.length) {
        set({ selectedIndex: index });
      }
    },

    getFilteredUsers: () => get().filteredUsers,

    reset: () =>
      set({
        isDropdownOpen: false,
        filteredUsers: [],
        selectedIndex: 0,
        members: [],
      }),
  })),
);
