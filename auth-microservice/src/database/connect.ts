import { DataSource } from 'typeorm';
import { dbConfig } from '../config/db.config';

const AppDataSource = new DataSource(dbConfig);

export default AppDataSource;
