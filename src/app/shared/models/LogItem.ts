import { LogItemType } from './LogItemType';
import { MonthLog } from './MonthLog';

export class LogItem {
    logItemID: number;
    message: string;
    date: Date;
    logItemType: LogItemType;
    monthLog: MonthLog;
}