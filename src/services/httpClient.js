import axios from 'axios';
import { getEnvConfig } from './env';

const { supabaseUrl, supabaseAnonKey } = getEnvConfig();

export const httpClient = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
});
