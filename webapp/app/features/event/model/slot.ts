export type SelectedDateSlot =
    | {
          equal: Date;
      }
    | {
          startDate: Date;
          endDate: Date;
      };
