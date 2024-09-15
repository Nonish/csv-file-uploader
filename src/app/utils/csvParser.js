import csv from 'csv-parser';
import fs from 'fs';
import pool from './db';

export async function csvParser(filePath, res) {
   const results = [];
   fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
         results.push([data.name, data.email, data.phone, data.creationDate]);
      })
      .on('end', async () => {
         // Insert parsed data into MySQL
         try {
            const connection = await pool.getConnection();
            const insertQuery = 'INSERT INTO users (name, email, phone ,creationDate) VALUES ?';
            await connection.query(insertQuery, [results]);
            connection.release(); // Release connection back to the pool

            // Remove the file after parsing
            fs.unlinkSync(filePath);

            res.status(200).json({ message: 'CSV data uploaded and inserted into the database' });
         } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Error inserting data into database' });
         }
      })
      .on('error', (error) => {
         console.error('Error parsing CSV:', error);
         res.status(500).json({ error: 'Error parsing CSV file' });
      });
};