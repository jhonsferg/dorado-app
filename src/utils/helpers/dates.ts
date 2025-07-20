import dayjs from 'dayjs';

export function parseDate(dateString: string): string {
  return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss');
}
