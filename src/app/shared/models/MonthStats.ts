import { DayStats } from './DayStats';

export class MonthStats {
    monthStatsID: number;
    year: number;
    month: number;
    rapportSend: boolean;
    dayStats: DayStats;
}