
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Device
 * 
 */
export type Device = $Result.DefaultSelection<Prisma.$DevicePayload>
/**
 * Model BillHistory
 * 
 */
export type BillHistory = $Result.DefaultSelection<Prisma.$BillHistoryPayload>
/**
 * Model UtilityProvider
 * 
 */
export type UtilityProvider = $Result.DefaultSelection<Prisma.$UtilityProviderPayload>
/**
 * Model HourlyRate
 * 
 */
export type HourlyRate = $Result.DefaultSelection<Prisma.$HourlyRatePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.device`: Exposes CRUD operations for the **Device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.DeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.billHistory`: Exposes CRUD operations for the **BillHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BillHistories
    * const billHistories = await prisma.billHistory.findMany()
    * ```
    */
  get billHistory(): Prisma.BillHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.utilityProvider`: Exposes CRUD operations for the **UtilityProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UtilityProviders
    * const utilityProviders = await prisma.utilityProvider.findMany()
    * ```
    */
  get utilityProvider(): Prisma.UtilityProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hourlyRate`: Exposes CRUD operations for the **HourlyRate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HourlyRates
    * const hourlyRates = await prisma.hourlyRate.findMany()
    * ```
    */
  get hourlyRate(): Prisma.HourlyRateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Location: 'Location',
    Device: 'Device',
    BillHistory: 'BillHistory',
    UtilityProvider: 'UtilityProvider',
    HourlyRate: 'HourlyRate'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "location" | "device" | "billHistory" | "utilityProvider" | "hourlyRate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Device: {
        payload: Prisma.$DevicePayload<ExtArgs>
        fields: Prisma.DeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findFirst: {
            args: Prisma.DeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findMany: {
            args: Prisma.DeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          create: {
            args: Prisma.DeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          createMany: {
            args: Prisma.DeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          delete: {
            args: Prisma.DeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          update: {
            args: Prisma.DeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          deleteMany: {
            args: Prisma.DeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          upsert: {
            args: Prisma.DeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevice>
          }
          groupBy: {
            args: Prisma.DeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number
          }
        }
      }
      BillHistory: {
        payload: Prisma.$BillHistoryPayload<ExtArgs>
        fields: Prisma.BillHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>
          }
          findFirst: {
            args: Prisma.BillHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>
          }
          findMany: {
            args: Prisma.BillHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>[]
          }
          create: {
            args: Prisma.BillHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>
          }
          createMany: {
            args: Prisma.BillHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>[]
          }
          delete: {
            args: Prisma.BillHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>
          }
          update: {
            args: Prisma.BillHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>
          }
          deleteMany: {
            args: Prisma.BillHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BillHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>[]
          }
          upsert: {
            args: Prisma.BillHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillHistoryPayload>
          }
          aggregate: {
            args: Prisma.BillHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBillHistory>
          }
          groupBy: {
            args: Prisma.BillHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<BillHistoryCountAggregateOutputType> | number
          }
        }
      }
      UtilityProvider: {
        payload: Prisma.$UtilityProviderPayload<ExtArgs>
        fields: Prisma.UtilityProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UtilityProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UtilityProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>
          }
          findFirst: {
            args: Prisma.UtilityProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UtilityProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>
          }
          findMany: {
            args: Prisma.UtilityProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>[]
          }
          create: {
            args: Prisma.UtilityProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>
          }
          createMany: {
            args: Prisma.UtilityProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UtilityProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>[]
          }
          delete: {
            args: Prisma.UtilityProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>
          }
          update: {
            args: Prisma.UtilityProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>
          }
          deleteMany: {
            args: Prisma.UtilityProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UtilityProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UtilityProviderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>[]
          }
          upsert: {
            args: Prisma.UtilityProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilityProviderPayload>
          }
          aggregate: {
            args: Prisma.UtilityProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUtilityProvider>
          }
          groupBy: {
            args: Prisma.UtilityProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<UtilityProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.UtilityProviderCountArgs<ExtArgs>
            result: $Utils.Optional<UtilityProviderCountAggregateOutputType> | number
          }
        }
      }
      HourlyRate: {
        payload: Prisma.$HourlyRatePayload<ExtArgs>
        fields: Prisma.HourlyRateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HourlyRateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HourlyRateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>
          }
          findFirst: {
            args: Prisma.HourlyRateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HourlyRateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>
          }
          findMany: {
            args: Prisma.HourlyRateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>[]
          }
          create: {
            args: Prisma.HourlyRateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>
          }
          createMany: {
            args: Prisma.HourlyRateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HourlyRateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>[]
          }
          delete: {
            args: Prisma.HourlyRateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>
          }
          update: {
            args: Prisma.HourlyRateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>
          }
          deleteMany: {
            args: Prisma.HourlyRateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HourlyRateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HourlyRateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>[]
          }
          upsert: {
            args: Prisma.HourlyRateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HourlyRatePayload>
          }
          aggregate: {
            args: Prisma.HourlyRateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHourlyRate>
          }
          groupBy: {
            args: Prisma.HourlyRateGroupByArgs<ExtArgs>
            result: $Utils.Optional<HourlyRateGroupByOutputType>[]
          }
          count: {
            args: Prisma.HourlyRateCountArgs<ExtArgs>
            result: $Utils.Optional<HourlyRateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    location?: LocationOmit
    device?: DeviceOmit
    billHistory?: BillHistoryOmit
    utilityProvider?: UtilityProviderOmit
    hourlyRate?: HourlyRateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    locations: number
    billHistory: number
    devices: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | UserCountOutputTypeCountLocationsArgs
    billHistory?: boolean | UserCountOutputTypeCountBillHistoryArgs
    devices?: boolean | UserCountOutputTypeCountDevicesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBillHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDevicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
  }


  /**
   * Count Type UtilityProviderCountOutputType
   */

  export type UtilityProviderCountOutputType = {
    hourlyRates: number
    users: number
  }

  export type UtilityProviderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hourlyRates?: boolean | UtilityProviderCountOutputTypeCountHourlyRatesArgs
    users?: boolean | UtilityProviderCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * UtilityProviderCountOutputType without action
   */
  export type UtilityProviderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProviderCountOutputType
     */
    select?: UtilityProviderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UtilityProviderCountOutputType without action
   */
  export type UtilityProviderCountOutputTypeCountHourlyRatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HourlyRateWhereInput
  }

  /**
   * UtilityProviderCountOutputType without action
   */
  export type UtilityProviderCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    utilityProv: string | null
    selectedProviderId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    utilityProv: string | null
    selectedProviderId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    utilityProv: number
    selectedProviderId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    utilityProv?: true
    selectedProviderId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    utilityProv?: true
    selectedProviderId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    utilityProv?: true
    selectedProviderId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    utilityProv: string | null
    selectedProviderId: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    utilityProv?: boolean
    selectedProviderId?: boolean
    selectedProvider?: boolean | User$selectedProviderArgs<ExtArgs>
    locations?: boolean | User$locationsArgs<ExtArgs>
    billHistory?: boolean | User$billHistoryArgs<ExtArgs>
    devices?: boolean | User$devicesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    utilityProv?: boolean
    selectedProviderId?: boolean
    selectedProvider?: boolean | User$selectedProviderArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    utilityProv?: boolean
    selectedProviderId?: boolean
    selectedProvider?: boolean | User$selectedProviderArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    utilityProv?: boolean
    selectedProviderId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "utilityProv" | "selectedProviderId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    selectedProvider?: boolean | User$selectedProviderArgs<ExtArgs>
    locations?: boolean | User$locationsArgs<ExtArgs>
    billHistory?: boolean | User$billHistoryArgs<ExtArgs>
    devices?: boolean | User$devicesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    selectedProvider?: boolean | User$selectedProviderArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    selectedProvider?: boolean | User$selectedProviderArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      selectedProvider: Prisma.$UtilityProviderPayload<ExtArgs> | null
      locations: Prisma.$LocationPayload<ExtArgs>[]
      billHistory: Prisma.$BillHistoryPayload<ExtArgs>[]
      devices: Prisma.$DevicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      utilityProv: string | null
      selectedProviderId: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    selectedProvider<T extends User$selectedProviderArgs<ExtArgs> = {}>(args?: Subset<T, User$selectedProviderArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    locations<T extends User$locationsArgs<ExtArgs> = {}>(args?: Subset<T, User$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    billHistory<T extends User$billHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$billHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    devices<T extends User$devicesArgs<ExtArgs> = {}>(args?: Subset<T, User$devicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly utilityProv: FieldRef<"User", 'String'>
    readonly selectedProviderId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.selectedProvider
   */
  export type User$selectedProviderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    where?: UtilityProviderWhereInput
  }

  /**
   * User.locations
   */
  export type User$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    cursor?: LocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * User.billHistory
   */
  export type User$billHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    where?: BillHistoryWhereInput
    orderBy?: BillHistoryOrderByWithRelationInput | BillHistoryOrderByWithRelationInput[]
    cursor?: BillHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillHistoryScalarFieldEnum | BillHistoryScalarFieldEnum[]
  }

  /**
   * User.devices
   */
  export type User$devicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    zip: string | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    zip: string | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    userId: number
    zip: number
    _all: number
  }


  export type LocationMinAggregateInputType = {
    id?: true
    userId?: true
    zip?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    userId?: true
    zip?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    userId?: true
    zip?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    userId: string
    zip: string
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    zip?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    zip?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    zip?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    userId?: boolean
    zip?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "zip", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      zip: string
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly userId: FieldRef<"Location", 'String'>
    readonly zip: FieldRef<"Location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _avg: DeviceAvgAggregateOutputType | null
    _sum: DeviceSumAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceAvgAggregateOutputType = {
    hourlyEnergy: number | null
    runDurationMinutes: number | null
  }

  export type DeviceSumAggregateOutputType = {
    hourlyEnergy: number | null
    runDurationMinutes: number | null
  }

  export type DeviceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: string | null
    brand: string | null
    model: string | null
    hourlyEnergy: number | null
    isSmart: boolean | null
    runDurationMinutes: number | null
  }

  export type DeviceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: string | null
    brand: string | null
    model: string | null
    hourlyEnergy: number | null
    isSmart: boolean | null
    runDurationMinutes: number | null
  }

  export type DeviceCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    type: number
    brand: number
    model: number
    hourlyEnergy: number
    isSmart: number
    runDurationMinutes: number
    _all: number
  }


  export type DeviceAvgAggregateInputType = {
    hourlyEnergy?: true
    runDurationMinutes?: true
  }

  export type DeviceSumAggregateInputType = {
    hourlyEnergy?: true
    runDurationMinutes?: true
  }

  export type DeviceMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    brand?: true
    model?: true
    hourlyEnergy?: true
    isSmart?: true
    runDurationMinutes?: true
  }

  export type DeviceMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    brand?: true
    model?: true
    hourlyEnergy?: true
    isSmart?: true
    runDurationMinutes?: true
  }

  export type DeviceCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    brand?: true
    model?: true
    hourlyEnergy?: true
    isSmart?: true
    runDurationMinutes?: true
    _all?: true
  }

  export type DeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Device to aggregate.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type DeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithAggregationInput | DeviceOrderByWithAggregationInput[]
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum
    having?: DeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _avg?: DeviceAvgAggregateInputType
    _sum?: DeviceSumAggregateInputType
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }

  export type DeviceGroupByOutputType = {
    id: string
    userId: string
    name: string
    type: string
    brand: string | null
    model: string | null
    hourlyEnergy: number | null
    isSmart: boolean
    runDurationMinutes: number | null
    _count: DeviceCountAggregateOutputType | null
    _avg: DeviceAvgAggregateOutputType | null
    _sum: DeviceSumAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type DeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    brand?: boolean
    model?: boolean
    hourlyEnergy?: boolean
    isSmart?: boolean
    runDurationMinutes?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    brand?: boolean
    model?: boolean
    hourlyEnergy?: boolean
    isSmart?: boolean
    runDurationMinutes?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    brand?: boolean
    model?: boolean
    hourlyEnergy?: boolean
    isSmart?: boolean
    runDurationMinutes?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    brand?: boolean
    model?: boolean
    hourlyEnergy?: boolean
    isSmart?: boolean
    runDurationMinutes?: boolean
  }

  export type DeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "type" | "brand" | "model" | "hourlyEnergy" | "isSmart" | "runDurationMinutes", ExtArgs["result"]["device"]>
  export type DeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Device"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      type: string
      brand: string | null
      model: string | null
      hourlyEnergy: number | null
      isSmart: boolean
      runDurationMinutes: number | null
    }, ExtArgs["result"]["device"]>
    composites: {}
  }

  type DeviceGetPayload<S extends boolean | null | undefined | DeviceDefaultArgs> = $Result.GetResult<Prisma.$DevicePayload, S>

  type DeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface DeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Device'], meta: { name: 'Device' } }
    /**
     * Find zero or one Device that matches the filter.
     * @param {DeviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceFindUniqueArgs>(args: SelectSubset<T, DeviceFindUniqueArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Device that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceFindFirstArgs>(args?: SelectSubset<T, DeviceFindFirstArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceWithIdOnly = await prisma.device.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceFindManyArgs>(args?: SelectSubset<T, DeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Device.
     * @param {DeviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
     */
    create<T extends DeviceCreateArgs>(args: SelectSubset<T, DeviceCreateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Devices.
     * @param {DeviceCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceCreateManyArgs>(args?: SelectSubset<T, DeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {DeviceCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Device.
     * @param {DeviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
     */
    delete<T extends DeviceDeleteArgs>(args: SelectSubset<T, DeviceDeleteArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Device.
     * @param {DeviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceUpdateArgs>(args: SelectSubset<T, DeviceUpdateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Devices.
     * @param {DeviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceDeleteManyArgs>(args?: SelectSubset<T, DeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceUpdateManyArgs>(args: SelectSubset<T, DeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices and returns the data updated in the database.
     * @param {DeviceUpdateManyAndReturnArgs} args - Arguments to update many Devices.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Device.
     * @param {DeviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
     */
    upsert<T extends DeviceUpsertArgs>(args: SelectSubset<T, DeviceUpsertArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends DeviceCountArgs>(
      args?: Subset<T, DeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceGroupByArgs['orderBy'] }
        : { orderBy?: DeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Device model
   */
  readonly fields: DeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Device model
   */
  interface DeviceFieldRefs {
    readonly id: FieldRef<"Device", 'String'>
    readonly userId: FieldRef<"Device", 'String'>
    readonly name: FieldRef<"Device", 'String'>
    readonly type: FieldRef<"Device", 'String'>
    readonly brand: FieldRef<"Device", 'String'>
    readonly model: FieldRef<"Device", 'String'>
    readonly hourlyEnergy: FieldRef<"Device", 'Float'>
    readonly isSmart: FieldRef<"Device", 'Boolean'>
    readonly runDurationMinutes: FieldRef<"Device", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Device findUnique
   */
  export type DeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findUniqueOrThrow
   */
  export type DeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findFirst
   */
  export type DeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findFirstOrThrow
   */
  export type DeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findMany
   */
  export type DeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Devices to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device create
   */
  export type DeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a Device.
     */
    data: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
  }

  /**
   * Device createMany
   */
  export type DeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Device createManyAndReturn
   */
  export type DeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device update
   */
  export type DeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a Device.
     */
    data: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
    /**
     * Choose, which Device to update.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device updateMany
   */
  export type DeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
  }

  /**
   * Device updateManyAndReturn
   */
  export type DeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device upsert
   */
  export type DeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the Device to update in case it exists.
     */
    where: DeviceWhereUniqueInput
    /**
     * In case the Device found by the `where` argument doesn't exist, create a new Device with this data.
     */
    create: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
    /**
     * In case the Device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
  }

  /**
   * Device delete
   */
  export type DeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter which Device to delete.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device deleteMany
   */
  export type DeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Devices to delete
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to delete.
     */
    limit?: number
  }

  /**
   * Device without action
   */
  export type DeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
  }


  /**
   * Model BillHistory
   */

  export type AggregateBillHistory = {
    _count: BillHistoryCountAggregateOutputType | null
    _avg: BillHistoryAvgAggregateOutputType | null
    _sum: BillHistorySumAggregateOutputType | null
    _min: BillHistoryMinAggregateOutputType | null
    _max: BillHistoryMaxAggregateOutputType | null
  }

  export type BillHistoryAvgAggregateOutputType = {
    billTotal: Decimal | null
  }

  export type BillHistorySumAggregateOutputType = {
    billTotal: Decimal | null
  }

  export type BillHistoryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    billTotal: Decimal | null
    createdDate: Date | null
  }

  export type BillHistoryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    billTotal: Decimal | null
    createdDate: Date | null
  }

  export type BillHistoryCountAggregateOutputType = {
    id: number
    userId: number
    billTotal: number
    createdDate: number
    _all: number
  }


  export type BillHistoryAvgAggregateInputType = {
    billTotal?: true
  }

  export type BillHistorySumAggregateInputType = {
    billTotal?: true
  }

  export type BillHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    billTotal?: true
    createdDate?: true
  }

  export type BillHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    billTotal?: true
    createdDate?: true
  }

  export type BillHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    billTotal?: true
    createdDate?: true
    _all?: true
  }

  export type BillHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillHistory to aggregate.
     */
    where?: BillHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillHistories to fetch.
     */
    orderBy?: BillHistoryOrderByWithRelationInput | BillHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BillHistories
    **/
    _count?: true | BillHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillHistoryMaxAggregateInputType
  }

  export type GetBillHistoryAggregateType<T extends BillHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateBillHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBillHistory[P]>
      : GetScalarType<T[P], AggregateBillHistory[P]>
  }




  export type BillHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillHistoryWhereInput
    orderBy?: BillHistoryOrderByWithAggregationInput | BillHistoryOrderByWithAggregationInput[]
    by: BillHistoryScalarFieldEnum[] | BillHistoryScalarFieldEnum
    having?: BillHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillHistoryCountAggregateInputType | true
    _avg?: BillHistoryAvgAggregateInputType
    _sum?: BillHistorySumAggregateInputType
    _min?: BillHistoryMinAggregateInputType
    _max?: BillHistoryMaxAggregateInputType
  }

  export type BillHistoryGroupByOutputType = {
    id: string
    userId: string
    billTotal: Decimal
    createdDate: Date
    _count: BillHistoryCountAggregateOutputType | null
    _avg: BillHistoryAvgAggregateOutputType | null
    _sum: BillHistorySumAggregateOutputType | null
    _min: BillHistoryMinAggregateOutputType | null
    _max: BillHistoryMaxAggregateOutputType | null
  }

  type GetBillHistoryGroupByPayload<T extends BillHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], BillHistoryGroupByOutputType[P]>
        }
      >
    >


  export type BillHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    billTotal?: boolean
    createdDate?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["billHistory"]>

  export type BillHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    billTotal?: boolean
    createdDate?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["billHistory"]>

  export type BillHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    billTotal?: boolean
    createdDate?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["billHistory"]>

  export type BillHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    billTotal?: boolean
    createdDate?: boolean
  }

  export type BillHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "billTotal" | "createdDate", ExtArgs["result"]["billHistory"]>
  export type BillHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BillHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BillHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BillHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BillHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      billTotal: Prisma.Decimal
      createdDate: Date
    }, ExtArgs["result"]["billHistory"]>
    composites: {}
  }

  type BillHistoryGetPayload<S extends boolean | null | undefined | BillHistoryDefaultArgs> = $Result.GetResult<Prisma.$BillHistoryPayload, S>

  type BillHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BillHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BillHistoryCountAggregateInputType | true
    }

  export interface BillHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BillHistory'], meta: { name: 'BillHistory' } }
    /**
     * Find zero or one BillHistory that matches the filter.
     * @param {BillHistoryFindUniqueArgs} args - Arguments to find a BillHistory
     * @example
     * // Get one BillHistory
     * const billHistory = await prisma.billHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillHistoryFindUniqueArgs>(args: SelectSubset<T, BillHistoryFindUniqueArgs<ExtArgs>>): Prisma__BillHistoryClient<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BillHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BillHistoryFindUniqueOrThrowArgs} args - Arguments to find a BillHistory
     * @example
     * // Get one BillHistory
     * const billHistory = await prisma.billHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, BillHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillHistoryClient<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BillHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillHistoryFindFirstArgs} args - Arguments to find a BillHistory
     * @example
     * // Get one BillHistory
     * const billHistory = await prisma.billHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillHistoryFindFirstArgs>(args?: SelectSubset<T, BillHistoryFindFirstArgs<ExtArgs>>): Prisma__BillHistoryClient<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BillHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillHistoryFindFirstOrThrowArgs} args - Arguments to find a BillHistory
     * @example
     * // Get one BillHistory
     * const billHistory = await prisma.billHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, BillHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillHistoryClient<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BillHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BillHistories
     * const billHistories = await prisma.billHistory.findMany()
     * 
     * // Get first 10 BillHistories
     * const billHistories = await prisma.billHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billHistoryWithIdOnly = await prisma.billHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillHistoryFindManyArgs>(args?: SelectSubset<T, BillHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BillHistory.
     * @param {BillHistoryCreateArgs} args - Arguments to create a BillHistory.
     * @example
     * // Create one BillHistory
     * const BillHistory = await prisma.billHistory.create({
     *   data: {
     *     // ... data to create a BillHistory
     *   }
     * })
     * 
     */
    create<T extends BillHistoryCreateArgs>(args: SelectSubset<T, BillHistoryCreateArgs<ExtArgs>>): Prisma__BillHistoryClient<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BillHistories.
     * @param {BillHistoryCreateManyArgs} args - Arguments to create many BillHistories.
     * @example
     * // Create many BillHistories
     * const billHistory = await prisma.billHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillHistoryCreateManyArgs>(args?: SelectSubset<T, BillHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BillHistories and returns the data saved in the database.
     * @param {BillHistoryCreateManyAndReturnArgs} args - Arguments to create many BillHistories.
     * @example
     * // Create many BillHistories
     * const billHistory = await prisma.billHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BillHistories and only return the `id`
     * const billHistoryWithIdOnly = await prisma.billHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, BillHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BillHistory.
     * @param {BillHistoryDeleteArgs} args - Arguments to delete one BillHistory.
     * @example
     * // Delete one BillHistory
     * const BillHistory = await prisma.billHistory.delete({
     *   where: {
     *     // ... filter to delete one BillHistory
     *   }
     * })
     * 
     */
    delete<T extends BillHistoryDeleteArgs>(args: SelectSubset<T, BillHistoryDeleteArgs<ExtArgs>>): Prisma__BillHistoryClient<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BillHistory.
     * @param {BillHistoryUpdateArgs} args - Arguments to update one BillHistory.
     * @example
     * // Update one BillHistory
     * const billHistory = await prisma.billHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillHistoryUpdateArgs>(args: SelectSubset<T, BillHistoryUpdateArgs<ExtArgs>>): Prisma__BillHistoryClient<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BillHistories.
     * @param {BillHistoryDeleteManyArgs} args - Arguments to filter BillHistories to delete.
     * @example
     * // Delete a few BillHistories
     * const { count } = await prisma.billHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillHistoryDeleteManyArgs>(args?: SelectSubset<T, BillHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BillHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BillHistories
     * const billHistory = await prisma.billHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillHistoryUpdateManyArgs>(args: SelectSubset<T, BillHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BillHistories and returns the data updated in the database.
     * @param {BillHistoryUpdateManyAndReturnArgs} args - Arguments to update many BillHistories.
     * @example
     * // Update many BillHistories
     * const billHistory = await prisma.billHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BillHistories and only return the `id`
     * const billHistoryWithIdOnly = await prisma.billHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BillHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, BillHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BillHistory.
     * @param {BillHistoryUpsertArgs} args - Arguments to update or create a BillHistory.
     * @example
     * // Update or create a BillHistory
     * const billHistory = await prisma.billHistory.upsert({
     *   create: {
     *     // ... data to create a BillHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BillHistory we want to update
     *   }
     * })
     */
    upsert<T extends BillHistoryUpsertArgs>(args: SelectSubset<T, BillHistoryUpsertArgs<ExtArgs>>): Prisma__BillHistoryClient<$Result.GetResult<Prisma.$BillHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BillHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillHistoryCountArgs} args - Arguments to filter BillHistories to count.
     * @example
     * // Count the number of BillHistories
     * const count = await prisma.billHistory.count({
     *   where: {
     *     // ... the filter for the BillHistories we want to count
     *   }
     * })
    **/
    count<T extends BillHistoryCountArgs>(
      args?: Subset<T, BillHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BillHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BillHistoryAggregateArgs>(args: Subset<T, BillHistoryAggregateArgs>): Prisma.PrismaPromise<GetBillHistoryAggregateType<T>>

    /**
     * Group by BillHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BillHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillHistoryGroupByArgs['orderBy'] }
        : { orderBy?: BillHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BillHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BillHistory model
   */
  readonly fields: BillHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BillHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BillHistory model
   */
  interface BillHistoryFieldRefs {
    readonly id: FieldRef<"BillHistory", 'String'>
    readonly userId: FieldRef<"BillHistory", 'String'>
    readonly billTotal: FieldRef<"BillHistory", 'Decimal'>
    readonly createdDate: FieldRef<"BillHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BillHistory findUnique
   */
  export type BillHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BillHistory to fetch.
     */
    where: BillHistoryWhereUniqueInput
  }

  /**
   * BillHistory findUniqueOrThrow
   */
  export type BillHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BillHistory to fetch.
     */
    where: BillHistoryWhereUniqueInput
  }

  /**
   * BillHistory findFirst
   */
  export type BillHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BillHistory to fetch.
     */
    where?: BillHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillHistories to fetch.
     */
    orderBy?: BillHistoryOrderByWithRelationInput | BillHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillHistories.
     */
    cursor?: BillHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillHistories.
     */
    distinct?: BillHistoryScalarFieldEnum | BillHistoryScalarFieldEnum[]
  }

  /**
   * BillHistory findFirstOrThrow
   */
  export type BillHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BillHistory to fetch.
     */
    where?: BillHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillHistories to fetch.
     */
    orderBy?: BillHistoryOrderByWithRelationInput | BillHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillHistories.
     */
    cursor?: BillHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillHistories.
     */
    distinct?: BillHistoryScalarFieldEnum | BillHistoryScalarFieldEnum[]
  }

  /**
   * BillHistory findMany
   */
  export type BillHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * Filter, which BillHistories to fetch.
     */
    where?: BillHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillHistories to fetch.
     */
    orderBy?: BillHistoryOrderByWithRelationInput | BillHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BillHistories.
     */
    cursor?: BillHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillHistories.
     */
    skip?: number
    distinct?: BillHistoryScalarFieldEnum | BillHistoryScalarFieldEnum[]
  }

  /**
   * BillHistory create
   */
  export type BillHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a BillHistory.
     */
    data: XOR<BillHistoryCreateInput, BillHistoryUncheckedCreateInput>
  }

  /**
   * BillHistory createMany
   */
  export type BillHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BillHistories.
     */
    data: BillHistoryCreateManyInput | BillHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BillHistory createManyAndReturn
   */
  export type BillHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many BillHistories.
     */
    data: BillHistoryCreateManyInput | BillHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BillHistory update
   */
  export type BillHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a BillHistory.
     */
    data: XOR<BillHistoryUpdateInput, BillHistoryUncheckedUpdateInput>
    /**
     * Choose, which BillHistory to update.
     */
    where: BillHistoryWhereUniqueInput
  }

  /**
   * BillHistory updateMany
   */
  export type BillHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BillHistories.
     */
    data: XOR<BillHistoryUpdateManyMutationInput, BillHistoryUncheckedUpdateManyInput>
    /**
     * Filter which BillHistories to update
     */
    where?: BillHistoryWhereInput
    /**
     * Limit how many BillHistories to update.
     */
    limit?: number
  }

  /**
   * BillHistory updateManyAndReturn
   */
  export type BillHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * The data used to update BillHistories.
     */
    data: XOR<BillHistoryUpdateManyMutationInput, BillHistoryUncheckedUpdateManyInput>
    /**
     * Filter which BillHistories to update
     */
    where?: BillHistoryWhereInput
    /**
     * Limit how many BillHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BillHistory upsert
   */
  export type BillHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the BillHistory to update in case it exists.
     */
    where: BillHistoryWhereUniqueInput
    /**
     * In case the BillHistory found by the `where` argument doesn't exist, create a new BillHistory with this data.
     */
    create: XOR<BillHistoryCreateInput, BillHistoryUncheckedCreateInput>
    /**
     * In case the BillHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillHistoryUpdateInput, BillHistoryUncheckedUpdateInput>
  }

  /**
   * BillHistory delete
   */
  export type BillHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
    /**
     * Filter which BillHistory to delete.
     */
    where: BillHistoryWhereUniqueInput
  }

  /**
   * BillHistory deleteMany
   */
  export type BillHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillHistories to delete
     */
    where?: BillHistoryWhereInput
    /**
     * Limit how many BillHistories to delete.
     */
    limit?: number
  }

  /**
   * BillHistory without action
   */
  export type BillHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillHistory
     */
    select?: BillHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillHistory
     */
    omit?: BillHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillHistoryInclude<ExtArgs> | null
  }


  /**
   * Model UtilityProvider
   */

  export type AggregateUtilityProvider = {
    _count: UtilityProviderCountAggregateOutputType | null
    _min: UtilityProviderMinAggregateOutputType | null
    _max: UtilityProviderMaxAggregateOutputType | null
  }

  export type UtilityProviderMinAggregateOutputType = {
    id: string | null
    zipCode: string | null
    utilityName: string | null
    rateName: string | null
    sector: string | null
    fetchedAt: Date | null
  }

  export type UtilityProviderMaxAggregateOutputType = {
    id: string | null
    zipCode: string | null
    utilityName: string | null
    rateName: string | null
    sector: string | null
    fetchedAt: Date | null
  }

  export type UtilityProviderCountAggregateOutputType = {
    id: number
    zipCode: number
    utilityName: number
    rateName: number
    sector: number
    rateStructureJson: number
    weekdayScheduleJson: number
    weekendScheduleJson: number
    fuelAdjustmentsJson: number
    fetchedAt: number
    _all: number
  }


  export type UtilityProviderMinAggregateInputType = {
    id?: true
    zipCode?: true
    utilityName?: true
    rateName?: true
    sector?: true
    fetchedAt?: true
  }

  export type UtilityProviderMaxAggregateInputType = {
    id?: true
    zipCode?: true
    utilityName?: true
    rateName?: true
    sector?: true
    fetchedAt?: true
  }

  export type UtilityProviderCountAggregateInputType = {
    id?: true
    zipCode?: true
    utilityName?: true
    rateName?: true
    sector?: true
    rateStructureJson?: true
    weekdayScheduleJson?: true
    weekendScheduleJson?: true
    fuelAdjustmentsJson?: true
    fetchedAt?: true
    _all?: true
  }

  export type UtilityProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UtilityProvider to aggregate.
     */
    where?: UtilityProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UtilityProviders to fetch.
     */
    orderBy?: UtilityProviderOrderByWithRelationInput | UtilityProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UtilityProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UtilityProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UtilityProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UtilityProviders
    **/
    _count?: true | UtilityProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UtilityProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UtilityProviderMaxAggregateInputType
  }

  export type GetUtilityProviderAggregateType<T extends UtilityProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateUtilityProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUtilityProvider[P]>
      : GetScalarType<T[P], AggregateUtilityProvider[P]>
  }




  export type UtilityProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UtilityProviderWhereInput
    orderBy?: UtilityProviderOrderByWithAggregationInput | UtilityProviderOrderByWithAggregationInput[]
    by: UtilityProviderScalarFieldEnum[] | UtilityProviderScalarFieldEnum
    having?: UtilityProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UtilityProviderCountAggregateInputType | true
    _min?: UtilityProviderMinAggregateInputType
    _max?: UtilityProviderMaxAggregateInputType
  }

  export type UtilityProviderGroupByOutputType = {
    id: string
    zipCode: string
    utilityName: string
    rateName: string
    sector: string
    rateStructureJson: JsonValue | null
    weekdayScheduleJson: JsonValue | null
    weekendScheduleJson: JsonValue | null
    fuelAdjustmentsJson: JsonValue | null
    fetchedAt: Date
    _count: UtilityProviderCountAggregateOutputType | null
    _min: UtilityProviderMinAggregateOutputType | null
    _max: UtilityProviderMaxAggregateOutputType | null
  }

  type GetUtilityProviderGroupByPayload<T extends UtilityProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UtilityProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UtilityProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UtilityProviderGroupByOutputType[P]>
            : GetScalarType<T[P], UtilityProviderGroupByOutputType[P]>
        }
      >
    >


  export type UtilityProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    zipCode?: boolean
    utilityName?: boolean
    rateName?: boolean
    sector?: boolean
    rateStructureJson?: boolean
    weekdayScheduleJson?: boolean
    weekendScheduleJson?: boolean
    fuelAdjustmentsJson?: boolean
    fetchedAt?: boolean
    hourlyRates?: boolean | UtilityProvider$hourlyRatesArgs<ExtArgs>
    users?: boolean | UtilityProvider$usersArgs<ExtArgs>
    _count?: boolean | UtilityProviderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["utilityProvider"]>

  export type UtilityProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    zipCode?: boolean
    utilityName?: boolean
    rateName?: boolean
    sector?: boolean
    rateStructureJson?: boolean
    weekdayScheduleJson?: boolean
    weekendScheduleJson?: boolean
    fuelAdjustmentsJson?: boolean
    fetchedAt?: boolean
  }, ExtArgs["result"]["utilityProvider"]>

  export type UtilityProviderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    zipCode?: boolean
    utilityName?: boolean
    rateName?: boolean
    sector?: boolean
    rateStructureJson?: boolean
    weekdayScheduleJson?: boolean
    weekendScheduleJson?: boolean
    fuelAdjustmentsJson?: boolean
    fetchedAt?: boolean
  }, ExtArgs["result"]["utilityProvider"]>

  export type UtilityProviderSelectScalar = {
    id?: boolean
    zipCode?: boolean
    utilityName?: boolean
    rateName?: boolean
    sector?: boolean
    rateStructureJson?: boolean
    weekdayScheduleJson?: boolean
    weekendScheduleJson?: boolean
    fuelAdjustmentsJson?: boolean
    fetchedAt?: boolean
  }

  export type UtilityProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "zipCode" | "utilityName" | "rateName" | "sector" | "rateStructureJson" | "weekdayScheduleJson" | "weekendScheduleJson" | "fuelAdjustmentsJson" | "fetchedAt", ExtArgs["result"]["utilityProvider"]>
  export type UtilityProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hourlyRates?: boolean | UtilityProvider$hourlyRatesArgs<ExtArgs>
    users?: boolean | UtilityProvider$usersArgs<ExtArgs>
    _count?: boolean | UtilityProviderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UtilityProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UtilityProviderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UtilityProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UtilityProvider"
    objects: {
      hourlyRates: Prisma.$HourlyRatePayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      zipCode: string
      utilityName: string
      rateName: string
      sector: string
      rateStructureJson: Prisma.JsonValue | null
      weekdayScheduleJson: Prisma.JsonValue | null
      weekendScheduleJson: Prisma.JsonValue | null
      fuelAdjustmentsJson: Prisma.JsonValue | null
      fetchedAt: Date
    }, ExtArgs["result"]["utilityProvider"]>
    composites: {}
  }

  type UtilityProviderGetPayload<S extends boolean | null | undefined | UtilityProviderDefaultArgs> = $Result.GetResult<Prisma.$UtilityProviderPayload, S>

  type UtilityProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UtilityProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UtilityProviderCountAggregateInputType | true
    }

  export interface UtilityProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UtilityProvider'], meta: { name: 'UtilityProvider' } }
    /**
     * Find zero or one UtilityProvider that matches the filter.
     * @param {UtilityProviderFindUniqueArgs} args - Arguments to find a UtilityProvider
     * @example
     * // Get one UtilityProvider
     * const utilityProvider = await prisma.utilityProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UtilityProviderFindUniqueArgs>(args: SelectSubset<T, UtilityProviderFindUniqueArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UtilityProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UtilityProviderFindUniqueOrThrowArgs} args - Arguments to find a UtilityProvider
     * @example
     * // Get one UtilityProvider
     * const utilityProvider = await prisma.utilityProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UtilityProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, UtilityProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UtilityProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilityProviderFindFirstArgs} args - Arguments to find a UtilityProvider
     * @example
     * // Get one UtilityProvider
     * const utilityProvider = await prisma.utilityProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UtilityProviderFindFirstArgs>(args?: SelectSubset<T, UtilityProviderFindFirstArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UtilityProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilityProviderFindFirstOrThrowArgs} args - Arguments to find a UtilityProvider
     * @example
     * // Get one UtilityProvider
     * const utilityProvider = await prisma.utilityProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UtilityProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, UtilityProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UtilityProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilityProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UtilityProviders
     * const utilityProviders = await prisma.utilityProvider.findMany()
     * 
     * // Get first 10 UtilityProviders
     * const utilityProviders = await prisma.utilityProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const utilityProviderWithIdOnly = await prisma.utilityProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UtilityProviderFindManyArgs>(args?: SelectSubset<T, UtilityProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UtilityProvider.
     * @param {UtilityProviderCreateArgs} args - Arguments to create a UtilityProvider.
     * @example
     * // Create one UtilityProvider
     * const UtilityProvider = await prisma.utilityProvider.create({
     *   data: {
     *     // ... data to create a UtilityProvider
     *   }
     * })
     * 
     */
    create<T extends UtilityProviderCreateArgs>(args: SelectSubset<T, UtilityProviderCreateArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UtilityProviders.
     * @param {UtilityProviderCreateManyArgs} args - Arguments to create many UtilityProviders.
     * @example
     * // Create many UtilityProviders
     * const utilityProvider = await prisma.utilityProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UtilityProviderCreateManyArgs>(args?: SelectSubset<T, UtilityProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UtilityProviders and returns the data saved in the database.
     * @param {UtilityProviderCreateManyAndReturnArgs} args - Arguments to create many UtilityProviders.
     * @example
     * // Create many UtilityProviders
     * const utilityProvider = await prisma.utilityProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UtilityProviders and only return the `id`
     * const utilityProviderWithIdOnly = await prisma.utilityProvider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UtilityProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, UtilityProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UtilityProvider.
     * @param {UtilityProviderDeleteArgs} args - Arguments to delete one UtilityProvider.
     * @example
     * // Delete one UtilityProvider
     * const UtilityProvider = await prisma.utilityProvider.delete({
     *   where: {
     *     // ... filter to delete one UtilityProvider
     *   }
     * })
     * 
     */
    delete<T extends UtilityProviderDeleteArgs>(args: SelectSubset<T, UtilityProviderDeleteArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UtilityProvider.
     * @param {UtilityProviderUpdateArgs} args - Arguments to update one UtilityProvider.
     * @example
     * // Update one UtilityProvider
     * const utilityProvider = await prisma.utilityProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UtilityProviderUpdateArgs>(args: SelectSubset<T, UtilityProviderUpdateArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UtilityProviders.
     * @param {UtilityProviderDeleteManyArgs} args - Arguments to filter UtilityProviders to delete.
     * @example
     * // Delete a few UtilityProviders
     * const { count } = await prisma.utilityProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UtilityProviderDeleteManyArgs>(args?: SelectSubset<T, UtilityProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UtilityProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilityProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UtilityProviders
     * const utilityProvider = await prisma.utilityProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UtilityProviderUpdateManyArgs>(args: SelectSubset<T, UtilityProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UtilityProviders and returns the data updated in the database.
     * @param {UtilityProviderUpdateManyAndReturnArgs} args - Arguments to update many UtilityProviders.
     * @example
     * // Update many UtilityProviders
     * const utilityProvider = await prisma.utilityProvider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UtilityProviders and only return the `id`
     * const utilityProviderWithIdOnly = await prisma.utilityProvider.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UtilityProviderUpdateManyAndReturnArgs>(args: SelectSubset<T, UtilityProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UtilityProvider.
     * @param {UtilityProviderUpsertArgs} args - Arguments to update or create a UtilityProvider.
     * @example
     * // Update or create a UtilityProvider
     * const utilityProvider = await prisma.utilityProvider.upsert({
     *   create: {
     *     // ... data to create a UtilityProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UtilityProvider we want to update
     *   }
     * })
     */
    upsert<T extends UtilityProviderUpsertArgs>(args: SelectSubset<T, UtilityProviderUpsertArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UtilityProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilityProviderCountArgs} args - Arguments to filter UtilityProviders to count.
     * @example
     * // Count the number of UtilityProviders
     * const count = await prisma.utilityProvider.count({
     *   where: {
     *     // ... the filter for the UtilityProviders we want to count
     *   }
     * })
    **/
    count<T extends UtilityProviderCountArgs>(
      args?: Subset<T, UtilityProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UtilityProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UtilityProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilityProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UtilityProviderAggregateArgs>(args: Subset<T, UtilityProviderAggregateArgs>): Prisma.PrismaPromise<GetUtilityProviderAggregateType<T>>

    /**
     * Group by UtilityProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilityProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UtilityProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UtilityProviderGroupByArgs['orderBy'] }
        : { orderBy?: UtilityProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UtilityProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUtilityProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UtilityProvider model
   */
  readonly fields: UtilityProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UtilityProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UtilityProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hourlyRates<T extends UtilityProvider$hourlyRatesArgs<ExtArgs> = {}>(args?: Subset<T, UtilityProvider$hourlyRatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends UtilityProvider$usersArgs<ExtArgs> = {}>(args?: Subset<T, UtilityProvider$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UtilityProvider model
   */
  interface UtilityProviderFieldRefs {
    readonly id: FieldRef<"UtilityProvider", 'String'>
    readonly zipCode: FieldRef<"UtilityProvider", 'String'>
    readonly utilityName: FieldRef<"UtilityProvider", 'String'>
    readonly rateName: FieldRef<"UtilityProvider", 'String'>
    readonly sector: FieldRef<"UtilityProvider", 'String'>
    readonly rateStructureJson: FieldRef<"UtilityProvider", 'Json'>
    readonly weekdayScheduleJson: FieldRef<"UtilityProvider", 'Json'>
    readonly weekendScheduleJson: FieldRef<"UtilityProvider", 'Json'>
    readonly fuelAdjustmentsJson: FieldRef<"UtilityProvider", 'Json'>
    readonly fetchedAt: FieldRef<"UtilityProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UtilityProvider findUnique
   */
  export type UtilityProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * Filter, which UtilityProvider to fetch.
     */
    where: UtilityProviderWhereUniqueInput
  }

  /**
   * UtilityProvider findUniqueOrThrow
   */
  export type UtilityProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * Filter, which UtilityProvider to fetch.
     */
    where: UtilityProviderWhereUniqueInput
  }

  /**
   * UtilityProvider findFirst
   */
  export type UtilityProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * Filter, which UtilityProvider to fetch.
     */
    where?: UtilityProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UtilityProviders to fetch.
     */
    orderBy?: UtilityProviderOrderByWithRelationInput | UtilityProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UtilityProviders.
     */
    cursor?: UtilityProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UtilityProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UtilityProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UtilityProviders.
     */
    distinct?: UtilityProviderScalarFieldEnum | UtilityProviderScalarFieldEnum[]
  }

  /**
   * UtilityProvider findFirstOrThrow
   */
  export type UtilityProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * Filter, which UtilityProvider to fetch.
     */
    where?: UtilityProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UtilityProviders to fetch.
     */
    orderBy?: UtilityProviderOrderByWithRelationInput | UtilityProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UtilityProviders.
     */
    cursor?: UtilityProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UtilityProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UtilityProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UtilityProviders.
     */
    distinct?: UtilityProviderScalarFieldEnum | UtilityProviderScalarFieldEnum[]
  }

  /**
   * UtilityProvider findMany
   */
  export type UtilityProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * Filter, which UtilityProviders to fetch.
     */
    where?: UtilityProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UtilityProviders to fetch.
     */
    orderBy?: UtilityProviderOrderByWithRelationInput | UtilityProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UtilityProviders.
     */
    cursor?: UtilityProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UtilityProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UtilityProviders.
     */
    skip?: number
    distinct?: UtilityProviderScalarFieldEnum | UtilityProviderScalarFieldEnum[]
  }

  /**
   * UtilityProvider create
   */
  export type UtilityProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a UtilityProvider.
     */
    data: XOR<UtilityProviderCreateInput, UtilityProviderUncheckedCreateInput>
  }

  /**
   * UtilityProvider createMany
   */
  export type UtilityProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UtilityProviders.
     */
    data: UtilityProviderCreateManyInput | UtilityProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UtilityProvider createManyAndReturn
   */
  export type UtilityProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * The data used to create many UtilityProviders.
     */
    data: UtilityProviderCreateManyInput | UtilityProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UtilityProvider update
   */
  export type UtilityProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a UtilityProvider.
     */
    data: XOR<UtilityProviderUpdateInput, UtilityProviderUncheckedUpdateInput>
    /**
     * Choose, which UtilityProvider to update.
     */
    where: UtilityProviderWhereUniqueInput
  }

  /**
   * UtilityProvider updateMany
   */
  export type UtilityProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UtilityProviders.
     */
    data: XOR<UtilityProviderUpdateManyMutationInput, UtilityProviderUncheckedUpdateManyInput>
    /**
     * Filter which UtilityProviders to update
     */
    where?: UtilityProviderWhereInput
    /**
     * Limit how many UtilityProviders to update.
     */
    limit?: number
  }

  /**
   * UtilityProvider updateManyAndReturn
   */
  export type UtilityProviderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * The data used to update UtilityProviders.
     */
    data: XOR<UtilityProviderUpdateManyMutationInput, UtilityProviderUncheckedUpdateManyInput>
    /**
     * Filter which UtilityProviders to update
     */
    where?: UtilityProviderWhereInput
    /**
     * Limit how many UtilityProviders to update.
     */
    limit?: number
  }

  /**
   * UtilityProvider upsert
   */
  export type UtilityProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the UtilityProvider to update in case it exists.
     */
    where: UtilityProviderWhereUniqueInput
    /**
     * In case the UtilityProvider found by the `where` argument doesn't exist, create a new UtilityProvider with this data.
     */
    create: XOR<UtilityProviderCreateInput, UtilityProviderUncheckedCreateInput>
    /**
     * In case the UtilityProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UtilityProviderUpdateInput, UtilityProviderUncheckedUpdateInput>
  }

  /**
   * UtilityProvider delete
   */
  export type UtilityProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
    /**
     * Filter which UtilityProvider to delete.
     */
    where: UtilityProviderWhereUniqueInput
  }

  /**
   * UtilityProvider deleteMany
   */
  export type UtilityProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UtilityProviders to delete
     */
    where?: UtilityProviderWhereInput
    /**
     * Limit how many UtilityProviders to delete.
     */
    limit?: number
  }

  /**
   * UtilityProvider.hourlyRates
   */
  export type UtilityProvider$hourlyRatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    where?: HourlyRateWhereInput
    orderBy?: HourlyRateOrderByWithRelationInput | HourlyRateOrderByWithRelationInput[]
    cursor?: HourlyRateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HourlyRateScalarFieldEnum | HourlyRateScalarFieldEnum[]
  }

  /**
   * UtilityProvider.users
   */
  export type UtilityProvider$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * UtilityProvider without action
   */
  export type UtilityProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilityProvider
     */
    select?: UtilityProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UtilityProvider
     */
    omit?: UtilityProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilityProviderInclude<ExtArgs> | null
  }


  /**
   * Model HourlyRate
   */

  export type AggregateHourlyRate = {
    _count: HourlyRateCountAggregateOutputType | null
    _avg: HourlyRateAvgAggregateOutputType | null
    _sum: HourlyRateSumAggregateOutputType | null
    _min: HourlyRateMinAggregateOutputType | null
    _max: HourlyRateMaxAggregateOutputType | null
  }

  export type HourlyRateAvgAggregateOutputType = {
    hour: number | null
    baseRate: Decimal | null
    deliveryCost: Decimal | null
    totalRate: Decimal | null
    periodIndex: number | null
  }

  export type HourlyRateSumAggregateOutputType = {
    hour: number | null
    baseRate: Decimal | null
    deliveryCost: Decimal | null
    totalRate: Decimal | null
    periodIndex: number | null
  }

  export type HourlyRateMinAggregateOutputType = {
    id: string | null
    providerId: string | null
    date: Date | null
    hour: number | null
    baseRate: Decimal | null
    deliveryCost: Decimal | null
    totalRate: Decimal | null
    periodIndex: number | null
    periodLabel: string | null
  }

  export type HourlyRateMaxAggregateOutputType = {
    id: string | null
    providerId: string | null
    date: Date | null
    hour: number | null
    baseRate: Decimal | null
    deliveryCost: Decimal | null
    totalRate: Decimal | null
    periodIndex: number | null
    periodLabel: string | null
  }

  export type HourlyRateCountAggregateOutputType = {
    id: number
    providerId: number
    date: number
    hour: number
    baseRate: number
    deliveryCost: number
    totalRate: number
    periodIndex: number
    periodLabel: number
    _all: number
  }


  export type HourlyRateAvgAggregateInputType = {
    hour?: true
    baseRate?: true
    deliveryCost?: true
    totalRate?: true
    periodIndex?: true
  }

  export type HourlyRateSumAggregateInputType = {
    hour?: true
    baseRate?: true
    deliveryCost?: true
    totalRate?: true
    periodIndex?: true
  }

  export type HourlyRateMinAggregateInputType = {
    id?: true
    providerId?: true
    date?: true
    hour?: true
    baseRate?: true
    deliveryCost?: true
    totalRate?: true
    periodIndex?: true
    periodLabel?: true
  }

  export type HourlyRateMaxAggregateInputType = {
    id?: true
    providerId?: true
    date?: true
    hour?: true
    baseRate?: true
    deliveryCost?: true
    totalRate?: true
    periodIndex?: true
    periodLabel?: true
  }

  export type HourlyRateCountAggregateInputType = {
    id?: true
    providerId?: true
    date?: true
    hour?: true
    baseRate?: true
    deliveryCost?: true
    totalRate?: true
    periodIndex?: true
    periodLabel?: true
    _all?: true
  }

  export type HourlyRateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HourlyRate to aggregate.
     */
    where?: HourlyRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HourlyRates to fetch.
     */
    orderBy?: HourlyRateOrderByWithRelationInput | HourlyRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HourlyRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HourlyRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HourlyRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HourlyRates
    **/
    _count?: true | HourlyRateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HourlyRateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HourlyRateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HourlyRateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HourlyRateMaxAggregateInputType
  }

  export type GetHourlyRateAggregateType<T extends HourlyRateAggregateArgs> = {
        [P in keyof T & keyof AggregateHourlyRate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHourlyRate[P]>
      : GetScalarType<T[P], AggregateHourlyRate[P]>
  }




  export type HourlyRateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HourlyRateWhereInput
    orderBy?: HourlyRateOrderByWithAggregationInput | HourlyRateOrderByWithAggregationInput[]
    by: HourlyRateScalarFieldEnum[] | HourlyRateScalarFieldEnum
    having?: HourlyRateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HourlyRateCountAggregateInputType | true
    _avg?: HourlyRateAvgAggregateInputType
    _sum?: HourlyRateSumAggregateInputType
    _min?: HourlyRateMinAggregateInputType
    _max?: HourlyRateMaxAggregateInputType
  }

  export type HourlyRateGroupByOutputType = {
    id: string
    providerId: string
    date: Date
    hour: number
    baseRate: Decimal
    deliveryCost: Decimal
    totalRate: Decimal
    periodIndex: number
    periodLabel: string
    _count: HourlyRateCountAggregateOutputType | null
    _avg: HourlyRateAvgAggregateOutputType | null
    _sum: HourlyRateSumAggregateOutputType | null
    _min: HourlyRateMinAggregateOutputType | null
    _max: HourlyRateMaxAggregateOutputType | null
  }

  type GetHourlyRateGroupByPayload<T extends HourlyRateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HourlyRateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HourlyRateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HourlyRateGroupByOutputType[P]>
            : GetScalarType<T[P], HourlyRateGroupByOutputType[P]>
        }
      >
    >


  export type HourlyRateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    providerId?: boolean
    date?: boolean
    hour?: boolean
    baseRate?: boolean
    deliveryCost?: boolean
    totalRate?: boolean
    periodIndex?: boolean
    periodLabel?: boolean
    provider?: boolean | UtilityProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hourlyRate"]>

  export type HourlyRateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    providerId?: boolean
    date?: boolean
    hour?: boolean
    baseRate?: boolean
    deliveryCost?: boolean
    totalRate?: boolean
    periodIndex?: boolean
    periodLabel?: boolean
    provider?: boolean | UtilityProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hourlyRate"]>

  export type HourlyRateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    providerId?: boolean
    date?: boolean
    hour?: boolean
    baseRate?: boolean
    deliveryCost?: boolean
    totalRate?: boolean
    periodIndex?: boolean
    periodLabel?: boolean
    provider?: boolean | UtilityProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hourlyRate"]>

  export type HourlyRateSelectScalar = {
    id?: boolean
    providerId?: boolean
    date?: boolean
    hour?: boolean
    baseRate?: boolean
    deliveryCost?: boolean
    totalRate?: boolean
    periodIndex?: boolean
    periodLabel?: boolean
  }

  export type HourlyRateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "providerId" | "date" | "hour" | "baseRate" | "deliveryCost" | "totalRate" | "periodIndex" | "periodLabel", ExtArgs["result"]["hourlyRate"]>
  export type HourlyRateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | UtilityProviderDefaultArgs<ExtArgs>
  }
  export type HourlyRateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | UtilityProviderDefaultArgs<ExtArgs>
  }
  export type HourlyRateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | UtilityProviderDefaultArgs<ExtArgs>
  }

  export type $HourlyRatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HourlyRate"
    objects: {
      provider: Prisma.$UtilityProviderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      providerId: string
      date: Date
      hour: number
      baseRate: Prisma.Decimal
      deliveryCost: Prisma.Decimal
      totalRate: Prisma.Decimal
      periodIndex: number
      periodLabel: string
    }, ExtArgs["result"]["hourlyRate"]>
    composites: {}
  }

  type HourlyRateGetPayload<S extends boolean | null | undefined | HourlyRateDefaultArgs> = $Result.GetResult<Prisma.$HourlyRatePayload, S>

  type HourlyRateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HourlyRateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HourlyRateCountAggregateInputType | true
    }

  export interface HourlyRateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HourlyRate'], meta: { name: 'HourlyRate' } }
    /**
     * Find zero or one HourlyRate that matches the filter.
     * @param {HourlyRateFindUniqueArgs} args - Arguments to find a HourlyRate
     * @example
     * // Get one HourlyRate
     * const hourlyRate = await prisma.hourlyRate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HourlyRateFindUniqueArgs>(args: SelectSubset<T, HourlyRateFindUniqueArgs<ExtArgs>>): Prisma__HourlyRateClient<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HourlyRate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HourlyRateFindUniqueOrThrowArgs} args - Arguments to find a HourlyRate
     * @example
     * // Get one HourlyRate
     * const hourlyRate = await prisma.hourlyRate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HourlyRateFindUniqueOrThrowArgs>(args: SelectSubset<T, HourlyRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HourlyRateClient<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HourlyRate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HourlyRateFindFirstArgs} args - Arguments to find a HourlyRate
     * @example
     * // Get one HourlyRate
     * const hourlyRate = await prisma.hourlyRate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HourlyRateFindFirstArgs>(args?: SelectSubset<T, HourlyRateFindFirstArgs<ExtArgs>>): Prisma__HourlyRateClient<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HourlyRate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HourlyRateFindFirstOrThrowArgs} args - Arguments to find a HourlyRate
     * @example
     * // Get one HourlyRate
     * const hourlyRate = await prisma.hourlyRate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HourlyRateFindFirstOrThrowArgs>(args?: SelectSubset<T, HourlyRateFindFirstOrThrowArgs<ExtArgs>>): Prisma__HourlyRateClient<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HourlyRates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HourlyRateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HourlyRates
     * const hourlyRates = await prisma.hourlyRate.findMany()
     * 
     * // Get first 10 HourlyRates
     * const hourlyRates = await prisma.hourlyRate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hourlyRateWithIdOnly = await prisma.hourlyRate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HourlyRateFindManyArgs>(args?: SelectSubset<T, HourlyRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HourlyRate.
     * @param {HourlyRateCreateArgs} args - Arguments to create a HourlyRate.
     * @example
     * // Create one HourlyRate
     * const HourlyRate = await prisma.hourlyRate.create({
     *   data: {
     *     // ... data to create a HourlyRate
     *   }
     * })
     * 
     */
    create<T extends HourlyRateCreateArgs>(args: SelectSubset<T, HourlyRateCreateArgs<ExtArgs>>): Prisma__HourlyRateClient<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HourlyRates.
     * @param {HourlyRateCreateManyArgs} args - Arguments to create many HourlyRates.
     * @example
     * // Create many HourlyRates
     * const hourlyRate = await prisma.hourlyRate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HourlyRateCreateManyArgs>(args?: SelectSubset<T, HourlyRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HourlyRates and returns the data saved in the database.
     * @param {HourlyRateCreateManyAndReturnArgs} args - Arguments to create many HourlyRates.
     * @example
     * // Create many HourlyRates
     * const hourlyRate = await prisma.hourlyRate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HourlyRates and only return the `id`
     * const hourlyRateWithIdOnly = await prisma.hourlyRate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HourlyRateCreateManyAndReturnArgs>(args?: SelectSubset<T, HourlyRateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HourlyRate.
     * @param {HourlyRateDeleteArgs} args - Arguments to delete one HourlyRate.
     * @example
     * // Delete one HourlyRate
     * const HourlyRate = await prisma.hourlyRate.delete({
     *   where: {
     *     // ... filter to delete one HourlyRate
     *   }
     * })
     * 
     */
    delete<T extends HourlyRateDeleteArgs>(args: SelectSubset<T, HourlyRateDeleteArgs<ExtArgs>>): Prisma__HourlyRateClient<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HourlyRate.
     * @param {HourlyRateUpdateArgs} args - Arguments to update one HourlyRate.
     * @example
     * // Update one HourlyRate
     * const hourlyRate = await prisma.hourlyRate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HourlyRateUpdateArgs>(args: SelectSubset<T, HourlyRateUpdateArgs<ExtArgs>>): Prisma__HourlyRateClient<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HourlyRates.
     * @param {HourlyRateDeleteManyArgs} args - Arguments to filter HourlyRates to delete.
     * @example
     * // Delete a few HourlyRates
     * const { count } = await prisma.hourlyRate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HourlyRateDeleteManyArgs>(args?: SelectSubset<T, HourlyRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HourlyRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HourlyRateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HourlyRates
     * const hourlyRate = await prisma.hourlyRate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HourlyRateUpdateManyArgs>(args: SelectSubset<T, HourlyRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HourlyRates and returns the data updated in the database.
     * @param {HourlyRateUpdateManyAndReturnArgs} args - Arguments to update many HourlyRates.
     * @example
     * // Update many HourlyRates
     * const hourlyRate = await prisma.hourlyRate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HourlyRates and only return the `id`
     * const hourlyRateWithIdOnly = await prisma.hourlyRate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HourlyRateUpdateManyAndReturnArgs>(args: SelectSubset<T, HourlyRateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HourlyRate.
     * @param {HourlyRateUpsertArgs} args - Arguments to update or create a HourlyRate.
     * @example
     * // Update or create a HourlyRate
     * const hourlyRate = await prisma.hourlyRate.upsert({
     *   create: {
     *     // ... data to create a HourlyRate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HourlyRate we want to update
     *   }
     * })
     */
    upsert<T extends HourlyRateUpsertArgs>(args: SelectSubset<T, HourlyRateUpsertArgs<ExtArgs>>): Prisma__HourlyRateClient<$Result.GetResult<Prisma.$HourlyRatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HourlyRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HourlyRateCountArgs} args - Arguments to filter HourlyRates to count.
     * @example
     * // Count the number of HourlyRates
     * const count = await prisma.hourlyRate.count({
     *   where: {
     *     // ... the filter for the HourlyRates we want to count
     *   }
     * })
    **/
    count<T extends HourlyRateCountArgs>(
      args?: Subset<T, HourlyRateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HourlyRateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HourlyRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HourlyRateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HourlyRateAggregateArgs>(args: Subset<T, HourlyRateAggregateArgs>): Prisma.PrismaPromise<GetHourlyRateAggregateType<T>>

    /**
     * Group by HourlyRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HourlyRateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HourlyRateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HourlyRateGroupByArgs['orderBy'] }
        : { orderBy?: HourlyRateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HourlyRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHourlyRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HourlyRate model
   */
  readonly fields: HourlyRateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HourlyRate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HourlyRateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provider<T extends UtilityProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UtilityProviderDefaultArgs<ExtArgs>>): Prisma__UtilityProviderClient<$Result.GetResult<Prisma.$UtilityProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HourlyRate model
   */
  interface HourlyRateFieldRefs {
    readonly id: FieldRef<"HourlyRate", 'String'>
    readonly providerId: FieldRef<"HourlyRate", 'String'>
    readonly date: FieldRef<"HourlyRate", 'DateTime'>
    readonly hour: FieldRef<"HourlyRate", 'Int'>
    readonly baseRate: FieldRef<"HourlyRate", 'Decimal'>
    readonly deliveryCost: FieldRef<"HourlyRate", 'Decimal'>
    readonly totalRate: FieldRef<"HourlyRate", 'Decimal'>
    readonly periodIndex: FieldRef<"HourlyRate", 'Int'>
    readonly periodLabel: FieldRef<"HourlyRate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * HourlyRate findUnique
   */
  export type HourlyRateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * Filter, which HourlyRate to fetch.
     */
    where: HourlyRateWhereUniqueInput
  }

  /**
   * HourlyRate findUniqueOrThrow
   */
  export type HourlyRateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * Filter, which HourlyRate to fetch.
     */
    where: HourlyRateWhereUniqueInput
  }

  /**
   * HourlyRate findFirst
   */
  export type HourlyRateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * Filter, which HourlyRate to fetch.
     */
    where?: HourlyRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HourlyRates to fetch.
     */
    orderBy?: HourlyRateOrderByWithRelationInput | HourlyRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HourlyRates.
     */
    cursor?: HourlyRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HourlyRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HourlyRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HourlyRates.
     */
    distinct?: HourlyRateScalarFieldEnum | HourlyRateScalarFieldEnum[]
  }

  /**
   * HourlyRate findFirstOrThrow
   */
  export type HourlyRateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * Filter, which HourlyRate to fetch.
     */
    where?: HourlyRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HourlyRates to fetch.
     */
    orderBy?: HourlyRateOrderByWithRelationInput | HourlyRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HourlyRates.
     */
    cursor?: HourlyRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HourlyRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HourlyRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HourlyRates.
     */
    distinct?: HourlyRateScalarFieldEnum | HourlyRateScalarFieldEnum[]
  }

  /**
   * HourlyRate findMany
   */
  export type HourlyRateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * Filter, which HourlyRates to fetch.
     */
    where?: HourlyRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HourlyRates to fetch.
     */
    orderBy?: HourlyRateOrderByWithRelationInput | HourlyRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HourlyRates.
     */
    cursor?: HourlyRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HourlyRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HourlyRates.
     */
    skip?: number
    distinct?: HourlyRateScalarFieldEnum | HourlyRateScalarFieldEnum[]
  }

  /**
   * HourlyRate create
   */
  export type HourlyRateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * The data needed to create a HourlyRate.
     */
    data: XOR<HourlyRateCreateInput, HourlyRateUncheckedCreateInput>
  }

  /**
   * HourlyRate createMany
   */
  export type HourlyRateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HourlyRates.
     */
    data: HourlyRateCreateManyInput | HourlyRateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HourlyRate createManyAndReturn
   */
  export type HourlyRateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * The data used to create many HourlyRates.
     */
    data: HourlyRateCreateManyInput | HourlyRateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HourlyRate update
   */
  export type HourlyRateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * The data needed to update a HourlyRate.
     */
    data: XOR<HourlyRateUpdateInput, HourlyRateUncheckedUpdateInput>
    /**
     * Choose, which HourlyRate to update.
     */
    where: HourlyRateWhereUniqueInput
  }

  /**
   * HourlyRate updateMany
   */
  export type HourlyRateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HourlyRates.
     */
    data: XOR<HourlyRateUpdateManyMutationInput, HourlyRateUncheckedUpdateManyInput>
    /**
     * Filter which HourlyRates to update
     */
    where?: HourlyRateWhereInput
    /**
     * Limit how many HourlyRates to update.
     */
    limit?: number
  }

  /**
   * HourlyRate updateManyAndReturn
   */
  export type HourlyRateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * The data used to update HourlyRates.
     */
    data: XOR<HourlyRateUpdateManyMutationInput, HourlyRateUncheckedUpdateManyInput>
    /**
     * Filter which HourlyRates to update
     */
    where?: HourlyRateWhereInput
    /**
     * Limit how many HourlyRates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HourlyRate upsert
   */
  export type HourlyRateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * The filter to search for the HourlyRate to update in case it exists.
     */
    where: HourlyRateWhereUniqueInput
    /**
     * In case the HourlyRate found by the `where` argument doesn't exist, create a new HourlyRate with this data.
     */
    create: XOR<HourlyRateCreateInput, HourlyRateUncheckedCreateInput>
    /**
     * In case the HourlyRate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HourlyRateUpdateInput, HourlyRateUncheckedUpdateInput>
  }

  /**
   * HourlyRate delete
   */
  export type HourlyRateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
    /**
     * Filter which HourlyRate to delete.
     */
    where: HourlyRateWhereUniqueInput
  }

  /**
   * HourlyRate deleteMany
   */
  export type HourlyRateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HourlyRates to delete
     */
    where?: HourlyRateWhereInput
    /**
     * Limit how many HourlyRates to delete.
     */
    limit?: number
  }

  /**
   * HourlyRate without action
   */
  export type HourlyRateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HourlyRate
     */
    select?: HourlyRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HourlyRate
     */
    omit?: HourlyRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HourlyRateInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    utilityProv: 'utilityProv',
    selectedProviderId: 'selectedProviderId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    zip: 'zip'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const DeviceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    type: 'type',
    brand: 'brand',
    model: 'model',
    hourlyEnergy: 'hourlyEnergy',
    isSmart: 'isSmart',
    runDurationMinutes: 'runDurationMinutes'
  };

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const BillHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    billTotal: 'billTotal',
    createdDate: 'createdDate'
  };

  export type BillHistoryScalarFieldEnum = (typeof BillHistoryScalarFieldEnum)[keyof typeof BillHistoryScalarFieldEnum]


  export const UtilityProviderScalarFieldEnum: {
    id: 'id',
    zipCode: 'zipCode',
    utilityName: 'utilityName',
    rateName: 'rateName',
    sector: 'sector',
    rateStructureJson: 'rateStructureJson',
    weekdayScheduleJson: 'weekdayScheduleJson',
    weekendScheduleJson: 'weekendScheduleJson',
    fuelAdjustmentsJson: 'fuelAdjustmentsJson',
    fetchedAt: 'fetchedAt'
  };

  export type UtilityProviderScalarFieldEnum = (typeof UtilityProviderScalarFieldEnum)[keyof typeof UtilityProviderScalarFieldEnum]


  export const HourlyRateScalarFieldEnum: {
    id: 'id',
    providerId: 'providerId',
    date: 'date',
    hour: 'hour',
    baseRate: 'baseRate',
    deliveryCost: 'deliveryCost',
    totalRate: 'totalRate',
    periodIndex: 'periodIndex',
    periodLabel: 'periodLabel'
  };

  export type HourlyRateScalarFieldEnum = (typeof HourlyRateScalarFieldEnum)[keyof typeof HourlyRateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    utilityProv?: StringNullableFilter<"User"> | string | null
    selectedProviderId?: StringNullableFilter<"User"> | string | null
    selectedProvider?: XOR<UtilityProviderNullableScalarRelationFilter, UtilityProviderWhereInput> | null
    locations?: LocationListRelationFilter
    billHistory?: BillHistoryListRelationFilter
    devices?: DeviceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    utilityProv?: SortOrderInput | SortOrder
    selectedProviderId?: SortOrderInput | SortOrder
    selectedProvider?: UtilityProviderOrderByWithRelationInput
    locations?: LocationOrderByRelationAggregateInput
    billHistory?: BillHistoryOrderByRelationAggregateInput
    devices?: DeviceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    utilityProv?: StringNullableFilter<"User"> | string | null
    selectedProviderId?: StringNullableFilter<"User"> | string | null
    selectedProvider?: XOR<UtilityProviderNullableScalarRelationFilter, UtilityProviderWhereInput> | null
    locations?: LocationListRelationFilter
    billHistory?: BillHistoryListRelationFilter
    devices?: DeviceListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    utilityProv?: SortOrderInput | SortOrder
    selectedProviderId?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    utilityProv?: StringNullableWithAggregatesFilter<"User"> | string | null
    selectedProviderId?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    userId?: StringFilter<"Location"> | string
    zip?: StringFilter<"Location"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    zip?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    userId?: StringFilter<"Location"> | string
    zip?: StringFilter<"Location"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    zip?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    userId?: StringWithAggregatesFilter<"Location"> | string
    zip?: StringWithAggregatesFilter<"Location"> | string
  }

  export type DeviceWhereInput = {
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    id?: StringFilter<"Device"> | string
    userId?: StringFilter<"Device"> | string
    name?: StringFilter<"Device"> | string
    type?: StringFilter<"Device"> | string
    brand?: StringNullableFilter<"Device"> | string | null
    model?: StringNullableFilter<"Device"> | string | null
    hourlyEnergy?: FloatNullableFilter<"Device"> | number | null
    isSmart?: BoolFilter<"Device"> | boolean
    runDurationMinutes?: IntNullableFilter<"Device"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DeviceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    hourlyEnergy?: SortOrderInput | SortOrder
    isSmart?: SortOrder
    runDurationMinutes?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type DeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    userId?: StringFilter<"Device"> | string
    name?: StringFilter<"Device"> | string
    type?: StringFilter<"Device"> | string
    brand?: StringNullableFilter<"Device"> | string | null
    model?: StringNullableFilter<"Device"> | string | null
    hourlyEnergy?: FloatNullableFilter<"Device"> | number | null
    isSmart?: BoolFilter<"Device"> | boolean
    runDurationMinutes?: IntNullableFilter<"Device"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DeviceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrderInput | SortOrder
    model?: SortOrderInput | SortOrder
    hourlyEnergy?: SortOrderInput | SortOrder
    isSmart?: SortOrder
    runDurationMinutes?: SortOrderInput | SortOrder
    _count?: DeviceCountOrderByAggregateInput
    _avg?: DeviceAvgOrderByAggregateInput
    _max?: DeviceMaxOrderByAggregateInput
    _min?: DeviceMinOrderByAggregateInput
    _sum?: DeviceSumOrderByAggregateInput
  }

  export type DeviceScalarWhereWithAggregatesInput = {
    AND?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    OR?: DeviceScalarWhereWithAggregatesInput[]
    NOT?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Device"> | string
    userId?: StringWithAggregatesFilter<"Device"> | string
    name?: StringWithAggregatesFilter<"Device"> | string
    type?: StringWithAggregatesFilter<"Device"> | string
    brand?: StringNullableWithAggregatesFilter<"Device"> | string | null
    model?: StringNullableWithAggregatesFilter<"Device"> | string | null
    hourlyEnergy?: FloatNullableWithAggregatesFilter<"Device"> | number | null
    isSmart?: BoolWithAggregatesFilter<"Device"> | boolean
    runDurationMinutes?: IntNullableWithAggregatesFilter<"Device"> | number | null
  }

  export type BillHistoryWhereInput = {
    AND?: BillHistoryWhereInput | BillHistoryWhereInput[]
    OR?: BillHistoryWhereInput[]
    NOT?: BillHistoryWhereInput | BillHistoryWhereInput[]
    id?: StringFilter<"BillHistory"> | string
    userId?: StringFilter<"BillHistory"> | string
    billTotal?: DecimalFilter<"BillHistory"> | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFilter<"BillHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BillHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    billTotal?: SortOrder
    createdDate?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BillHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BillHistoryWhereInput | BillHistoryWhereInput[]
    OR?: BillHistoryWhereInput[]
    NOT?: BillHistoryWhereInput | BillHistoryWhereInput[]
    userId?: StringFilter<"BillHistory"> | string
    billTotal?: DecimalFilter<"BillHistory"> | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFilter<"BillHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type BillHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    billTotal?: SortOrder
    createdDate?: SortOrder
    _count?: BillHistoryCountOrderByAggregateInput
    _avg?: BillHistoryAvgOrderByAggregateInput
    _max?: BillHistoryMaxOrderByAggregateInput
    _min?: BillHistoryMinOrderByAggregateInput
    _sum?: BillHistorySumOrderByAggregateInput
  }

  export type BillHistoryScalarWhereWithAggregatesInput = {
    AND?: BillHistoryScalarWhereWithAggregatesInput | BillHistoryScalarWhereWithAggregatesInput[]
    OR?: BillHistoryScalarWhereWithAggregatesInput[]
    NOT?: BillHistoryScalarWhereWithAggregatesInput | BillHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BillHistory"> | string
    userId?: StringWithAggregatesFilter<"BillHistory"> | string
    billTotal?: DecimalWithAggregatesFilter<"BillHistory"> | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeWithAggregatesFilter<"BillHistory"> | Date | string
  }

  export type UtilityProviderWhereInput = {
    AND?: UtilityProviderWhereInput | UtilityProviderWhereInput[]
    OR?: UtilityProviderWhereInput[]
    NOT?: UtilityProviderWhereInput | UtilityProviderWhereInput[]
    id?: StringFilter<"UtilityProvider"> | string
    zipCode?: StringFilter<"UtilityProvider"> | string
    utilityName?: StringFilter<"UtilityProvider"> | string
    rateName?: StringFilter<"UtilityProvider"> | string
    sector?: StringFilter<"UtilityProvider"> | string
    rateStructureJson?: JsonNullableFilter<"UtilityProvider">
    weekdayScheduleJson?: JsonNullableFilter<"UtilityProvider">
    weekendScheduleJson?: JsonNullableFilter<"UtilityProvider">
    fuelAdjustmentsJson?: JsonNullableFilter<"UtilityProvider">
    fetchedAt?: DateTimeFilter<"UtilityProvider"> | Date | string
    hourlyRates?: HourlyRateListRelationFilter
    users?: UserListRelationFilter
  }

  export type UtilityProviderOrderByWithRelationInput = {
    id?: SortOrder
    zipCode?: SortOrder
    utilityName?: SortOrder
    rateName?: SortOrder
    sector?: SortOrder
    rateStructureJson?: SortOrderInput | SortOrder
    weekdayScheduleJson?: SortOrderInput | SortOrder
    weekendScheduleJson?: SortOrderInput | SortOrder
    fuelAdjustmentsJson?: SortOrderInput | SortOrder
    fetchedAt?: SortOrder
    hourlyRates?: HourlyRateOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
  }

  export type UtilityProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    zipCode_utilityName_rateName?: UtilityProviderZipCodeUtilityNameRateNameCompoundUniqueInput
    AND?: UtilityProviderWhereInput | UtilityProviderWhereInput[]
    OR?: UtilityProviderWhereInput[]
    NOT?: UtilityProviderWhereInput | UtilityProviderWhereInput[]
    zipCode?: StringFilter<"UtilityProvider"> | string
    utilityName?: StringFilter<"UtilityProvider"> | string
    rateName?: StringFilter<"UtilityProvider"> | string
    sector?: StringFilter<"UtilityProvider"> | string
    rateStructureJson?: JsonNullableFilter<"UtilityProvider">
    weekdayScheduleJson?: JsonNullableFilter<"UtilityProvider">
    weekendScheduleJson?: JsonNullableFilter<"UtilityProvider">
    fuelAdjustmentsJson?: JsonNullableFilter<"UtilityProvider">
    fetchedAt?: DateTimeFilter<"UtilityProvider"> | Date | string
    hourlyRates?: HourlyRateListRelationFilter
    users?: UserListRelationFilter
  }, "id" | "zipCode_utilityName_rateName">

  export type UtilityProviderOrderByWithAggregationInput = {
    id?: SortOrder
    zipCode?: SortOrder
    utilityName?: SortOrder
    rateName?: SortOrder
    sector?: SortOrder
    rateStructureJson?: SortOrderInput | SortOrder
    weekdayScheduleJson?: SortOrderInput | SortOrder
    weekendScheduleJson?: SortOrderInput | SortOrder
    fuelAdjustmentsJson?: SortOrderInput | SortOrder
    fetchedAt?: SortOrder
    _count?: UtilityProviderCountOrderByAggregateInput
    _max?: UtilityProviderMaxOrderByAggregateInput
    _min?: UtilityProviderMinOrderByAggregateInput
  }

  export type UtilityProviderScalarWhereWithAggregatesInput = {
    AND?: UtilityProviderScalarWhereWithAggregatesInput | UtilityProviderScalarWhereWithAggregatesInput[]
    OR?: UtilityProviderScalarWhereWithAggregatesInput[]
    NOT?: UtilityProviderScalarWhereWithAggregatesInput | UtilityProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UtilityProvider"> | string
    zipCode?: StringWithAggregatesFilter<"UtilityProvider"> | string
    utilityName?: StringWithAggregatesFilter<"UtilityProvider"> | string
    rateName?: StringWithAggregatesFilter<"UtilityProvider"> | string
    sector?: StringWithAggregatesFilter<"UtilityProvider"> | string
    rateStructureJson?: JsonNullableWithAggregatesFilter<"UtilityProvider">
    weekdayScheduleJson?: JsonNullableWithAggregatesFilter<"UtilityProvider">
    weekendScheduleJson?: JsonNullableWithAggregatesFilter<"UtilityProvider">
    fuelAdjustmentsJson?: JsonNullableWithAggregatesFilter<"UtilityProvider">
    fetchedAt?: DateTimeWithAggregatesFilter<"UtilityProvider"> | Date | string
  }

  export type HourlyRateWhereInput = {
    AND?: HourlyRateWhereInput | HourlyRateWhereInput[]
    OR?: HourlyRateWhereInput[]
    NOT?: HourlyRateWhereInput | HourlyRateWhereInput[]
    id?: StringFilter<"HourlyRate"> | string
    providerId?: StringFilter<"HourlyRate"> | string
    date?: DateTimeFilter<"HourlyRate"> | Date | string
    hour?: IntFilter<"HourlyRate"> | number
    baseRate?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFilter<"HourlyRate"> | number
    periodLabel?: StringFilter<"HourlyRate"> | string
    provider?: XOR<UtilityProviderScalarRelationFilter, UtilityProviderWhereInput>
  }

  export type HourlyRateOrderByWithRelationInput = {
    id?: SortOrder
    providerId?: SortOrder
    date?: SortOrder
    hour?: SortOrder
    baseRate?: SortOrder
    deliveryCost?: SortOrder
    totalRate?: SortOrder
    periodIndex?: SortOrder
    periodLabel?: SortOrder
    provider?: UtilityProviderOrderByWithRelationInput
  }

  export type HourlyRateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    providerId_date_hour?: HourlyRateProviderIdDateHourCompoundUniqueInput
    AND?: HourlyRateWhereInput | HourlyRateWhereInput[]
    OR?: HourlyRateWhereInput[]
    NOT?: HourlyRateWhereInput | HourlyRateWhereInput[]
    providerId?: StringFilter<"HourlyRate"> | string
    date?: DateTimeFilter<"HourlyRate"> | Date | string
    hour?: IntFilter<"HourlyRate"> | number
    baseRate?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFilter<"HourlyRate"> | number
    periodLabel?: StringFilter<"HourlyRate"> | string
    provider?: XOR<UtilityProviderScalarRelationFilter, UtilityProviderWhereInput>
  }, "id" | "providerId_date_hour">

  export type HourlyRateOrderByWithAggregationInput = {
    id?: SortOrder
    providerId?: SortOrder
    date?: SortOrder
    hour?: SortOrder
    baseRate?: SortOrder
    deliveryCost?: SortOrder
    totalRate?: SortOrder
    periodIndex?: SortOrder
    periodLabel?: SortOrder
    _count?: HourlyRateCountOrderByAggregateInput
    _avg?: HourlyRateAvgOrderByAggregateInput
    _max?: HourlyRateMaxOrderByAggregateInput
    _min?: HourlyRateMinOrderByAggregateInput
    _sum?: HourlyRateSumOrderByAggregateInput
  }

  export type HourlyRateScalarWhereWithAggregatesInput = {
    AND?: HourlyRateScalarWhereWithAggregatesInput | HourlyRateScalarWhereWithAggregatesInput[]
    OR?: HourlyRateScalarWhereWithAggregatesInput[]
    NOT?: HourlyRateScalarWhereWithAggregatesInput | HourlyRateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HourlyRate"> | string
    providerId?: StringWithAggregatesFilter<"HourlyRate"> | string
    date?: DateTimeWithAggregatesFilter<"HourlyRate"> | Date | string
    hour?: IntWithAggregatesFilter<"HourlyRate"> | number
    baseRate?: DecimalWithAggregatesFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalWithAggregatesFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalWithAggregatesFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    periodIndex?: IntWithAggregatesFilter<"HourlyRate"> | number
    periodLabel?: StringWithAggregatesFilter<"HourlyRate"> | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProvider?: UtilityProviderCreateNestedOneWithoutUsersInput
    locations?: LocationCreateNestedManyWithoutUserInput
    billHistory?: BillHistoryCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProviderId?: string | null
    locations?: LocationUncheckedCreateNestedManyWithoutUserInput
    billHistory?: BillHistoryUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProvider?: UtilityProviderUpdateOneWithoutUsersNestedInput
    locations?: LocationUpdateManyWithoutUserNestedInput
    billHistory?: BillHistoryUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    locations?: LocationUncheckedUpdateManyWithoutUserNestedInput
    billHistory?: BillHistoryUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProviderId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProviderId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LocationCreateInput = {
    id?: string
    zip: string
    user: UserCreateNestedOneWithoutLocationsInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    userId: string
    zip: string
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutLocationsNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type LocationCreateManyInput = {
    id?: string
    userId: string
    zip: string
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type DeviceCreateInput = {
    id?: string
    name: string
    type: string
    brand?: string | null
    model?: string | null
    hourlyEnergy?: number | null
    isSmart?: boolean
    runDurationMinutes?: number | null
    user: UserCreateNestedOneWithoutDevicesInput
  }

  export type DeviceUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    type: string
    brand?: string | null
    model?: string | null
    hourlyEnergy?: number | null
    isSmart?: boolean
    runDurationMinutes?: number | null
  }

  export type DeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyEnergy?: NullableFloatFieldUpdateOperationsInput | number | null
    isSmart?: BoolFieldUpdateOperationsInput | boolean
    runDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
  }

  export type DeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyEnergy?: NullableFloatFieldUpdateOperationsInput | number | null
    isSmart?: BoolFieldUpdateOperationsInput | boolean
    runDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceCreateManyInput = {
    id?: string
    userId: string
    name: string
    type: string
    brand?: string | null
    model?: string | null
    hourlyEnergy?: number | null
    isSmart?: boolean
    runDurationMinutes?: number | null
  }

  export type DeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyEnergy?: NullableFloatFieldUpdateOperationsInput | number | null
    isSmart?: BoolFieldUpdateOperationsInput | boolean
    runDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyEnergy?: NullableFloatFieldUpdateOperationsInput | number | null
    isSmart?: BoolFieldUpdateOperationsInput | boolean
    runDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BillHistoryCreateInput = {
    id?: string
    billTotal: Decimal | DecimalJsLike | number | string
    createdDate?: Date | string
    user: UserCreateNestedOneWithoutBillHistoryInput
  }

  export type BillHistoryUncheckedCreateInput = {
    id?: string
    userId: string
    billTotal: Decimal | DecimalJsLike | number | string
    createdDate?: Date | string
  }

  export type BillHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    billTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBillHistoryNestedInput
  }

  export type BillHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    billTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillHistoryCreateManyInput = {
    id?: string
    userId: string
    billTotal: Decimal | DecimalJsLike | number | string
    createdDate?: Date | string
  }

  export type BillHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    billTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    billTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UtilityProviderCreateInput = {
    id?: string
    zipCode: string
    utilityName: string
    rateName: string
    sector?: string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    hourlyRates?: HourlyRateCreateNestedManyWithoutProviderInput
    users?: UserCreateNestedManyWithoutSelectedProviderInput
  }

  export type UtilityProviderUncheckedCreateInput = {
    id?: string
    zipCode: string
    utilityName: string
    rateName: string
    sector?: string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    hourlyRates?: HourlyRateUncheckedCreateNestedManyWithoutProviderInput
    users?: UserUncheckedCreateNestedManyWithoutSelectedProviderInput
  }

  export type UtilityProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    utilityName?: StringFieldUpdateOperationsInput | string
    rateName?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hourlyRates?: HourlyRateUpdateManyWithoutProviderNestedInput
    users?: UserUpdateManyWithoutSelectedProviderNestedInput
  }

  export type UtilityProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    utilityName?: StringFieldUpdateOperationsInput | string
    rateName?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hourlyRates?: HourlyRateUncheckedUpdateManyWithoutProviderNestedInput
    users?: UserUncheckedUpdateManyWithoutSelectedProviderNestedInput
  }

  export type UtilityProviderCreateManyInput = {
    id?: string
    zipCode: string
    utilityName: string
    rateName: string
    sector?: string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
  }

  export type UtilityProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    utilityName?: StringFieldUpdateOperationsInput | string
    rateName?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UtilityProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    utilityName?: StringFieldUpdateOperationsInput | string
    rateName?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HourlyRateCreateInput = {
    id?: string
    date: Date | string
    hour: number
    baseRate: Decimal | DecimalJsLike | number | string
    deliveryCost: Decimal | DecimalJsLike | number | string
    totalRate: Decimal | DecimalJsLike | number | string
    periodIndex: number
    periodLabel: string
    provider: UtilityProviderCreateNestedOneWithoutHourlyRatesInput
  }

  export type HourlyRateUncheckedCreateInput = {
    id?: string
    providerId: string
    date: Date | string
    hour: number
    baseRate: Decimal | DecimalJsLike | number | string
    deliveryCost: Decimal | DecimalJsLike | number | string
    totalRate: Decimal | DecimalJsLike | number | string
    periodIndex: number
    periodLabel: string
  }

  export type HourlyRateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    hour?: IntFieldUpdateOperationsInput | number
    baseRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
    provider?: UtilityProviderUpdateOneRequiredWithoutHourlyRatesNestedInput
  }

  export type HourlyRateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    hour?: IntFieldUpdateOperationsInput | number
    baseRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
  }

  export type HourlyRateCreateManyInput = {
    id?: string
    providerId: string
    date: Date | string
    hour: number
    baseRate: Decimal | DecimalJsLike | number | string
    deliveryCost: Decimal | DecimalJsLike | number | string
    totalRate: Decimal | DecimalJsLike | number | string
    periodIndex: number
    periodLabel: string
  }

  export type HourlyRateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    hour?: IntFieldUpdateOperationsInput | number
    baseRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
  }

  export type HourlyRateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    hour?: IntFieldUpdateOperationsInput | number
    baseRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UtilityProviderNullableScalarRelationFilter = {
    is?: UtilityProviderWhereInput | null
    isNot?: UtilityProviderWhereInput | null
  }

  export type LocationListRelationFilter = {
    every?: LocationWhereInput
    some?: LocationWhereInput
    none?: LocationWhereInput
  }

  export type BillHistoryListRelationFilter = {
    every?: BillHistoryWhereInput
    some?: BillHistoryWhereInput
    none?: BillHistoryWhereInput
  }

  export type DeviceListRelationFilter = {
    every?: DeviceWhereInput
    some?: DeviceWhereInput
    none?: DeviceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BillHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    utilityProv?: SortOrder
    selectedProviderId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    utilityProv?: SortOrder
    selectedProviderId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    utilityProv?: SortOrder
    selectedProviderId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    zip?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    zip?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    zip?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DeviceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    hourlyEnergy?: SortOrder
    isSmart?: SortOrder
    runDurationMinutes?: SortOrder
  }

  export type DeviceAvgOrderByAggregateInput = {
    hourlyEnergy?: SortOrder
    runDurationMinutes?: SortOrder
  }

  export type DeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    hourlyEnergy?: SortOrder
    isSmart?: SortOrder
    runDurationMinutes?: SortOrder
  }

  export type DeviceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    hourlyEnergy?: SortOrder
    isSmart?: SortOrder
    runDurationMinutes?: SortOrder
  }

  export type DeviceSumOrderByAggregateInput = {
    hourlyEnergy?: SortOrder
    runDurationMinutes?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BillHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    billTotal?: SortOrder
    createdDate?: SortOrder
  }

  export type BillHistoryAvgOrderByAggregateInput = {
    billTotal?: SortOrder
  }

  export type BillHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    billTotal?: SortOrder
    createdDate?: SortOrder
  }

  export type BillHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    billTotal?: SortOrder
    createdDate?: SortOrder
  }

  export type BillHistorySumOrderByAggregateInput = {
    billTotal?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type HourlyRateListRelationFilter = {
    every?: HourlyRateWhereInput
    some?: HourlyRateWhereInput
    none?: HourlyRateWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type HourlyRateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UtilityProviderZipCodeUtilityNameRateNameCompoundUniqueInput = {
    zipCode: string
    utilityName: string
    rateName: string
  }

  export type UtilityProviderCountOrderByAggregateInput = {
    id?: SortOrder
    zipCode?: SortOrder
    utilityName?: SortOrder
    rateName?: SortOrder
    sector?: SortOrder
    rateStructureJson?: SortOrder
    weekdayScheduleJson?: SortOrder
    weekendScheduleJson?: SortOrder
    fuelAdjustmentsJson?: SortOrder
    fetchedAt?: SortOrder
  }

  export type UtilityProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    zipCode?: SortOrder
    utilityName?: SortOrder
    rateName?: SortOrder
    sector?: SortOrder
    fetchedAt?: SortOrder
  }

  export type UtilityProviderMinOrderByAggregateInput = {
    id?: SortOrder
    zipCode?: SortOrder
    utilityName?: SortOrder
    rateName?: SortOrder
    sector?: SortOrder
    fetchedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UtilityProviderScalarRelationFilter = {
    is?: UtilityProviderWhereInput
    isNot?: UtilityProviderWhereInput
  }

  export type HourlyRateProviderIdDateHourCompoundUniqueInput = {
    providerId: string
    date: Date | string
    hour: number
  }

  export type HourlyRateCountOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
    date?: SortOrder
    hour?: SortOrder
    baseRate?: SortOrder
    deliveryCost?: SortOrder
    totalRate?: SortOrder
    periodIndex?: SortOrder
    periodLabel?: SortOrder
  }

  export type HourlyRateAvgOrderByAggregateInput = {
    hour?: SortOrder
    baseRate?: SortOrder
    deliveryCost?: SortOrder
    totalRate?: SortOrder
    periodIndex?: SortOrder
  }

  export type HourlyRateMaxOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
    date?: SortOrder
    hour?: SortOrder
    baseRate?: SortOrder
    deliveryCost?: SortOrder
    totalRate?: SortOrder
    periodIndex?: SortOrder
    periodLabel?: SortOrder
  }

  export type HourlyRateMinOrderByAggregateInput = {
    id?: SortOrder
    providerId?: SortOrder
    date?: SortOrder
    hour?: SortOrder
    baseRate?: SortOrder
    deliveryCost?: SortOrder
    totalRate?: SortOrder
    periodIndex?: SortOrder
    periodLabel?: SortOrder
  }

  export type HourlyRateSumOrderByAggregateInput = {
    hour?: SortOrder
    baseRate?: SortOrder
    deliveryCost?: SortOrder
    totalRate?: SortOrder
    periodIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UtilityProviderCreateNestedOneWithoutUsersInput = {
    create?: XOR<UtilityProviderCreateWithoutUsersInput, UtilityProviderUncheckedCreateWithoutUsersInput>
    connectOrCreate?: UtilityProviderCreateOrConnectWithoutUsersInput
    connect?: UtilityProviderWhereUniqueInput
  }

  export type LocationCreateNestedManyWithoutUserInput = {
    create?: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput> | LocationCreateWithoutUserInput[] | LocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutUserInput | LocationCreateOrConnectWithoutUserInput[]
    createMany?: LocationCreateManyUserInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type BillHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<BillHistoryCreateWithoutUserInput, BillHistoryUncheckedCreateWithoutUserInput> | BillHistoryCreateWithoutUserInput[] | BillHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BillHistoryCreateOrConnectWithoutUserInput | BillHistoryCreateOrConnectWithoutUserInput[]
    createMany?: BillHistoryCreateManyUserInputEnvelope
    connect?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
  }

  export type DeviceCreateNestedManyWithoutUserInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type LocationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput> | LocationCreateWithoutUserInput[] | LocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutUserInput | LocationCreateOrConnectWithoutUserInput[]
    createMany?: LocationCreateManyUserInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type BillHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BillHistoryCreateWithoutUserInput, BillHistoryUncheckedCreateWithoutUserInput> | BillHistoryCreateWithoutUserInput[] | BillHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BillHistoryCreateOrConnectWithoutUserInput | BillHistoryCreateOrConnectWithoutUserInput[]
    createMany?: BillHistoryCreateManyUserInputEnvelope
    connect?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
  }

  export type DeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UtilityProviderUpdateOneWithoutUsersNestedInput = {
    create?: XOR<UtilityProviderCreateWithoutUsersInput, UtilityProviderUncheckedCreateWithoutUsersInput>
    connectOrCreate?: UtilityProviderCreateOrConnectWithoutUsersInput
    upsert?: UtilityProviderUpsertWithoutUsersInput
    disconnect?: UtilityProviderWhereInput | boolean
    delete?: UtilityProviderWhereInput | boolean
    connect?: UtilityProviderWhereUniqueInput
    update?: XOR<XOR<UtilityProviderUpdateToOneWithWhereWithoutUsersInput, UtilityProviderUpdateWithoutUsersInput>, UtilityProviderUncheckedUpdateWithoutUsersInput>
  }

  export type LocationUpdateManyWithoutUserNestedInput = {
    create?: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput> | LocationCreateWithoutUserInput[] | LocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutUserInput | LocationCreateOrConnectWithoutUserInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutUserInput | LocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LocationCreateManyUserInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutUserInput | LocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutUserInput | LocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type BillHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<BillHistoryCreateWithoutUserInput, BillHistoryUncheckedCreateWithoutUserInput> | BillHistoryCreateWithoutUserInput[] | BillHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BillHistoryCreateOrConnectWithoutUserInput | BillHistoryCreateOrConnectWithoutUserInput[]
    upsert?: BillHistoryUpsertWithWhereUniqueWithoutUserInput | BillHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BillHistoryCreateManyUserInputEnvelope
    set?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
    disconnect?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
    delete?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
    connect?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
    update?: BillHistoryUpdateWithWhereUniqueWithoutUserInput | BillHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BillHistoryUpdateManyWithWhereWithoutUserInput | BillHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BillHistoryScalarWhereInput | BillHistoryScalarWhereInput[]
  }

  export type DeviceUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutUserInput | DeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutUserInput | DeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutUserInput | DeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type LocationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput> | LocationCreateWithoutUserInput[] | LocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutUserInput | LocationCreateOrConnectWithoutUserInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutUserInput | LocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LocationCreateManyUserInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutUserInput | LocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutUserInput | LocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type BillHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BillHistoryCreateWithoutUserInput, BillHistoryUncheckedCreateWithoutUserInput> | BillHistoryCreateWithoutUserInput[] | BillHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BillHistoryCreateOrConnectWithoutUserInput | BillHistoryCreateOrConnectWithoutUserInput[]
    upsert?: BillHistoryUpsertWithWhereUniqueWithoutUserInput | BillHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BillHistoryCreateManyUserInputEnvelope
    set?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
    disconnect?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
    delete?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
    connect?: BillHistoryWhereUniqueInput | BillHistoryWhereUniqueInput[]
    update?: BillHistoryUpdateWithWhereUniqueWithoutUserInput | BillHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BillHistoryUpdateManyWithWhereWithoutUserInput | BillHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BillHistoryScalarWhereInput | BillHistoryScalarWhereInput[]
  }

  export type DeviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutUserInput | DeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutUserInput | DeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutUserInput | DeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutLocationsInput = {
    create?: XOR<UserCreateWithoutLocationsInput, UserUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLocationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<UserCreateWithoutLocationsInput, UserUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLocationsInput
    upsert?: UserUpsertWithoutLocationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLocationsInput, UserUpdateWithoutLocationsInput>, UserUncheckedUpdateWithoutLocationsInput>
  }

  export type UserCreateNestedOneWithoutDevicesInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutDevicesNestedInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    upsert?: UserUpsertWithoutDevicesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDevicesInput, UserUpdateWithoutDevicesInput>, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type UserCreateNestedOneWithoutBillHistoryInput = {
    create?: XOR<UserCreateWithoutBillHistoryInput, UserUncheckedCreateWithoutBillHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutBillHistoryNestedInput = {
    create?: XOR<UserCreateWithoutBillHistoryInput, UserUncheckedCreateWithoutBillHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillHistoryInput
    upsert?: UserUpsertWithoutBillHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBillHistoryInput, UserUpdateWithoutBillHistoryInput>, UserUncheckedUpdateWithoutBillHistoryInput>
  }

  export type HourlyRateCreateNestedManyWithoutProviderInput = {
    create?: XOR<HourlyRateCreateWithoutProviderInput, HourlyRateUncheckedCreateWithoutProviderInput> | HourlyRateCreateWithoutProviderInput[] | HourlyRateUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: HourlyRateCreateOrConnectWithoutProviderInput | HourlyRateCreateOrConnectWithoutProviderInput[]
    createMany?: HourlyRateCreateManyProviderInputEnvelope
    connect?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutSelectedProviderInput = {
    create?: XOR<UserCreateWithoutSelectedProviderInput, UserUncheckedCreateWithoutSelectedProviderInput> | UserCreateWithoutSelectedProviderInput[] | UserUncheckedCreateWithoutSelectedProviderInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSelectedProviderInput | UserCreateOrConnectWithoutSelectedProviderInput[]
    createMany?: UserCreateManySelectedProviderInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type HourlyRateUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<HourlyRateCreateWithoutProviderInput, HourlyRateUncheckedCreateWithoutProviderInput> | HourlyRateCreateWithoutProviderInput[] | HourlyRateUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: HourlyRateCreateOrConnectWithoutProviderInput | HourlyRateCreateOrConnectWithoutProviderInput[]
    createMany?: HourlyRateCreateManyProviderInputEnvelope
    connect?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutSelectedProviderInput = {
    create?: XOR<UserCreateWithoutSelectedProviderInput, UserUncheckedCreateWithoutSelectedProviderInput> | UserCreateWithoutSelectedProviderInput[] | UserUncheckedCreateWithoutSelectedProviderInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSelectedProviderInput | UserCreateOrConnectWithoutSelectedProviderInput[]
    createMany?: UserCreateManySelectedProviderInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type HourlyRateUpdateManyWithoutProviderNestedInput = {
    create?: XOR<HourlyRateCreateWithoutProviderInput, HourlyRateUncheckedCreateWithoutProviderInput> | HourlyRateCreateWithoutProviderInput[] | HourlyRateUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: HourlyRateCreateOrConnectWithoutProviderInput | HourlyRateCreateOrConnectWithoutProviderInput[]
    upsert?: HourlyRateUpsertWithWhereUniqueWithoutProviderInput | HourlyRateUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: HourlyRateCreateManyProviderInputEnvelope
    set?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
    disconnect?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
    delete?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
    connect?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
    update?: HourlyRateUpdateWithWhereUniqueWithoutProviderInput | HourlyRateUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: HourlyRateUpdateManyWithWhereWithoutProviderInput | HourlyRateUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: HourlyRateScalarWhereInput | HourlyRateScalarWhereInput[]
  }

  export type UserUpdateManyWithoutSelectedProviderNestedInput = {
    create?: XOR<UserCreateWithoutSelectedProviderInput, UserUncheckedCreateWithoutSelectedProviderInput> | UserCreateWithoutSelectedProviderInput[] | UserUncheckedCreateWithoutSelectedProviderInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSelectedProviderInput | UserCreateOrConnectWithoutSelectedProviderInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSelectedProviderInput | UserUpsertWithWhereUniqueWithoutSelectedProviderInput[]
    createMany?: UserCreateManySelectedProviderInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSelectedProviderInput | UserUpdateWithWhereUniqueWithoutSelectedProviderInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSelectedProviderInput | UserUpdateManyWithWhereWithoutSelectedProviderInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type HourlyRateUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<HourlyRateCreateWithoutProviderInput, HourlyRateUncheckedCreateWithoutProviderInput> | HourlyRateCreateWithoutProviderInput[] | HourlyRateUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: HourlyRateCreateOrConnectWithoutProviderInput | HourlyRateCreateOrConnectWithoutProviderInput[]
    upsert?: HourlyRateUpsertWithWhereUniqueWithoutProviderInput | HourlyRateUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: HourlyRateCreateManyProviderInputEnvelope
    set?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
    disconnect?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
    delete?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
    connect?: HourlyRateWhereUniqueInput | HourlyRateWhereUniqueInput[]
    update?: HourlyRateUpdateWithWhereUniqueWithoutProviderInput | HourlyRateUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: HourlyRateUpdateManyWithWhereWithoutProviderInput | HourlyRateUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: HourlyRateScalarWhereInput | HourlyRateScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutSelectedProviderNestedInput = {
    create?: XOR<UserCreateWithoutSelectedProviderInput, UserUncheckedCreateWithoutSelectedProviderInput> | UserCreateWithoutSelectedProviderInput[] | UserUncheckedCreateWithoutSelectedProviderInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSelectedProviderInput | UserCreateOrConnectWithoutSelectedProviderInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSelectedProviderInput | UserUpsertWithWhereUniqueWithoutSelectedProviderInput[]
    createMany?: UserCreateManySelectedProviderInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSelectedProviderInput | UserUpdateWithWhereUniqueWithoutSelectedProviderInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSelectedProviderInput | UserUpdateManyWithWhereWithoutSelectedProviderInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UtilityProviderCreateNestedOneWithoutHourlyRatesInput = {
    create?: XOR<UtilityProviderCreateWithoutHourlyRatesInput, UtilityProviderUncheckedCreateWithoutHourlyRatesInput>
    connectOrCreate?: UtilityProviderCreateOrConnectWithoutHourlyRatesInput
    connect?: UtilityProviderWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UtilityProviderUpdateOneRequiredWithoutHourlyRatesNestedInput = {
    create?: XOR<UtilityProviderCreateWithoutHourlyRatesInput, UtilityProviderUncheckedCreateWithoutHourlyRatesInput>
    connectOrCreate?: UtilityProviderCreateOrConnectWithoutHourlyRatesInput
    upsert?: UtilityProviderUpsertWithoutHourlyRatesInput
    connect?: UtilityProviderWhereUniqueInput
    update?: XOR<XOR<UtilityProviderUpdateToOneWithWhereWithoutHourlyRatesInput, UtilityProviderUpdateWithoutHourlyRatesInput>, UtilityProviderUncheckedUpdateWithoutHourlyRatesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UtilityProviderCreateWithoutUsersInput = {
    id?: string
    zipCode: string
    utilityName: string
    rateName: string
    sector?: string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    hourlyRates?: HourlyRateCreateNestedManyWithoutProviderInput
  }

  export type UtilityProviderUncheckedCreateWithoutUsersInput = {
    id?: string
    zipCode: string
    utilityName: string
    rateName: string
    sector?: string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    hourlyRates?: HourlyRateUncheckedCreateNestedManyWithoutProviderInput
  }

  export type UtilityProviderCreateOrConnectWithoutUsersInput = {
    where: UtilityProviderWhereUniqueInput
    create: XOR<UtilityProviderCreateWithoutUsersInput, UtilityProviderUncheckedCreateWithoutUsersInput>
  }

  export type LocationCreateWithoutUserInput = {
    id?: string
    zip: string
  }

  export type LocationUncheckedCreateWithoutUserInput = {
    id?: string
    zip: string
  }

  export type LocationCreateOrConnectWithoutUserInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput>
  }

  export type LocationCreateManyUserInputEnvelope = {
    data: LocationCreateManyUserInput | LocationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BillHistoryCreateWithoutUserInput = {
    id?: string
    billTotal: Decimal | DecimalJsLike | number | string
    createdDate?: Date | string
  }

  export type BillHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    billTotal: Decimal | DecimalJsLike | number | string
    createdDate?: Date | string
  }

  export type BillHistoryCreateOrConnectWithoutUserInput = {
    where: BillHistoryWhereUniqueInput
    create: XOR<BillHistoryCreateWithoutUserInput, BillHistoryUncheckedCreateWithoutUserInput>
  }

  export type BillHistoryCreateManyUserInputEnvelope = {
    data: BillHistoryCreateManyUserInput | BillHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DeviceCreateWithoutUserInput = {
    id?: string
    name: string
    type: string
    brand?: string | null
    model?: string | null
    hourlyEnergy?: number | null
    isSmart?: boolean
    runDurationMinutes?: number | null
  }

  export type DeviceUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: string
    brand?: string | null
    model?: string | null
    hourlyEnergy?: number | null
    isSmart?: boolean
    runDurationMinutes?: number | null
  }

  export type DeviceCreateOrConnectWithoutUserInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput>
  }

  export type DeviceCreateManyUserInputEnvelope = {
    data: DeviceCreateManyUserInput | DeviceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UtilityProviderUpsertWithoutUsersInput = {
    update: XOR<UtilityProviderUpdateWithoutUsersInput, UtilityProviderUncheckedUpdateWithoutUsersInput>
    create: XOR<UtilityProviderCreateWithoutUsersInput, UtilityProviderUncheckedCreateWithoutUsersInput>
    where?: UtilityProviderWhereInput
  }

  export type UtilityProviderUpdateToOneWithWhereWithoutUsersInput = {
    where?: UtilityProviderWhereInput
    data: XOR<UtilityProviderUpdateWithoutUsersInput, UtilityProviderUncheckedUpdateWithoutUsersInput>
  }

  export type UtilityProviderUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    utilityName?: StringFieldUpdateOperationsInput | string
    rateName?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hourlyRates?: HourlyRateUpdateManyWithoutProviderNestedInput
  }

  export type UtilityProviderUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    utilityName?: StringFieldUpdateOperationsInput | string
    rateName?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hourlyRates?: HourlyRateUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type LocationUpsertWithWhereUniqueWithoutUserInput = {
    where: LocationWhereUniqueInput
    update: XOR<LocationUpdateWithoutUserInput, LocationUncheckedUpdateWithoutUserInput>
    create: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput>
  }

  export type LocationUpdateWithWhereUniqueWithoutUserInput = {
    where: LocationWhereUniqueInput
    data: XOR<LocationUpdateWithoutUserInput, LocationUncheckedUpdateWithoutUserInput>
  }

  export type LocationUpdateManyWithWhereWithoutUserInput = {
    where: LocationScalarWhereInput
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyWithoutUserInput>
  }

  export type LocationScalarWhereInput = {
    AND?: LocationScalarWhereInput | LocationScalarWhereInput[]
    OR?: LocationScalarWhereInput[]
    NOT?: LocationScalarWhereInput | LocationScalarWhereInput[]
    id?: StringFilter<"Location"> | string
    userId?: StringFilter<"Location"> | string
    zip?: StringFilter<"Location"> | string
  }

  export type BillHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: BillHistoryWhereUniqueInput
    update: XOR<BillHistoryUpdateWithoutUserInput, BillHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<BillHistoryCreateWithoutUserInput, BillHistoryUncheckedCreateWithoutUserInput>
  }

  export type BillHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: BillHistoryWhereUniqueInput
    data: XOR<BillHistoryUpdateWithoutUserInput, BillHistoryUncheckedUpdateWithoutUserInput>
  }

  export type BillHistoryUpdateManyWithWhereWithoutUserInput = {
    where: BillHistoryScalarWhereInput
    data: XOR<BillHistoryUpdateManyMutationInput, BillHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type BillHistoryScalarWhereInput = {
    AND?: BillHistoryScalarWhereInput | BillHistoryScalarWhereInput[]
    OR?: BillHistoryScalarWhereInput[]
    NOT?: BillHistoryScalarWhereInput | BillHistoryScalarWhereInput[]
    id?: StringFilter<"BillHistory"> | string
    userId?: StringFilter<"BillHistory"> | string
    billTotal?: DecimalFilter<"BillHistory"> | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFilter<"BillHistory"> | Date | string
  }

  export type DeviceUpsertWithWhereUniqueWithoutUserInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutUserInput, DeviceUncheckedUpdateWithoutUserInput>
    create: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutUserInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutUserInput, DeviceUncheckedUpdateWithoutUserInput>
  }

  export type DeviceUpdateManyWithWhereWithoutUserInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutUserInput>
  }

  export type DeviceScalarWhereInput = {
    AND?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    OR?: DeviceScalarWhereInput[]
    NOT?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    id?: StringFilter<"Device"> | string
    userId?: StringFilter<"Device"> | string
    name?: StringFilter<"Device"> | string
    type?: StringFilter<"Device"> | string
    brand?: StringNullableFilter<"Device"> | string | null
    model?: StringNullableFilter<"Device"> | string | null
    hourlyEnergy?: FloatNullableFilter<"Device"> | number | null
    isSmart?: BoolFilter<"Device"> | boolean
    runDurationMinutes?: IntNullableFilter<"Device"> | number | null
  }

  export type UserCreateWithoutLocationsInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProvider?: UtilityProviderCreateNestedOneWithoutUsersInput
    billHistory?: BillHistoryCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLocationsInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProviderId?: string | null
    billHistory?: BillHistoryUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLocationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLocationsInput, UserUncheckedCreateWithoutLocationsInput>
  }

  export type UserUpsertWithoutLocationsInput = {
    update: XOR<UserUpdateWithoutLocationsInput, UserUncheckedUpdateWithoutLocationsInput>
    create: XOR<UserCreateWithoutLocationsInput, UserUncheckedCreateWithoutLocationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLocationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLocationsInput, UserUncheckedUpdateWithoutLocationsInput>
  }

  export type UserUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProvider?: UtilityProviderUpdateOneWithoutUsersNestedInput
    billHistory?: BillHistoryUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    billHistory?: BillHistoryUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDevicesInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProvider?: UtilityProviderCreateNestedOneWithoutUsersInput
    locations?: LocationCreateNestedManyWithoutUserInput
    billHistory?: BillHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDevicesInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProviderId?: string | null
    locations?: LocationUncheckedCreateNestedManyWithoutUserInput
    billHistory?: BillHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDevicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
  }

  export type UserUpsertWithoutDevicesInput = {
    update: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDevicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type UserUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProvider?: UtilityProviderUpdateOneWithoutUsersNestedInput
    locations?: LocationUpdateManyWithoutUserNestedInput
    billHistory?: BillHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    locations?: LocationUncheckedUpdateManyWithoutUserNestedInput
    billHistory?: BillHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBillHistoryInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProvider?: UtilityProviderCreateNestedOneWithoutUsersInput
    locations?: LocationCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBillHistoryInput = {
    id: string
    email: string
    utilityProv?: string | null
    selectedProviderId?: string | null
    locations?: LocationUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBillHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBillHistoryInput, UserUncheckedCreateWithoutBillHistoryInput>
  }

  export type UserUpsertWithoutBillHistoryInput = {
    update: XOR<UserUpdateWithoutBillHistoryInput, UserUncheckedUpdateWithoutBillHistoryInput>
    create: XOR<UserCreateWithoutBillHistoryInput, UserUncheckedCreateWithoutBillHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBillHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBillHistoryInput, UserUncheckedUpdateWithoutBillHistoryInput>
  }

  export type UserUpdateWithoutBillHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProvider?: UtilityProviderUpdateOneWithoutUsersNestedInput
    locations?: LocationUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBillHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    selectedProviderId?: NullableStringFieldUpdateOperationsInput | string | null
    locations?: LocationUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type HourlyRateCreateWithoutProviderInput = {
    id?: string
    date: Date | string
    hour: number
    baseRate: Decimal | DecimalJsLike | number | string
    deliveryCost: Decimal | DecimalJsLike | number | string
    totalRate: Decimal | DecimalJsLike | number | string
    periodIndex: number
    periodLabel: string
  }

  export type HourlyRateUncheckedCreateWithoutProviderInput = {
    id?: string
    date: Date | string
    hour: number
    baseRate: Decimal | DecimalJsLike | number | string
    deliveryCost: Decimal | DecimalJsLike | number | string
    totalRate: Decimal | DecimalJsLike | number | string
    periodIndex: number
    periodLabel: string
  }

  export type HourlyRateCreateOrConnectWithoutProviderInput = {
    where: HourlyRateWhereUniqueInput
    create: XOR<HourlyRateCreateWithoutProviderInput, HourlyRateUncheckedCreateWithoutProviderInput>
  }

  export type HourlyRateCreateManyProviderInputEnvelope = {
    data: HourlyRateCreateManyProviderInput | HourlyRateCreateManyProviderInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutSelectedProviderInput = {
    id: string
    email: string
    utilityProv?: string | null
    locations?: LocationCreateNestedManyWithoutUserInput
    billHistory?: BillHistoryCreateNestedManyWithoutUserInput
    devices?: DeviceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSelectedProviderInput = {
    id: string
    email: string
    utilityProv?: string | null
    locations?: LocationUncheckedCreateNestedManyWithoutUserInput
    billHistory?: BillHistoryUncheckedCreateNestedManyWithoutUserInput
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSelectedProviderInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSelectedProviderInput, UserUncheckedCreateWithoutSelectedProviderInput>
  }

  export type UserCreateManySelectedProviderInputEnvelope = {
    data: UserCreateManySelectedProviderInput | UserCreateManySelectedProviderInput[]
    skipDuplicates?: boolean
  }

  export type HourlyRateUpsertWithWhereUniqueWithoutProviderInput = {
    where: HourlyRateWhereUniqueInput
    update: XOR<HourlyRateUpdateWithoutProviderInput, HourlyRateUncheckedUpdateWithoutProviderInput>
    create: XOR<HourlyRateCreateWithoutProviderInput, HourlyRateUncheckedCreateWithoutProviderInput>
  }

  export type HourlyRateUpdateWithWhereUniqueWithoutProviderInput = {
    where: HourlyRateWhereUniqueInput
    data: XOR<HourlyRateUpdateWithoutProviderInput, HourlyRateUncheckedUpdateWithoutProviderInput>
  }

  export type HourlyRateUpdateManyWithWhereWithoutProviderInput = {
    where: HourlyRateScalarWhereInput
    data: XOR<HourlyRateUpdateManyMutationInput, HourlyRateUncheckedUpdateManyWithoutProviderInput>
  }

  export type HourlyRateScalarWhereInput = {
    AND?: HourlyRateScalarWhereInput | HourlyRateScalarWhereInput[]
    OR?: HourlyRateScalarWhereInput[]
    NOT?: HourlyRateScalarWhereInput | HourlyRateScalarWhereInput[]
    id?: StringFilter<"HourlyRate"> | string
    providerId?: StringFilter<"HourlyRate"> | string
    date?: DateTimeFilter<"HourlyRate"> | Date | string
    hour?: IntFilter<"HourlyRate"> | number
    baseRate?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFilter<"HourlyRate"> | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFilter<"HourlyRate"> | number
    periodLabel?: StringFilter<"HourlyRate"> | string
  }

  export type UserUpsertWithWhereUniqueWithoutSelectedProviderInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutSelectedProviderInput, UserUncheckedUpdateWithoutSelectedProviderInput>
    create: XOR<UserCreateWithoutSelectedProviderInput, UserUncheckedCreateWithoutSelectedProviderInput>
  }

  export type UserUpdateWithWhereUniqueWithoutSelectedProviderInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutSelectedProviderInput, UserUncheckedUpdateWithoutSelectedProviderInput>
  }

  export type UserUpdateManyWithWhereWithoutSelectedProviderInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutSelectedProviderInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    utilityProv?: StringNullableFilter<"User"> | string | null
    selectedProviderId?: StringNullableFilter<"User"> | string | null
  }

  export type UtilityProviderCreateWithoutHourlyRatesInput = {
    id?: string
    zipCode: string
    utilityName: string
    rateName: string
    sector?: string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    users?: UserCreateNestedManyWithoutSelectedProviderInput
  }

  export type UtilityProviderUncheckedCreateWithoutHourlyRatesInput = {
    id?: string
    zipCode: string
    utilityName: string
    rateName: string
    sector?: string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutSelectedProviderInput
  }

  export type UtilityProviderCreateOrConnectWithoutHourlyRatesInput = {
    where: UtilityProviderWhereUniqueInput
    create: XOR<UtilityProviderCreateWithoutHourlyRatesInput, UtilityProviderUncheckedCreateWithoutHourlyRatesInput>
  }

  export type UtilityProviderUpsertWithoutHourlyRatesInput = {
    update: XOR<UtilityProviderUpdateWithoutHourlyRatesInput, UtilityProviderUncheckedUpdateWithoutHourlyRatesInput>
    create: XOR<UtilityProviderCreateWithoutHourlyRatesInput, UtilityProviderUncheckedCreateWithoutHourlyRatesInput>
    where?: UtilityProviderWhereInput
  }

  export type UtilityProviderUpdateToOneWithWhereWithoutHourlyRatesInput = {
    where?: UtilityProviderWhereInput
    data: XOR<UtilityProviderUpdateWithoutHourlyRatesInput, UtilityProviderUncheckedUpdateWithoutHourlyRatesInput>
  }

  export type UtilityProviderUpdateWithoutHourlyRatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    utilityName?: StringFieldUpdateOperationsInput | string
    rateName?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutSelectedProviderNestedInput
  }

  export type UtilityProviderUncheckedUpdateWithoutHourlyRatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    zipCode?: StringFieldUpdateOperationsInput | string
    utilityName?: StringFieldUpdateOperationsInput | string
    rateName?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    rateStructureJson?: NullableJsonNullValueInput | InputJsonValue
    weekdayScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    weekendScheduleJson?: NullableJsonNullValueInput | InputJsonValue
    fuelAdjustmentsJson?: NullableJsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutSelectedProviderNestedInput
  }

  export type LocationCreateManyUserInput = {
    id?: string
    zip: string
  }

  export type BillHistoryCreateManyUserInput = {
    id?: string
    billTotal: Decimal | DecimalJsLike | number | string
    createdDate?: Date | string
  }

  export type DeviceCreateManyUserInput = {
    id?: string
    name: string
    type: string
    brand?: string | null
    model?: string | null
    hourlyEnergy?: number | null
    isSmart?: boolean
    runDurationMinutes?: number | null
  }

  export type LocationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type BillHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    billTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    billTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    billTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyEnergy?: NullableFloatFieldUpdateOperationsInput | number | null
    isSmart?: BoolFieldUpdateOperationsInput | boolean
    runDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyEnergy?: NullableFloatFieldUpdateOperationsInput | number | null
    isSmart?: BoolFieldUpdateOperationsInput | boolean
    runDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DeviceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    model?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyEnergy?: NullableFloatFieldUpdateOperationsInput | number | null
    isSmart?: BoolFieldUpdateOperationsInput | boolean
    runDurationMinutes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HourlyRateCreateManyProviderInput = {
    id?: string
    date: Date | string
    hour: number
    baseRate: Decimal | DecimalJsLike | number | string
    deliveryCost: Decimal | DecimalJsLike | number | string
    totalRate: Decimal | DecimalJsLike | number | string
    periodIndex: number
    periodLabel: string
  }

  export type UserCreateManySelectedProviderInput = {
    id: string
    email: string
    utilityProv?: string | null
  }

  export type HourlyRateUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    hour?: IntFieldUpdateOperationsInput | number
    baseRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
  }

  export type HourlyRateUncheckedUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    hour?: IntFieldUpdateOperationsInput | number
    baseRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
  }

  export type HourlyRateUncheckedUpdateManyWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    hour?: IntFieldUpdateOperationsInput | number
    baseRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deliveryCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    periodIndex?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutSelectedProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    locations?: LocationUpdateManyWithoutUserNestedInput
    billHistory?: BillHistoryUpdateManyWithoutUserNestedInput
    devices?: DeviceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSelectedProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
    locations?: LocationUncheckedUpdateManyWithoutUserNestedInput
    billHistory?: BillHistoryUncheckedUpdateManyWithoutUserNestedInput
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutSelectedProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    utilityProv?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}