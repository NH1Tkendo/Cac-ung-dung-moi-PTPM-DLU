export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export const guestbookEntries: GuestbookEntry[] = [
  {
    id: "1",
    name: "User 1",
    message: "First message in guestbook!",
    createdAt: new Date().toISOString(),
  },
];
