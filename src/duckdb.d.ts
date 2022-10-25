/**
 *
 * NOTE: TypeScript bindings have been added to Duckdb,
 * and should be shipped with DuckDb starting in the 0.5.2
 * release.
 * These declarations are shipped in the interim so that
 * folks can start trying this module now.
 *
 * THIS FILE SHOULD BE REMOVED AFTER DUCKDB 0.5.2 SHIPS!
 *
 * TypeScript declarations for Node.JS bindings for DuckDb.
 * See https://duckdb.org/docs/api/nodejs/overview for details
 * on Node.JS API
 */
declare module "duckdb" {
  export class DuckDbError extends Error {
    errno: number;
    code: string;
  }

  type Callback<T> = (err: DuckDbError | null, res: T) => void;

  export type RowData = {
    [columnName: string]: any;
  };

  export type TableData = RowData[];

  export class Connection {
    constructor(db: Database, callback?: Callback<any>);

    all(sql: string, ...args: [...any, Callback<TableData>] | []): void;
    each(sql: string, ...args: [...any, Callback<RowData>] | []): void;
    exec(sql: string, ...args: [...any, Callback<void>] | []): void;

    prepare(
      sql: string,
      ...args: [...any, Callback<Statement>] | []
    ): Statement;
    run(sql: string, ...args: [...any, Callback<void>] | []): Statement;

    register(
      name: string,
      return_type: string,
      fun: (...args: any[]) => any
    ): void;

    register_bulk(
      name: string,
      return_type: string,
      fun: (...args: any[]) => any
    ): void;
    unregister(name: string, callback: Callback<any>): void;

    stream(sql: any, ...args: any[]): QueryResult;
  }

  export class QueryResult {
    [Symbol.asyncIterator](): AsyncIterator<RowData>;
  }

  export class Database {
    constructor(path: string, accessMode?: number, callback?: Callback<any>);

    close(callback: Callback<void>): void;

    connect(): Connection;

    all(sql: string, ...args: [...any, Callback<TableData>] | []): void;
    each(sql: string, ...args: [...any, Callback<RowData>] | []): void;
    exec(sql: string, ...args: [...any, Callback<void>] | []): void;

    prepare(
      sql: string,
      ...args: [...any, Callback<Statement>] | []
    ): Statement;
    run(sql: string, ...args: [...any, Callback<void>] | []): Statement;

    register(
      name: string,
      return_type: string,
      fun: (...args: any[]) => any
    ): void;
    unregister(name: string, callback: Callback<any>): void;
  }

  export class Statement {
    constructor();

    all(...args: [...any, Callback<TableData>] | []): void;
    each(...args: [...any, Callback<RowData>] | []): void;

    finalize(callback?: Callback<void>): void;

    run(...args: [...any, Callback<void>] | []): Statement;
  }

  export const ERROR: number;

  export const OPEN_CREATE: number;

  export const OPEN_FULLMUTEX: number;

  export const OPEN_PRIVATECACHE: number;

  export const OPEN_READONLY: number;

  export const OPEN_READWRITE: number;

  export const OPEN_SHAREDCACHE: number;
}
