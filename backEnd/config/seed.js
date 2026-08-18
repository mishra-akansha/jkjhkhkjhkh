import User from "../models/User.js";
import { USER_ROLES } from "../utils/enums.js";
import { hashPassword } from "../utils/password.js";

const DEMO_ACCOUNTS = [
  ["Sarah Chen", "founder@nexventure.com", USER_ROLES.FOUNDER],
  ["Marcus Vance", "investor@nexventure.com", USER_ROLES.INVESTOR],
  ["Dr. Aris Thorne", "mentor@nexventure.com", USER_ROLES.MENTOR],
  ["Elena Rostova", "student@nexventure.com", USER_ROLES.STUDENT],
];

export async function seedDevelopmentData() {
  const passwordHash = hashPassword("password123");

  await User.bulkWrite(
    DEMO_ACCOUNTS.map(([name, email, role]) => ({
      updateOne: {
        filter: { email },
        update: {
          $setOnInsert: { name, email, passwordHash, role },
        },
        upsert: true,
      },
    })),
  );
}
