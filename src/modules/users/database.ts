import { Client } from 'pg';
import {
  DB_NAME,
  DB_PORT,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME
} from '../../apiConfig';

interface payloadType {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  password: string;
  address: string;
  isActive: boolean;
  isVerified: boolean;
}

export const client = new Client({
  host: DB_HOST,
  port: (DB_PORT && parseInt(DB_PORT)) || 5432,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME
});

export const createUser = async (payload: payloadType) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    address,
    isActive,
    isVerified
  } = payload;

  const results = await client.query(
    `INSERT INTO "user" (firstname, lastname, email, phone, password, address, isActive, isVerified) 
Values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [firstname, lastname, email, phone, password, address, isActive, isVerified]
  );

  return results.rows[0];
};

export const findUser = async (email: string) => {
  const results = await client.query(`SELECT * from "user" WHERE email=$1`, [
    email
  ]);

  return results.rows[0];
};

module.exports = {
  client,
  createUser,
  findUser
};
