import { TSchedule } from "./offeredCourse-intarface";

export const hasTimeConflict = (
  assignedScheduls: TSchedule[],
  newSchedule: TSchedule
) => {
  for (const schedule of assignedScheduls) {
    const existingStartTime = new Date(`2002-12-28T${schedule.startTime}`);
    const existingEndTime = new Date(`2002-12-28T${schedule.endTime}`);
    const newStartTime = new Date(`2002-12-28T${newSchedule.startTime}`);
    const newEndTime = new Date(`2002-12-28T${newSchedule.endTime}`);
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
