import { JsonObject, Message } from '@bufbuild/protobuf';
import { DateTime } from '../../gen/google/type/datetime_pb';
import dayjs, { Dayjs } from 'dayjs';

/**
 * GrpcのDatetimeをYYYY/MM/DD HH:mm:ssに変換する
 */
export const convertDatetimeToString = (date?: DateTime): string => {
    return convertDatetimeToDayjsNullable(date)?.format("YYYY/MM/DD HH:mm:ss") ?? '';
}


/**
 * GrpcのDatetimeをDayjsに変換する
 */
export const convertDatetimeToDayjsNullable = (date?: DateTime): Dayjs | null => {
    if (!date) {
        return null;
    }
    return convertDatetimeToDayjs(date);
}


/**
 * GrpcのDatetimeをDayjsに変換する
 */
export const convertDatetimeToDayjs = (date: DateTime): Dayjs => {
    return dayjs(`${date?.year}-${date?.month}-${date?.day}`);
}

/**
 * DayjsをGrpcのDate変換用Jsonに変換する
 */
type GrpcDate = {
    year: number,
    month: number,
    day: number,
}
export const convertDayjsToDateJson = (date?: Dayjs | null): GrpcDate | null => {
    if (!date) {
        return null;
    }

    return {
        'year': date.year(),
        'month': date.month() + 1,
        'day': date.date(),
    };
}

/**
 * DayjsをGrpcのDatetime変換用Jsonに変換する
 */
type GrpcDatetime = {
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    seconds: number,
    nanos: number,
}
export const convertDayjsToDatetimeJson = (date?: Dayjs | null): GrpcDatetime | null => {
    if (!date) {
        return null;
    }
    return {
        'year': date.year(),
        'month': date.month() + 1,
        'day': date.date(),
        'hours': date.hour(),
        'minutes': date.minute(),
        'seconds': date.second(),
        'nanos': date.millisecond()
    };
}


/** GrpcのDatetimeを返す minutes, seconds, nanosは省略可 */
export const convertDayjsToDatetime = (date?: Dayjs) => {
    return DateTime.fromJson(convertDayjsToDatetimeJson(date));
}

/**
 * jsonをgrpcのパラメータに変換する
 */
export const convertJsonToGrpc = <T extends Message>(request: JsonObject, grpcRequestClass: new () => T) => {

    try {
        const staticMessage: T = grpcRequestClass as unknown as T;
        return staticMessage.fromJson(request);
    } catch (e: unknown) {
        throw e;
    }
}