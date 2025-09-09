import { MentionUser } from '@/entities/metion';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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

    setMembers: (members) =>
      set({
        members: [
          { id: 'here', type: 'HERE', name: 'here', email: '' },
          { id: 'everyone', type: 'EVERYONE', name: 'everyone', email: '' },
          ...members,
        ],
      }),

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
