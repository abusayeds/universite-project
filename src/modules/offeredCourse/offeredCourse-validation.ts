import { z } from "zod";
import { Days } from "./offeredCourse-constant";

const TimeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time formet , Expected "HH:MM" in 24 hours formet ',
  }
);
const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: TimeStringSchema,
      endTime: TimeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`2002-12-28T${body.startTime}:00`);
        const end = new Date(`2002-12-28T${body.endTime}:00`);
        return end > start;
      },
      { message: `Start time should be before End tine  ` }
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: TimeStringSchema,
    endTime: TimeStringSchema,
  })
  .refine(
    (body) => {
      const start = new Date(`2002-12-28T${body.startTime}:00`);
      const end = new Date(`2002-12-28T${body.endTime}:00`);
      return end > start;
    },
    { message: `Start time should be before End tine  ` }
  ),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
