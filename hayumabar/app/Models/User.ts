import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Venue from "App/Models/Venue";
import Booking from "App/Models/Booking";

export default class User extends BaseModel {
  /**
   * @swagger
   * definitions:
   *    User:
   *      type: object
   *      properties:
   *         name:
   *           type: string
   *           example: 'Na Hee Do'
   *         email:
   *           type: string
   *           example: 'naheedo@gmail.com'
   *         password:
   *           type: string
   *           example: 'baekdo2521'
   *         role:
   *           type: string
   *           enum: [user,owner]
   *      required:
   *        - name
   *        - email
   *        - password
   *        - role
   */
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column({ serializeAs: null })
  public role: "user" | "owner";

  @column({ serializeAs: null })
  public is_verified: boolean;

  @column({ serializeAs: null })
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasMany(() => Venue)
  public venues: HasMany<typeof Venue>;

  @hasMany(() => Booking)
  public bookings: HasMany<typeof Booking>;

  @manyToMany(() => Booking, {
    pivotTable: "booking_users",
  })
  public bookingSchedule: ManyToMany<typeof Booking>;
}
