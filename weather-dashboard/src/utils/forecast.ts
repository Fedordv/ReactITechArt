export const getFiveDaysForecast = (list: any[]) =>
  list
    .filter(item => item.dt_txt.includes('12:00:00'))
    .slice(0, 5);
