// src/common/utils/date.util.ts


// src/common/utils/date.util.ts
import { format, toZonedTime } from 'date-fns-tz';


const DEFAULT_TIMEZONE = process.env.APP_TIMEZONE || 'Asia/Manila';

/**
 * Formats a given date to a readable string.
 * @param date - Date object or ISO string
 * @param pattern - Output format (default: yyyy-MM-dd HH:mm:ss)
 * @param timezone - Timezone string (default: Asia/Manila)
 */

export const getPkey = (): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return Number(`${year}${month}`);
};

export const getDayDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};



export function formatDate(
  date: Date | string,
  pattern = 'yyyy-MM-dd HH:mm:ss',
  timezone = DEFAULT_TIMEZONE,
): string {
  if (!date) return '';
  const zonedDate = toZonedTime(new Date(date), timezone);
  return format(zonedDate, pattern, { timeZone: timezone });
}
